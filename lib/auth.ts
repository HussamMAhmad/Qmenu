import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma"; // your prisma client instance
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { Resend } from "resend";
import { after } from "next/server";
import {
  EMAIL_VERIFICATION,
  RESET_PASSWORD_TEMPLATE,
  SECURITY_ALERT_TEMPLATE,
} from "@/components/EmailTemplate/email-templete-auth";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account",
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    // add on existing user sign up feature
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      void resend.emails.send({
        from: "Q-menu <onboarding@resend.dev>",
        to: user.email,
        subject: "إعادة تعيين كلمة المرور - Q-Menu",
        html: RESET_PASSWORD_TEMPLATE.replaceAll("{{RESET_LINK}}", url),
      });
    },
    onPasswordReset: async ({ user }, request) => {
      console.log("");
      // send verfication email
    },
  },
  plugins: [
    emailOTP({
      sendVerificationOnSignUp: false,
      async sendVerificationOTP({ email, otp, type }) {
        let subject = "رمز التحقق - Menuak";
        if (type === "sign-in") {
          subject = "رمز تسجيل الدخول - Menuak";
        } else if (type === "email-verification") {
          subject = "تأكيد البريد الإلكتروني - Menuak";
        } else {
          subject = "إعادة تعيين كلمة المرور - Menuak";
        }
        after(async () => {
          try {
            await resend.emails.send({
              from: "Q-menu <onboarding@resend.dev>",
              to: [email],
              subject,
              html: EMAIL_VERIFICATION.replaceAll("{{OTP_CODE}}", otp),
            });
          } catch (e) {
            console.log("error with send email", e);
          }
        });
      },
    }),
    nextCookies(),
  ],
});