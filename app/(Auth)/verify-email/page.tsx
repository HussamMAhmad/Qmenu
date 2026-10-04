import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { OtpVerificationForm } from "@/components/forms/Otp-verification-form";

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const { email } = await searchParams;

  if (!email) {
    redirect("/sign-in");
  }

   const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user) redirect("/dashboard");

  return (
    <div className="max-h-screen bg-gray-50/50 flex items-center justify-center p-4">
      <OtpVerificationForm email={email}/>
    </div>
  );
}