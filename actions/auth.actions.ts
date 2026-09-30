"use server";
import { auth } from "@/lib/auth";
import { EmailTemplate } from "@/components/EmailTemplate/email-templete";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function SignUp({ name, email, password }: USER) {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    const data = await auth.api.sendVerificationOTP({
    body: {
        email, // required, Email address to send the OTP.
        type: "sign-in", // required, Type of the OTP. `sign-in`, `email-verification`, or `forget-password`.
    },
});
    // const { data, error } = await resend.emails.send({
    //   from: "Acme <onboarding@resend.dev>",
    //   to: ["webwizardp@gmail.com"],
    //   subject: "Hello world",
    //   react: EmailTemplate({ firstName: "John" }),
    // });

    // if (error) {
    //   return {
    //     succes: true,
    //     response: Response.json({ error }, { status: 500 }),
    //   };
    // }

    if (!response) return { success: false, error: "failed to create account" };
    return { success: true, data: response};
  } catch (e) {
    console.log("failed to sign up", e);
  }
}
