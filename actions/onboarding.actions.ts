"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { Client } from "@upstash/workflow";
import { restaurantOnboardingSchema } from "@/lib/validation";

const client = new Client({ token: process.env.QSTASH_TOKEN! });

export const CompleteOnboarding = async (data: RestaurantOnboarding) => {
  try {
    const validationResult = restaurantOnboardingSchema.safeParse(data);

    if (!validationResult.success) {
      const errorMessage =
        validationResult.error.issues[0]?.message || "بيانات غير صالحة";
      return { success: false, message: errorMessage };
    }

    const cleanData = validationResult.data;

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.email) {
      return {
        success: false,
        message: "غير مصرح لك بالوصول، يرجى تسجيل الدخول",
      };
    }

    const email = session.user.email;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, message: "المستخدم غير موجود" };
    }

    const slug = cleanData.slug.trim().toLowerCase();

    const existingSlug = await prisma.restaurant.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      return { success: false, message: "اسم المعرف هذا موجود بالفعل" };
    }

    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 14);

    const result = await prisma.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { email },
        data: {
          restaurant: {
            upsert: {
              create: {
                name: cleanData.name,
                slug,
                description: cleanData.description,
                exchangeRate: cleanData.exchangeRate,
                whatsappNumber: cleanData.whatsappNumber,
              },
              update: {
                name: cleanData.name,
                slug,
                description: cleanData.description,
                exchangeRate: cleanData.exchangeRate,
                whatsappNumber: cleanData.whatsappNumber,
              },
            },
          },
        },
        include: {
          restaurant: true,
        },
      });

      const restaurantId = updatedUser.restaurant?.id;

      if (!restaurantId) {
        throw new Error("فشل في إنشاء أو تحديث بيانات المطعم");
      }

      const subscription = await tx.subscription.upsert({
        where: { restaurantId },
        create: {
          restaurantId,
          name: "فترة تجريبية مجانية",
          price: 0,
          currency: "USD",
          frequency: "MONTHLY",
          status: "TRIAL",
          startDate: new Date(),
          renewalDate: trialEndDate,
        },
        update: {},
      });

      return {
        restaurant: updatedUser.restaurant,
        userId: updatedUser.id,
        subscription,
      };
    });

    const { workflowRunId } = await client.trigger({
      url: `${process.env.BETTER_AUTH_URL}/api/subscription/reminder`,
      body: {
        subscriptionId: result.subscription.id,
        email,
      },
      retries: 3,
    });

    return {
      success: true,
      data: result.subscription,
      userId: result.userId,
    };
  } catch (e: any) {
    console.error("failed to complete restaurant onboarding:", e);
    if (e?.code === "P2002" && e?.meta?.target?.includes("slug")) {
      return {
        success: false,
        message: "اسم المعرف هذا مستخدم بالفعل، يرجى اختيار اسم آخر",
      };
    }
    return {
      success: false,
      message: "حدث خطأ أثناء حفظ بيانات المطعم والاشتراك",
    };
  }
};
