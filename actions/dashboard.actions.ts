"use server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-helper";
import { revalidateTag, revalidatePath } from "next/cache";

export const updateExchangeRate = async (exchangeRate: number) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: "غير مصرح لك بالقيام بهذا الإجراء" };
    }

    const updateRate = await prisma.restaurant.update({
      where: {
        userId: user.id,
      },
      data: {
        exchangeRate,
      },
    });
    revalidateTag(`restaurant-data-${user.id}`, { expire: 0 });
    return { success: true, message: updateRate };
  } catch (e) {
    console.log("failed to update the exchangeRate");
    return { success: false, message: "حدث خطا اثناء تعديل سعر الصرف" };
  }
};

export const createCategory = async (cat: string) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: "غير مصرح لك بالقيام بهذا الإجراء" };
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (!restaurant) {
      return { success: false, message: "المطعم غير موجود" };
    }

    const existingCategory = await prisma.category.findFirst({
      where: {
        resturantId: restaurant.id,
        name: { equals: cat.trim(), mode: "insensitive" },
      },
    });

    if (existingCategory) {
      return { success: false, message: "هذا القسم موجود بالفعل" };
    }

    const result = await prisma.category.create({
      data: {
        name: cat,
        resturantId: restaurant.id,
      },
    });
    if (!result)
      return { success: false, message: "حدث خطا اثناء انشاء قسم جديد" };

    revalidateTag(`categories-${user.id}`, { expire: 0 });

    return { success: true, message: "تم انشاء قسم جديد بنجاح", data: result };
  } catch (e) {
    console.log("failed to create category", e);
    return { success: false, message: "حدث خطا اثناء انشاء قسم جديد" };
  }
};

export const updateCategory = async (cat: string, id: string) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: "غير مصرح لك بالقيام بهذا الإجراء" };
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (!restaurant) {
      return { success: false, message: "المطعم غير موجود" };
    }
    const name = cat.trim();
    const categoryToUpdate = await prisma.category.findFirst({
      where: {
        id,
        resturantId: restaurant.id,
      },
    });

    if (!categoryToUpdate)
      return {
        success: false,
        message: "القسم غير موجود او لا تملك صلاحية تعديله",
      };

    const existingCategory = await prisma.category.findFirst({
      where: {
        resturantId: restaurant.id,
        name: { equals: name, mode: "insensitive" },
      },
    });

    if (existingCategory) {
      return {
        success: false,
        message: "يوجد قسم اخر يحمل نفس هذا الاسم بالغعل",
      };
    }

    const result = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    revalidateTag(`categories-${user.id}`, { expire: 0 });

    return { success: true, message: "تم التعديل بنجاح", data: result };
  } catch (e) {
    console.log("failed to create category", e);
    return { success: false, message: "حدث خطا اثناء تعديل قسم جديد" };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: "غير مصرح لك بالقيام بهذا الإجراء" };
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (!restaurant) {
      return { success: false, message: "المطعم غير موجود" };
    }

    const result = await prisma.category.deleteMany({
      where: {
        id,
        resturantId: restaurant.id,
      },
    });

    if (result.count === 0) {
      return {
        success: false,
        message: "القسم غير موجود أو لا تملك صلاحية حذفه",
      };
    }

    revalidateTag(`categories-${user.id}`, { expire: 0 });
    revalidatePath("/dashboard/categories", "layout");
    return { success: true, message: "تم الحذف بنجاح", data: result };
  } catch (e) {
    console.log("failed to create category", e);
    return { success: false, message: "حدث خطا اثناء حذف القسم " };
  }
};

export const createItem = async (data: CreateItem) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: "غير مصرح لك بالقيام بهذا الإجراء" };
    }

    const category = await prisma.category.findFirst({
      where: {
        id: data.categoryId,
        resturant: {
          userId: user.id,
        },
      },
      select: { id: true },
    });

    if (!category) {
      return {
        success: false,
        message: "القسم غير موجود أو لا تملك صلاحية الإضافة عليه",
      };
    }

    const cleanNameAr = data.nameAr.trim();
    const cleanNameEn = data.nameEn?.trim() || "";

    const existingItem = await prisma.item.findFirst({
      where: {
        categoryId: data.categoryId,
        nameAr: { equals: cleanNameAr, mode: "insensitive" },
      },
    });

    if (existingItem) {
      return {
        success: false,
        message: "هذه الوجبة موجودة بالفعل في هذا القسم",
      };
    }

    const result = await prisma.item.create({
      data: {
        nameAr: cleanNameAr,
        nameEn: cleanNameEn,
        description: data.description,
        priceSyp: data.priceSyp,
        priceUsd: data.priceUsd,
        prepTime: data.prepTime,
        isAvailable: data.isAvailable,
        categoryId: data.categoryId,
      },
    });

    revalidateTag(`categories-${user.id}`, { expire: 0 });
    revalidateTag(`items-${user.id}`, { expire: 0 });
    revalidateTag(`items-count-${user.id}`, { expire: 0 });

    return { success: true, message: "تم اضافة الوجبة بنجاح", data: result };
  } catch (e) {
    console.log("failed to create item", e);
    return { success: false, message: "حدث خطا اثناء انشاء وجبة جديدة" };
  }
};

export const updateItem = async (data: CreateItem, id: string) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: "غير مصرح لك بالقيام بهذا الإجراء" };
    }

    const category = await prisma.category.findFirst({
      where: {
        id: data.categoryId,
        resturant: {
          userId: user.id,
        },
      },
      select: { id: true },
    });

    if (!category) {
      return {
        success: false,
        message: "القسم غير موجود أو لا تملك صلاحية الإضافة عليه",
      };
    }

    const cleanNameAr = data.nameAr.trim();
    const cleanNameEn = data.nameEn?.trim() || "";

    const result = await prisma.item.update({
      where: {
        id,
      },
      data: {
        nameAr: cleanNameAr,
        nameEn: cleanNameEn,
        description: data.description,
        priceSyp: data.priceSyp,
        priceUsd: data.priceUsd,
        prepTime: data.prepTime,
        isAvailable: data.isAvailable,
        categoryId: data.categoryId,
      },
    });

    revalidateTag(`categories-${user.id}`, { expire: 0 });
    revalidateTag(`items-${user.id}`, { expire: 0 });

    return { success: true, message: "تم تعديل الوجبة بنجاح", data: result };
  } catch (e) {
    console.log("failed to create item", e);
    return { success: false, message: "حدث خطا اثناء تعديل وجبة جديدة" };
  }
};

export const deleteItem = async (id: string, catId: string) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: "غير مصرح لك بالقيام بهذا الإجراء" };
    }

    if (!id || !catId) {
      return { success: false, message: "البيانات الممررة غير مكتملة" };
    }

    const result = await prisma.item.deleteMany({
      where: {
        id,
        categoryId: catId,
        category: {
          resturant: {
            userId: user.id,
          },
        },
      },
    });

    if (result.count === 0) {
      return {
        success: false,
        message: "الوجبة غير موجودة أو لا تملك صلاحية حذفها",
      };
    }

    revalidateTag(`items-${user.id}`, { expire: 0 });
    revalidateTag(`items-count-${user.id}`, { expire: 0 });
    revalidateTag(`categories-${user.id}`, { expire: 0 });
    revalidatePath("/dashboard/categories", "layout");

    return { success: true, message: "تم الحذف بنجاح", data: result };
  } catch (e) {
    console.log("failed to create category", e);
    return { success: false, message: "حدث خطا اثناء حذف الوجبة " };
  }
};

export const changeIsAvailable = async (
  isAvailable: boolean,
  id: string,
  catId: string,
) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: "غير مصرح لك بالقيام بهذا الإجراء" };
    }

    const itemToUpdate = await prisma.item.findFirst({
      where: {
        id,
        categoryId: catId,
        category: {
          resturant: {
            userId: user.id,
          },
        },
      },
      select: { id: true },
    });

    if (!itemToUpdate) {
      return {
        success: false,
        message: "القسم غير موجود أو لا تملك صلاحية الإضافة عليه",
      };
    }

    const result = await prisma.item.update({
      where: {
        id,
      },
      data: {
        isAvailable,
      },
    });

    revalidateTag(`items-${user.id}`, { expire: 0 });
    revalidateTag(`categories-${user.id}`, { expire: 0 });

    return { success: true, message: "نجاح تعديل حالة الظهور", data: result };
  } catch (e) {
    console.log("failed to change isAvailable", e);
    return { success: false, message: "فشل تعديل حالة الظهور" };
  }
};
