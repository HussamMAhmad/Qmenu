"use server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-helper";
import { revalidateTag, revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary/cloudinary";
import { MAX_SIZE } from "@/constants";
import { success } from "zod";

export const updateExchangeRate = async (exchangeRate: number) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: "غير مصرح لك بالقيام بهذا الإجراء" };
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: { userId: user.id },
      select: { id: true, slug: true },
    });

    if (!restaurant) {
      return { success: false, message: "المطعم غير موجود" };
    }

    const updateRate = await prisma.restaurant.update({
      where: {
        id: restaurant.id,
      },
      data: {
        exchangeRate,
      },
    });
    await prisma.$executeRaw`
  UPDATE "item"
  SET "priceUsd" = ROUND(("priceSyp" / ${exchangeRate})::numeric, 2)
  FROM "category"
  WHERE "item"."categoryId" = "category"."id"
    AND "category"."resturantId" = ${restaurant.id}
`;
    revalidateTag(`restaurant-data-${user.id}`, { expire: 0 });
    revalidateTag(`items-${user.id}`, { expire: 0 });
    revalidatePath("/dashboard/categories", "layout");
    revalidatePath(`/menu/${restaurant.slug}`);

    return {
      success: true,
      message: "تم تحديث سعر الصرف بنجاح",
      data: updateRate,
    };
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
        slug: true,
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
    revalidatePath(`/menu/${restaurant.slug}`);

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
        slug: true,
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
    revalidatePath(`/menu/${restaurant.slug}`);

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
        slug: true,
      },
    });

    if (!restaurant) {
      return { success: false, message: "المطعم غير موجود" };
    }

    const items = await prisma.item.findMany({
      where: { categoryId: id },
      select: { imagePublicUrl: true },
    });

    const publicIds = items
      .map((item) => item.imagePublicUrl)
      .filter((url): url is string => Boolean(url));

    if (publicIds.length > 0) {
      await cloudinary.api.delete_resources(publicIds);
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

    revalidatePath(`/menu/${restaurant.slug}`);
    revalidateTag(`categories-${user.id}`, { expire: 0 });
    revalidatePath("/dashboard/categories", "layout");
    return { success: true, message: "تم الحذف بنجاح", data: result };
  } catch (e) {
    console.log("failed to create category", e);
    return { success: false, message: "حدث خطا اثناء حذف القسم " };
  }
};

export const createItem = async (data: CreateItem, formData: FormData) => {
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

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        slug: true,
      },
    });

    if (!restaurant) {
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
      select: { imageUrl: true, imagePublicUrl: true },
    });

    if (existingItem) {
      return {
        success: false,
        message: "هذه الوجبة موجودة بالفعل في هذا القسم",
      };
    }

    const removeLogo = formData.get("removeLogo") || "";
    const file = formData.get("file") as File;

    let imgUrl = null;
    let imgPublicId = null;

    if (
      removeLogo === "true" ||
      (file &&
        typeof file === "object" &&
        "size" in file &&
        (file as File).size > 0)
    ) {
      imgUrl = null;
      imgPublicId = null;
    }

    if (
      file &&
      typeof file === "object" &&
      "size" in file &&
      (file as File).size > 0
    ) {
      if (file.size >= MAX_SIZE) {
        return {
          success: false,
          message: "حجم الصورة كبير جدا, الحد الاقصى المسموح به هو 4 ميغا",
        };
      }
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "qmenu/items",
              resource_type: "image",
            },
            function (error, result) {
              if (error) {
                reject(error);
                return;
              } else {
                resolve(result);
              }
            },
          )
          .end(buffer);
      });
      imgUrl = uploadResult.secure_url;
      imgPublicId = uploadResult.public_id;
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
        imageUrl: imgUrl,
        imagePublicUrl: imgPublicId,
      },
    });

    revalidateTag(`categories-${user.id}`, { expire: 0 });
    revalidateTag(`items-${user.id}`, { expire: 0 });
    revalidateTag(`items-count-${user.id}`, { expire: 0 });
    revalidatePath(`/menu/${restaurant.slug}`);

    return { success: true, message: "تم اضافة الوجبة بنجاح", data: result };
  } catch (e) {
    console.log("failed to create item", e);
    return { success: false, message: "حدث خطا اثناء انشاء وجبة جديدة" };
  }
};

export const updateItem = async (
  data: CreateItem,
  id: string,
  formData: FormData,
) => {
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

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        slug: true,
      },
    });

    if (!restaurant) {
      return {
        success: false,
        message: "القسم غير موجود أو لا تملك صلاحية الإضافة عليه",
      };
    }

    const existingItem = await prisma.item.findFirst({
      where: {
        categoryId: data.categoryId,
        nameAr: { equals: data.nameAr, mode: "insensitive" },
      },
      select: { imageUrl: true, imagePublicUrl: true },
    });

    const removeLogo = formData.get("removeLogo");
    const file = formData.get("file") as File;

    let imgUrl = existingItem?.imageUrl || null;
    let imgPublicId = existingItem?.imagePublicUrl || null;

    if (
      removeLogo === "true" ||
      (file &&
        typeof file === "object" &&
        "size" in file &&
        (file as File).size > 0)
    ) {
      if (existingItem?.imagePublicUrl) {
        await cloudinary.uploader.destroy(existingItem.imagePublicUrl);
      }
      imgUrl = null;
      imgPublicId = null;
    }

    if (
      file &&
      typeof file === "object" &&
      "size" in file &&
      (file as File).size > 0
    ) {
      if (file.size >= MAX_SIZE) {
        return {
          success: false,
          message: "حجم الصورة كبير جدا, الحد الاقصى المسموح به هو 4 ميغا",
        };
      }
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "qmenu/items",
              resource_type: "auto",
              quality: "auto",
              fetch_format: "auto",
            },
            function (error, result) {
              if (error) {
                reject(error);
                return;
              } else {
                resolve(result);
              }
            },
          )
          .end(buffer);
      });
      imgUrl = uploadResult.secure_url;
      imgPublicId = uploadResult.public_id;
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
        imageUrl: imgUrl,
        imagePublicUrl: imgPublicId,
      },
    });

    revalidateTag(`categories-${user.id}`, { expire: 0 });
    revalidateTag(`items-${user.id}`, { expire: 0 });
    revalidatePath(`/menu/${restaurant.slug}`);

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

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        slug: true,
      },
    });

    if (!restaurant) {
      return {
        success: false,
        message: "القسم غير موجود أو لا تملك صلاحية الإضافة عليه",
      };
    }

    const item = await prisma.item.findFirst({
      where: {
        id,
        categoryId: catId,
        category: {
          resturantId: restaurant.id,
        },
      },
      select: { imagePublicUrl: true },
    });

    if (!item) {
      return {
        success: false,
        message: "الوجبة غير موجودة او لا تملك صلاحية حذفها",
      };
    }

    if (item?.imagePublicUrl) {
      await cloudinary.uploader.destroy(item.imagePublicUrl);
    }

    const result = await prisma.item.deleteMany({
      where: {
        id,
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
    revalidatePath(`/menu/${restaurant.slug}`);
    revalidatePath("/dashboard/categories", "layout");

    return { success: true, message: "تم الحذف بنجاح", data: result };
  } catch (e) {
    console.log("failed to delete category", e);
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

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        slug: true,
      },
    });

    if (!restaurant) {
      return {
        success: false,
        message: "القسم غير موجود أو لا تملك صلاحية الإضافة عليه",
      };
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
    revalidatePath(`/menu/${restaurant.slug}`);
    return { success: true, message: "نجاح تعديل حالة الظهور", data: result };
  } catch (e) {
    console.log("failed to change isAvailable", e);
    return { success: false, message: "فشل تعديل حالة الظهور" };
  }
};

export const updateSetting = async (data: QrSetting, formData: FormData) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: "غير مصرح لك بالقيام بهذا الإجراء" };
    }

    const restaurant = await prisma.restaurant.findFirst({
      where: {
        userId: user.id,
      },
      select: { id: true, slug: true },
    });

    if (!restaurant) {
      return {
        success: false,
        message: "المطعم غير موجود أو لا تملك صلاحية الإضافة عليه",
      };
    }

    const existingSetting = await prisma.qrSetting.findUnique({
      where: { restaurantId: restaurant.id },
      select: { qrLogo: true, qrLogoPublicId: true },
    });

    const removeLogo = formData.get("removeLogo");
    const file = formData.get("file") as File;

    let logoUrl = existingSetting?.qrLogo || null;
    let logoPublicId = existingSetting?.qrLogoPublicId || null;

    if (
      removeLogo === "true" ||
      (file &&
        typeof file === "object" &&
        "size" in file &&
        (file as File).size > 0)
    ) {
      if (existingSetting?.qrLogoPublicId) {
        await cloudinary.uploader.destroy(existingSetting.qrLogoPublicId);
      }
      logoUrl = null;
      logoPublicId = null;
    }

    if (
      file &&
      typeof file === "object" &&
      "size" in file &&
      (file as File).size > 0
    ) {
      if (file.size >= MAX_SIZE) {
        return {
          success: false,
          message: "حجم الصورة كبير جدا الحد الاقصى المسموح به 4 ميغا",
        };
      }
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "qmenu/logo",
              resource_type: "auto",
              transformation: [
                { width: 300, height: 300, crop: "limit" },
                {
                  quality: "auto",
                  fetch_format: "auto",
                },
              ],
            },
            function (error, result) {
              if (error) {
                reject(error);
                return;
              } else {
                resolve(result);
              }
            },
          )
          .end(buffer);
      });
      logoUrl = uploadResult.secure_url;
      logoPublicId = uploadResult.public_id;
    }

    const result = await prisma.qrSetting.upsert({
      where: {
        restaurantId: restaurant.id,
      },
      update: {
        qrColor: data.qrColor,
        qrSubtitle: data.qrSubtitle,
        qrLogo: logoUrl,
        qrLogoPublicId: logoPublicId,
      },
      create: {
        restaurantId: restaurant.id,
        qrColor: data.qrColor,
        qrSubtitle: data.qrSubtitle,
        qrLogo: logoUrl,
        qrLogoPublicId: logoPublicId,
      },
    });

    revalidatePath("/dashboard/qrcode", "layout");
    revalidateTag(`qrSetting-${user.id}`, { expire: 0 });

    return { success: true, message: "تم حفظ الاعدادات بنجاح", data: result };
  } catch (e) {
    console.log("failed to save setting", e);
    return { success: false, message: "حدث خطا اثناء حفظ الاعدادات" };
  }
};

export const updateResSetting = async (
  data: RestaurantInfo,
  formData: FormData,
) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: "غير مصرح لك بالقيام بهذا الإجراء" };
    }

    const restaurant = await prisma.restaurant.findFirst({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        imageCoverUrl: true,
        imageCoverPublicUrl: true,
        logo: true,
        logoPublicUrl: true,
        slug: true,
      },
    });

    if (!restaurant) {
      return {
        success: false,
        message: "المطعم غير موجود أو لا تملك صلاحية الإضافة عليه",
      };
    }

    const removeImg = formData.get("removeImg");
    const img = formData.get("img") as File;
    const removeLogo = formData.get("removeLogo");
    const logo = formData.get("logo") as File;

    let imgUrl = restaurant?.imageCoverUrl || null;
    let imgPublicId = restaurant?.imageCoverPublicUrl || null;

    let logoUrl = restaurant?.logo || null;
    let logoPublicUrl = restaurant?.logoPublicUrl || null;

    if (
      removeLogo === "true" ||
      (logo &&
        typeof logo === "object" &&
        "size" in logo &&
        (logo as File).size > 0)
    ) {
      if (restaurant?.logoPublicUrl) {
        await cloudinary.uploader.destroy(restaurant.logoPublicUrl);
      }
      logoUrl = null;
      logoPublicUrl = null;
    }

    if (
      logo &&
      typeof logo === "object" &&
      "size" in logo &&
      (logo as File).size > 0
    ) {
      if (logo.size >= MAX_SIZE) {
        return {
          success: false,
          message: "حجم الصورة كبير جدا يتجاوز ال 4 ميغا",
        };
      }
      const arrayBuffer = await logo.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "qmenu/logRes",
              resource_type: "auto",
            },
            function (error, result) {
              if (error) {
                reject(error);
                return;
              } else {
                resolve(result);
              }
            },
          )
          .end(buffer);
      });
      logoUrl = uploadResult.secure_url;
      logoPublicUrl = uploadResult.public_id;
    }

    if (
      removeImg === "true" ||
      (img &&
        typeof img === "object" &&
        "size" in img &&
        (img as File).size > 0)
    ) {
      if (img.size >= MAX_SIZE) {
        return {
          success: false,
          message: "حجم الصورة كبير جدا يتجاوز ال 4 ميغا",
        };
      }
      if (restaurant?.imageCoverPublicUrl) {
        await cloudinary.uploader.destroy(restaurant.imageCoverPublicUrl);
      }
      imgUrl = null;
      imgPublicId = null;
    }

    if (
      img &&
      typeof img === "object" &&
      "size" in img &&
      (img as File).size > 0
    ) {
      const arrayBuffer = await img.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "qmenu/cover",
              resource_type: "auto",
            },
            function (error, result) {
              if (error) {
                reject(error);
                return;
              } else {
                resolve(result);
              }
            },
          )
          .end(buffer);
      });
      imgUrl = uploadResult.secure_url;
      imgPublicId = uploadResult.public_id;
    }

    const updatedSetting = await prisma.restaurant.update({
      where: {
        id: restaurant.id,
      },
      data: {
        name: data.name,
        description: data.description,
        exchangeRate: data.exchangeRate,
        whatsappNumber: data.whatsappNumber,
        showUSD: data.showUSD ?? true,
        imageCoverUrl: imgUrl,
        imageCoverPublicUrl: imgPublicId,
        logo: logoUrl,
        logoPublicUrl: logoPublicUrl,
      },
    });

    revalidateTag(`restaurant-setting-${user.id}`, { expire: 0 });
    revalidatePath("/dashboard", "layout");
    revalidatePath(`/menu/${restaurant.slug}`);

    return {
      success: true,
      message: "تم تحديث الاعدادات بنجاح",
      data: updatedSetting,
    };
  } catch (e) {
    console.log("failed to update restaurant settings", e);
    return { success: false, message: "فضل تحديث الاعدادات" };
  }
};
