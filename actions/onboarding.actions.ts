"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export const CompleteOnboarding = async (
  data: RestaurantOnboarding
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.email) {
      return {
        success: false,
        error: "غير مصرح لك بالوصول، يرجى تسجيل الدخول",
      };
    }

    const email = session.user.email;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: "user not found" };
    }

    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        restaurant: {
          upsert: {
            create: {
              name: data.name,
              description: data.description,
              exchangeRate: data.exchangeRate,
              whatsappNumber: data.whatsappNumber,
              showUSD: data.showUSD ?? true,
            },
            update: {
              name: data.name,
              description: data.description,
              exchangeRate: data.exchangeRate,
              whatsappNumber: data.whatsappNumber,
              showUSD: data.showUSD ?? true,
            },
          },
        },
      },
      include: {
        restaurant: true,
      },
    });
    if (!updatedUser.restaurant)
      return { success: false, error: "failed to update restaurant data" };
    return {
      success: true,
      data: updatedUser.restaurant,
      userId: updatedUser.id,
    };
  } catch (e) {
    console.log("failed to create restaurant onboarding", e);
    return { success: false, error: "failed to update restaurant data" };
  }
};
