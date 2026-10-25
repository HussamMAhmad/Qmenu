"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  formSchemaSignUp,
  formSchemaSignIn,
  formSchemaResetPassword,
  formSchemaForgetPassword,
} from "@/lib/validation";

export async function SignUp({ name, email, password }: USER) {
  try {
    const validationResult = formSchemaSignUp.safeParse({
      name,
      email,
      password,
    });

    if (!validationResult.success) {
      const errorMessage =
        validationResult.error.issues[0]?.message || "بيانات غير صالحة";
      return { success: false, message: errorMessage };
    }

    const cleanData = validationResult.data;
    const normalizedEmail = cleanData.email.trim().toLowerCase();

    const existingEmail = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { emailVerified: true, id: true },
    });

    if (existingEmail) {
      if (!existingEmail.emailVerified) {
        try {
          await auth.api.sendVerificationOTP({
            body: {
              email: normalizedEmail,
              type: "sign-in",
            },
            headers: await headers(),
          });
        } catch (err) {
          console.error("فشل إعادة إرسال رمز التحقق:", err);
        }
      }

      return {
        success: true,
        requiresVerification: true,
        message: "إذا كان البريد الإلكتروني صحيحاً ولم يتم تفعيله بعد، فقد أرسلنا لك رمز تحقق جديداً.",
      };
    }

    const response = await auth.api.signUpEmail({
      body: {
        name: cleanData.name,
        email: normalizedEmail,
        password: cleanData.password,
      },
      headers: await headers(),
    });

    if (!response) {
      return { success: false, message: "فشل في إنشاء الحساب" };
    }

    await auth.api.sendVerificationOTP({
      body: {
        email: normalizedEmail,
        type: "sign-in",
      },
      headers: await headers(),
    });

    return {
      success: true,
      requiresVerification: true,
      message: "تم إنشاء الحساب بنجاح. يرجى التحقق من بريدك الإلكتروني لإدخال رمز التحقق.",
    };
    
  } catch (e: any) {
    console.error("failed to sign up", e);
    if (e?.code === "P2002") {
      return { success: false, message: "حدث خطأ أثناء معالجة الطلب، يرجى المحاولة لاحقاً" };
    }
    return {
      success: false,
      message: e?.message || "حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة لاحقاً",
    };
  }
}

export async function SignIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const validationResult = formSchemaSignIn.safeParse({
      email,
      password,
    });

    if (!validationResult.success) {
      const errorMessage =
        validationResult.error.issues[0]?.message || "بيانات غير صالحة";
      return { success: false, message: errorMessage };
    }

    const cleanData = validationResult.data;

    const response = await auth.api.signInEmail({
      body: {
        email: cleanData.email,
        password: cleanData.password,
        callbackURL: "/dashboard",
      },
    });
    if (!response)
      return {
        success: false,
        message: "بيانات الدخول غير صحيحة، يرجى التأكد من البريد وكلمة المرور",
      };
    return { success: true, data: response };
  } catch (e) {
    console.log("failed to sign in", e);
    return {
      success: false,
      message: "بيانات الدخول غير صحيحة، يرجى التأكد من البريد وكلمة المرور",
    };
  }
}

export async function SignOut() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (e) {
    console.error("Failed to sign out:", e);
  }
  redirect("/sign-in");
}

export async function resetPasswordRequest(email: string) {
  try {
    const validationResult = formSchemaForgetPassword.safeParse({
      email,
    });

    if (!validationResult.success) {
      const errorMessage =
        validationResult.error.issues[0]?.message || "بيانات غير صالحة";
      return { success: false, message: errorMessage };
    }

    const cleanData = validationResult.data;

    const data = await auth.api.requestPasswordReset({
      body: {
        email: cleanData.email.trim().toLowerCase(),
        redirectTo: "/reset-password",
      },
    });

    return { success: true, data };
  } catch (e) {
    console.log("failed to reset password", e);
    return {
      success: false,
      message: e instanceof Error ? e.message : "فشلت عملية طلب إعادة التعيين",
    };
  }
}

export async function resetPassword({
  password,
  token,
}: {
  password: string;
  token: string;
}) {
  try {
    if (!token) {
      return {
        success: false,
        message: "رمز إعادة التعيين مفقود أو غير صالحة",
      };
    }

    const validationResult = formSchemaResetPassword.safeParse({
      token,
      password,
    });

    if (!validationResult.success) {
      const errorMessage =
        validationResult.error.issues[0]?.message || "بيانات غير صالحة";
      return { success: false, message: errorMessage };
    }

    const cleanData = validationResult.data;

    const data = await auth.api.resetPassword({
      body: {
        newPassword: cleanData.password,
        token,
      },
    });

    return { success: true, data };
  } catch (e) {
    console.log("failed to reset password", e);
    return {
      success: false,
      message:
        e instanceof Error ? e.message : "فشلت عملية إعادة تعيين كلمة المرور",
    };
  }
}
