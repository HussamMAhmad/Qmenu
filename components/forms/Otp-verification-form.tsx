"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth.client";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";

interface OtpVerificationProps {
  email: string;
}

export function OtpVerificationForm({ email }: OtpVerificationProps) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const OTP_LENGTH = 6;
  const [resending, setResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (codeToVerify?: string) => {
    const otpToSubmit = codeToVerify || value;
    if (otpToSubmit.length < OTP_LENGTH) {
      setErrorMessage("يرجى إدخال رمز التحقق كاملاً");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const { error } = await authClient.emailOtp.verifyEmail({
      email,
      otp: otpToSubmit,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message || "رمز التحقق غير صحيح أو انتهت صلاحيته");
      setValue("");
    } else {
      setSuccessMessage("تم تأكيد البريد الإلكتروني بنجاح!");
      router.refresh();
      router.push("/onboarding");
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || resending) return;

    setResending(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "email-verification",
    });

    setResending(false);

    if (error) {
      setErrorMessage(error.message || "فشل إعادة إرسال الرمز، حاول مجدداً");
    } else {
      setSuccessMessage("تم إعادة إرسال رمز التحقق إلى بريدك الإلكتروني");
      setCanResend(false);
      setTimer(60);
      setValue("");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-3xl shadow-xl shadow-brand-500/5 border border-brand-100 text-right font-cairo">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 bg-brand-50 text-brand-500 rounded-2xl flex items-center justify-center mb-4 border border-brand-100 shadow-inner">
          <Mail className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">
          تأكيد رمز التحقق
        </h2>
        <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
          أدخل الرمز المكون من 6 أرقام والذي أرسلناه إلى بريدك: <br />
          <span className="font-bold text-brand-900 tracking-wide dir-ltr inline-block mt-1">
            {email}
          </span>
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl flex items-center gap-2 animate-shake">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-3.5 bg-brand-50 border border-brand-100 text-brand-900 text-sm rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-brand-500" />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="mb-8 flex justify-center" dir="ltr">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(val) => setValue(val)}
          onComplete={(val) => handleVerify(val)}
          disabled={loading}
          pattern={REGEXP_ONLY_DIGITS}
          autoFocus
        >
          <InputOTPGroup className="verfiy-otp">
            <InputOTPSlot className="verfiy-otp-slot" index={0} />
            <InputOTPSlot className="verfiy-otp-slot" index={1} />
            <InputOTPSlot className="verfiy-otp-slot" index={2} />
            <InputOTPSlot className="verfiy-otp-slot" index={3} />
            <InputOTPSlot className="verfiy-otp-slot" index={4} />
            <InputOTPSlot className="verfiy-otp-slot" index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button
        onClick={() => handleVerify()}
        disabled={loading || value.length < OTP_LENGTH}
        className="cursor-pointer w-full py-6 px-4 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg shadow-brand-500/25 hover:shadow-brand-500/35 transition-all duration-200 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span>جاري التحقق...</span>
            <Spinner />
          </>
        ) : (
          <span>تأكيد الحساب</span>
        )}
      </Button>

      <div className="mt-6 text-center text-sm text-gray-500">
        لم يصلك الرمز؟{" "}
        {canResend ? (
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resending}
            className="cursor-pointer text-brand-500 font-bold hover:text-brand-600 hover:underline disabled:opacity-50 inline-flex items-center gap-1 transition-colors"
          >
            {resending && <Spinner />}
            إعادة الإرسال الآن
          </button>
        ) : (
          <span className="text-gray-400 font-medium">
            إعادة الإرسال خلال{" "}
            <span className="text-brand-500 font-bold tracking-wider dir-ltr inline-block">
              {timer}s
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
