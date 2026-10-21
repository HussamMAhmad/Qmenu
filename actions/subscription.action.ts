"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-helper";
import { revalidatePath } from "next/cache";
import { PLANS_PRICES } from "@/data/constants";
import { Resend } from "resend";
import { Client } from "@upstash/workflow";

const resend = new Resend(process.env.RESEND_API_KEY);

export const checkSubscription = async (restaurantId: string) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { restaurantId },
      select: { status: true, renewalDate: true },
    });

    if (!subscription) return { isActive: false };

    const isExpired = new Date() > new Date(subscription.renewalDate);
    if (isExpired || subscription.status === "EXPIRED")
      return { isActive: false };
    if (subscription.status === "ACTIVE" || subscription.status === "TRIAL")
      return { isActive: true };

    return { isActive: false };
  } catch (e) {
    console.error("failed to check the subscription ", e);
    throw e;
  }
};

const TSA_API_KEY = process.env.TSA_API_KEY!;
const MY_SHAM_ADDRESS = process.env.MY_SHAM_ADDRESS!;
const client = new Client({ token: process.env.QSTASH_TOKEN! });

export async function verifyAndActivateSubscription(
  transactionId: string,
  planId: string,
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { success: false, message: "غير مصرح لك بالقيام بهذا الإجراء" };
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      include: { restaurant: true },
    });

    if (!user || !user.restaurant) {
      return { success: false, message: "لم يتم العثور على مطعم مرتبط بحسابك" };
    }

    const restaurant = user.restaurant;

    const existingTransaction = await prisma.subscriptionPayment.findUnique({
      where: { transactionId },
    });

    if (existingTransaction) {
      return {
        success: false,
        message: "رقم العملية هذا تم استخدامه لتفعيل اشتراك سابقاً",
      };
    }

    const requiredAmountUSD = PLANS_PRICES[planId as PLANS] || 12;

    const url = `https://tsa-api.com/api/v1?resource=shamcash&action=find_tx&tx=${transactionId}&account_address=${MY_SHAM_ADDRESS}&api_key=${TSA_API_KEY}`;
    const response = await fetch(url, { cache: "no-store" });
    const resData = await response.json();

    let isTxValid = false;
    let actualAmountUSD = 0;

    if (resData.success && resData.data?.found === true) {
      const txCurrency = resData.data.transaction.currency;
      const rawAmount = parseFloat(resData.data.transaction.amount);

      if (txCurrency !== "USD") {
        return {
          success: false,
          message:
            "عذراً، يجب أن تكون عملية التحويل بالدولار الأمريكي (USD) حصراً.",
        };
      }

      actualAmountUSD = rawAmount;
      isTxValid = actualAmountUSD >= requiredAmountUSD;
    }

    if (!isTxValid) {
      return {
        success: false,
        message:
          "لم يتم العثور على حركة تحويل مطابقة بالدولار أو أن المبلغ المحول غير كافٍ.",
      };
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    const result = await prisma.$transaction(async (tx) => {
      await tx.subscriptionPayment.create({
        data: {
          transactionId,
          paymentMethod: "sham",
          amount: actualAmountUSD,
          userId: user.id,
          restaurantId: restaurant.id,
        },
      });

      const subscription = await tx.subscription.upsert({
        where: { restaurantId: restaurant.id },
        create: {
          name: planId,
          price: requiredAmountUSD,
          currency: "USD",
          frequency: "MONTHLY",
          status: "ACTIVE",
          startDate,
          renewalDate: endDate,
          restaurantId: restaurant.id,
        },
        update: {
          name: planId,
          price: requiredAmountUSD,
          currency: "USD",
          status: "ACTIVE",
          startDate,
          renewalDate: endDate,
        },
      });
      return { subscription };
    });

    try {
      await resend.emails.send({
        from: "Q-menu <onboarding@resend.dev>",
        to: user.email,
        subject: "تفعيل اشتراك جديد",
        html: `<div>تم تفعيل اشتراكك بنجاح بقيمة $${requiredAmountUSD} USD عبر شام كاش!</div>`,
      });
    } catch (emailError) {
      console.error("فشل إرسال بريد التأكيد:", emailError);
    }

    const { workflowRunId } = await client.trigger({
      url: `${process.env.BETTER_AUTH_URL}/api/subscription/reminder`,
      body: {
        subscriptionId: result.subscription.id,
        email: user.email,
      },
      retries: 3,
    });

    revalidatePath("/dashboard");
    revalidatePath(`/menu/${user.restaurant.slug}`);

    return {
      success: true,
      message: "تم التحقق من الحوالة وتفعيل اشتراكك بالدولار بنجاح!",
    };
  } catch (error) {
    console.error("خطأ في معالجة الاشتراك عبر TSA:", error);
    return {
      success: false,
      message: "حدث خطأ أثناء الاتصال بسيرفر التحقق، يرجى المحاولة لاحقاً",
    };
  }
}
