"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function SignUp({ name, email, password }: USER) {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const existingEmail = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { emailVerified: true, id: true },
    });

    if (existingEmail) {
      if (existingEmail.emailVerified) {
        return { success: false, error: "هذا الايميل مسجل ومفعل بالفعل" };
      } else {
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
          error:
            "لديك حساب غير مفعل بهذا البريد. لقد أرسلنا رمز تحقق جديداً إليك.",
        };
      }
    }

    const response = await auth.api.signUpEmail({
      body: {
        name,
        email: normalizedEmail,
        password,
      },
      headers: await headers(),
    });

    const data = await auth.api.sendVerificationOTP({
      body: {
        email: normalizedEmail, // required, Email address to send the OTP.
        type: "sign-in", // required, Type of the OTP. `sign-in`, `email-verification`, or `forget-password`.
      },
    });

    if (!response) return { success: false, error: "failed to create account" };
    return { success: true, data: response };
  } catch (e: any) {
    console.log("failed to sign up", e);
    if (e?.code === "P2002") {
      return { success: false, error: "هذا الايميل موجود بالفعل" };
    }
    return {
      success: false,
      error: e?.message || "حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة لاحقاً",
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
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: "/dashboard",
      }, // we can handle the error if it is't show on screen
    });
    if (!response)
      return {
        success: false,
        error: "بيانات الدخول غير صحيحة، يرجى التأكد من البريد وكلمة المرور",
      };
    return { success: true, data: response };
  } catch (e) {
    console.log("failed to sign in", e);
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
    const data = await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: "/reset-password",
      },
    });

    return { success: true, data };
  } catch (e) {
    console.log("failed to reset password", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "فشلت عملية طلب إعادة التعيين",
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

    const data = await auth.api.resetPassword({
      body: {
        newPassword: password,
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
