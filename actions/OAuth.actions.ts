// lib/auth-actions.ts
"use client";
import { authClient } from "@/lib/auth.client";

interface SignInOptions {
  callbackURL?: string;
  errorCallbackURL?: string;
}

export const signInWithGoogle = async (options?: SignInOptions) => {
  try {
    return await authClient.signIn.social({
      provider: "google",
      callbackURL: options?.callbackURL ?? "/onboarding",
      errorCallbackURL: options?.errorCallbackURL ?? "/sign-in?error=google_failed",
    });
  } catch (e) {
    console.log("Authentication failed with google", e);
    throw e;
  }
};
