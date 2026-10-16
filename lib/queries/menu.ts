import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getCachedMenu = async (slug: string) =>
  unstable_cache(
    async () => {
      try {
        const restaurant = await prisma.restaurant.findUnique({
          where: { slug },
          include: {
            categories: {
              include: {
                items: {
                  where: { isAvailable: true },
                  orderBy: { createdAt: "desc" },
                },
              },
            },
            qrSetting: true,
          },
        });

        return {
          success: true,
          message: "تم جلب البيانات",
          result: restaurant,
        };
      } catch (e) {
        console.log("failed to get menu data ", e);
        return { success: false, message: "حدث خطا اثناء جلب البيانات" };
      }
    },
    [`menu-${slug}`],
    {
      tags: [`menu-${slug}`],
      revalidate: 600,
    },
  )();

export const getMenu = async (slug: string) => {
  return getCachedMenu(slug);
};