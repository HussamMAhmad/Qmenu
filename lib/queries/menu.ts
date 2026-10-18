import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getCachedMenu = unstable_cache(
  async (slug: string) => {
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
  ["menu-cache"],
  {
    tags: ["menu-data"],
    revalidate: 60,
  }
);