"use server";
import { auth } from "@/lib/auth";

export async function SignUp({ name, email, password }: USER) {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    if (!response) return { success: false, error: "failed to create account" };
    return { success: true, data: response };
  } catch (e) {
    console.log("failed to sign up", e);
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
    if (!response) return { success: false, error: "بيانات الدخول غير صحيحة، يرجى التأكد من البريد وكلمة المرور" };
    return { success: true, data: response };
  } catch (e) {
    console.log("failed to sign in", e);
  }
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
