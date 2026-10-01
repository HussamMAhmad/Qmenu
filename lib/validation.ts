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
