import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma"; // your prisma client instance
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { Resend } from "resend";
import { after } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        let subject = "رمز التحقق - Menuak";
        let message = "رمز التحقق الخاص بك هو:";
        if (type === "sign-in") {
          subject = "رمز تسجيل الدخول - Menuak";
          message = "رمز تسجيل الدخول السريع:";
        } else if (type === "email-verification") {
          subject = "تأكيد البريد الإلكتروني - Menuak";
          message = "رمز تأكيد بريدك الإلكتروني هو:";
        } else {
          subject = "إعادة تعيين كلمة المرور - Menuak";
          message = "رمز إعادة تعيين كلمة المرور:";
        }
        after(async () => {
          try {
            await resend.emails.send({
              from: "Q-menu <onboarding@resend.dev>",
              to: [email],
              subject,
              html: `
            <div style="direction: rtl; font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; text-align: right;">
              <h2>أهلاً بك في Menuak 👋</h2>
              <p>${message}</p>
              <div style="background-color: #f4f4f5; padding: 16px; border-radius: 8px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #ff5722; margin: 20px 0;">
                ${otp}
              </div>
              <p style="font-size: 13px; color: #777;">هذا الرمز صالِح لفترة قصيرة فقط. لا تشاركه مع أحد.</p>
            </div>
          `,
            });
          } catch (e) {
            console.log("error with send email", e);
          }
        });
      },
    }),
  ],
});
