"use client";
import { Lock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { FieldGroup } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/CustomButton";
import CustomField from "@/components/forms/CustomField";
import { FormFieldType } from "@/lib/types";
import { formSchemaResetPassword } from "@/lib/validation";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth.client";
import Link from "next/link";
import { BiError } from "react-icons/bi";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchemaResetPassword>>({
    resolver: zodResolver(formSchemaResetPassword),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(
    newPassword: z.infer<typeof formSchemaResetPassword>,
  ) {
    if (!token) {
      setError("رمز إعادة التعيين مفقود أو غير صالحة. يرجى طلب رابط جديد.");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const { data, error } = await authClient.resetPassword({
        newPassword: newPassword.password,
        token,
      });
      if (error) {
        setError(error.message || "حدث خطأ أثناء تغيير كلمة المرور");
      } else if (data) {
        setIsSuccess(true);
      }
    } catch (e) {
      console.log("failed to reset password ", e);
      setError("حدث خطأ غير متوقع، يرجى المحاولة لاحقاً");
    } finally {
      setIsLoading(false);
    }
  }

  if (!token && !isSuccess) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-100">
          <BiError size={30} />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          رابط غير صالحة
        </h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          يبدو أن رابط إعادة تعيين كلمة المرور غير مكتمل أو انتهت صلاحيته.
        </p>
        <Link
          href="/forget-password"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-brand-500 text-white text-sm font-semibold rounded-xl hover:bg-brand-600 active:scale-[0.99] transition-all shadow-sm shadow-brand-500/20"
        >
          طلب رابط جديد
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
          <CheckCircle2 size={26} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          تم تحديث كلمة المرور!
        </h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          يمكنك الآن استخدام كلمة المرور الجديدة لتسجيل الدخول إلى حسابك.
        </p>
        <button
          onClick={() => router.push("/sign-in")}
          className="w-full py-2.5 px-4 bg-brand-500 text-white font-semibold text-sm rounded-xl hover:bg-brand-600 active:scale-[0.99] transition-all shadow-sm shadow-brand-500/25"
        >
          الانتقال لتسجيل الدخول
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <CustomField
          control={form.control}
          name="password"
          fieldtype={FormFieldType.PASSWORD}
          placeholder="••••••••"
          Icon={Lock}
        />
        {error && (
          <div className="p-3 bg-brand-50 border border-brand-100 rounded-xl text-xs text-brand-700 font-semibold leading-relaxed">
            {error}
          </div>
        )}
        <CustomButton
          isLoading={loading}
          className="w-full py-6 px-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/35 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer mt-6"
        >
          <span>ادخل كلمة المرور الجديدة</span>
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        </CustomButton>
      </FieldGroup>
    </form>
  );
}

export default ResetPasswordForm;
