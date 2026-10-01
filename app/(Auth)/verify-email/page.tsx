
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { OtpVerificationForm } from "@/components/forms/Otp-verification-form";

interface VerifyEmailPageProps {
  searchParams:  Promise<{ [key: string]: string }>;
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  // في Next.js 15 تُقرأ searchParams كـ Promise
  const { email } = await searchParams ;

  // 1. إذا حاول المستخدم كتابة الرابط مباشرة بدون إيميل (?email=...)
  // if (!email) {
  //   redirect("/sign-in");
  // }

  // // 2. التحقق من الجلسة عبر Better Auth على السيرفر
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // // إذا كان البريد الإلكتروني مؤكداً بالفعل، وجهه إلى الداشبورد أو إعداد المطعم
  // if (session?.user?.emailVerified) {
  //   redirect("/dashboard");
  // }

  return (
    <div className="max-h-screen bg-gray-50/50 flex items-center justify-center p-4">
      <OtpVerificationForm email={email} />
    </div>
  );
}



