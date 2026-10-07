import * as z from "zod";

export const formSchemaSignUp = z.object({
  name: z
    .string()
    .min(2, "الاسم الكامل بجب ان يكون على الاقل 2 احرف")
    .max(32, "الاسم يجب ان يكون 32 حرف على الاكثر"),
  email: z.email({ message: "البريد الإلكتروني غير صحيح" }),
  password: z
    .string()
    .min(8, { message: "يجب ألا تقل كلمة المرور عن 8 خانات" })
    .regex(/[A-Z]/, { message: "يجب أن تحتوي على حرف كبير واحد على الأقل" })
    .regex(/[a-z]/, { message: "يجب أن تحتوي على حرف صغير واحد على الأقل" })
    .regex(/[0-9]/, { message: "يجب أن تحتوي على رقم واحد على الأقل" })
    .regex(/[@$!%*?&]/, {
      message: "يجب أن تحتوي على رمز خاص واحد على الأقل (@$!%*?&)",
    }),
  termsAndPolicy: z.boolean().refine((value) => value === true, {
    message: "يجب ان توافق على شروط الخدمة و سياسة الخصوصية",
  }),
});

export const formSchemaSignIn = z.object({
  email: z.email({ message: "البريد الإلكتروني غير صحيح" }),
  password: z.string().min(1, { message: "كلمة المرور مطلوبة" }),
});

export const formSchemaResetPassword = z.object({
  password: z.string().min(1, { message: "كلمة المرور مطلوبة" }),
});

export const formSchemaForgetPassword = z.object({
  email: z.email({ message: "البريد الإلكتروني غير صحيح" }),
});

export const restaurantOnboardingSchema = z.object({
  name: z
    .string()
    .min(2, { message: "اسم المطعم يجب أن يكون مكوناً من حرفين على الأقل" })
    .max(50, { message: "اسم المطعم طويل جداً" }),
  description: z
    .string()
    .min(10, { message: "يرجى كتابة وصف قصير لا يقل عن 10 أحرف" })
    .max(160, { message: "الوصف يجب ألا يتجاوز 160 حرفاً" }),
  exchangeRate: z
    .number({ message: "يرجى إدخال رقم صحيح لسعر الصرف" })
    .positive({ message: "سعر الصرف يجب أن يكون أكبر من 0" }),
  whatsappNumber: z
    .e164("يرجى إدخال رقم واتساب صحيح مصحوباً بالرمز الدولي")
    .optional(),
});

export const exchangeRateOverview = z.object({
  exchangeRate: z
    .number({ message: "يرجى إدخال رقم صحيح لسعر الصرف" })
    .positive({ message: "سعر الصرف يجب أن يكون أكبر من 0" }),
});

export const Category = z.object({
  name: z
    .string()
    .min(2, { message: "اسم القسم يجب أن يكون مكوناً من حرفين على الأقل" })
    .max(50, { message: "اسم القسم طويل جداً" }),
});

export const CreateItemsSchema = z.object({
  categoryId: z.string().min(1, { message: "يرجى اختيار القسم الرئيسي" }),
  nameAr: z
    .string()
    .min(2, { message: "اسم الوجبة يجب ان يكون مكونا من حرفين على الاقل" })
    .max(50, { message: "اسم الوجبة طويل جدا" }),
  nameEn: z
    .string()
    .max(50, { message: "اسم الوجبة طويل جدا" })
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .max(200, { message: "الوصف طويل جدا" })
    .optional()
    .or(z.literal("")),
  priceSyp: z
    .number({ message: "يرجى إدخال رقم صحيح للسعر بالسوري" })
    .positive({ message: "سعر الصرف يجب أن يكون أكبر من 0" }),
  priceUsd: z
    .number({ message: "يرجى إدخال رقم صحيح للسعر بالدولار" })
    .min(0, { message: "السعر يجب أن يكون 0 أو أكثر" }),
  prepTime: z.string().optional().or(z.literal("")),
  isAvailable: z.boolean(),
});
