"use server";

import { prisma } from "@/lib/prisma";

export const checkSubscription = async (restaurantId: string) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { restaurantId },
      select: { status: true, renewalDate: true },
    });

    if (!subscription) {
      return { isActive: false };
    }

    const isExpired = new Date() > new Date(subscription.renewalDate);
    const isCanceled = subscription.status === "CANCELED";
    const isExpiredStatus = subscription.status === "EXPIRED";

    if (isExpired || isCanceled || isExpiredStatus) {
      return { isActive: false };
    }

    if (subscription.status === "ACTIVE" || subscription.status === "TRIAL") {
      return { isActive: true };
    }

    return { isActive: false };
  } catch (e) {
    console.log("failed to check the subscription ", e);
    throw e;
  }
};
