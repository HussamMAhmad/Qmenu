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