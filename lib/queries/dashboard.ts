import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getRestaurant = async (userId: string) =>
  unstable_cache(
    async () => {
      return await prisma.restaurant.findUnique({
        where: { userId },
        select: {
          id: true,
          name: true,
          exchangeRate: true,
          slug: true,
          categories: true,
          subscriptions: {
            select: {
              id: true,
              name: true,
              status: true,
              startDate: true,
              renewalDate: true,
            },
          },
        },
      });
    },
    [`restaurant-data-${userId}`],
    { tags: [`restaurant-data-${userId}`], revalidate: 3600 },
  )();

export const getSettingInfo = async (userId: string) =>
  unstable_cache(
    async () => {
      return await prisma.restaurant.findUnique({
        where: { userId },
        select: {
          name: true,
          exchangeRate: true,
          description: true,
          showUSD: true,
          slug: true,
          whatsappNumber: true,
          imageCoverUrl: true,
          logo: true,
        },
      });
    },
    [`restaurant-setting-${userId}`],
    { tags: [`restaurant-setting-${userId}`], revalidate: 3600 },
  )();

export const countItems = (userId: string) =>
  unstable_cache(
    async () => {
      try {
        const count = await prisma.item.count({
          where: {
            category: {
              resturant: {
                userId,
              },
            },
          },
        });
        return count;
      } catch (e) {
        console.log("failed to count items menu", e);
        return 0;
      }
    },
    [`items-count-${userId}`],
    {
      tags: [`items-count-${userId}`],
      revalidate: 3600,
    },
  )();

export const getCategories = (userId: string) =>
  unstable_cache(
    async () => {
      try {
        const count = await prisma.category.findMany({
          where: {
            resturant: {
              userId,
            },
          },
          select: {
            id: true,
            name: true,
            items: {
              select: {
                id: true,
                nameAr: true,
                nameEn: true,
                description: true,
                priceSyp: true,
                priceUsd: true,
                prepTime: true,
                isAvailable: true,
                imageUrl: true,
              },
            },
          },
        });
        return count;
      } catch (e) {
        console.log("failed to count categories", e);
        return [];
      }
    },
    [`categories-${userId}`],
    {
      tags: [`categories-${userId}`],
      revalidate: 3600,
    },
  )();

export const getItems = (
  userId: string,
  sortOption: string = "default",
  categoryId?: string,
  isAvailable?: boolean,
) =>
  unstable_cache(
    async () => {
      try {
        let orderBy: any = { id: "desc" };
        if (sortOption === "name-asc") {
          orderBy = { nameAr: "asc" };
        } else if (sortOption === "name-desc") {
          orderBy = { nameAr: "desc" };
        }
        const count = await prisma.item.findMany({
          where: {
            category: {
              resturant: {
                userId,
              },
            },
            ...(categoryId ? { categoryId } : {}),
            ...(isAvailable !== undefined ? { isAvailable } : {}),
          },
          orderBy,
        });
        return count;
      } catch (e) {
        console.log("failed to count items", e);
        return [];
      }
    },
    [
      `items-${userId}`,
      sortOption,
      categoryId || "all",
      String(isAvailable ?? "all"),
    ],
    {
      tags: [`items-${userId}`],
      revalidate: 3600,
    },
  )();

export const getSetting = (userId: string) =>
  unstable_cache(
    async () => {
      try {
        const result = await prisma.qrSetting.findFirst({
          where: {
            restaurant: {
              userId,
            },
          },
          select: { qrColor: true, qrLogo: true, qrSubtitle: true },
        });
        return {
          success: true,
          message: "تم جلب البيانات بنجاح",
          data: result,
        };
      } catch (e) {
        console.log("failed to fetch QrSetting", e);
        return { success: false, message: "حدث خطا اثناء جلب البيانات" };
      }
    },
    [`qrSetting-${userId}`],
    {
      tags: [`qrSetting-${userId}`],
      revalidate: 3600,
    },
  )();
