"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { FieldGroup } from "@/components/ui/field";
import CustomButton from "@/components/CustomButton";
import CustomField from "@/components/forms/CustomField";
import { FormFieldType } from "@/lib/types";
import { formSchemaForgetPassword } from "@/lib/validation";
import { resetPasswordRequest } from "@/actions/auth.actions";

export default function ForgetPasswordForm() {
  const [loading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchemaForgetPassword>>({
    resolver: zodResolver(formSchemaForgetPassword),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchemaForgetPassword>) {
    setError(null);
    setIsLoading(true);

    try {
      const data = await resetPasswordRequest(values.email);
      if (!data) {
        setError("حدث خطأ أثناء إرسال رابط إعادة التعيين");
      } else {
        setIsSuccess(true);
      }
    } catch (e) {
      console.error("Failed to send reset link:", e);
      setError("حدث خطأ غير متوقع، يرجى المحاولة لاحقاً");
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-sm">
          <CheckCircle2 size={26} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          تم إرسال رابط إعادة التعيين!
        </h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          تفقد صندوق البريد الإلكتروني الخاص بك، لقد أرسلنا رابطاً لتعيين كلمة
          مرور جديدة.
        </p>
        <Link
          href="/sign-in"
          className="inline-flex items-center justify-center w-full py-3 px-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-brand-500/25 active:scale-[0.99]"
        >
          العودة لتسجيل الدخول
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <CustomField
          control={form.control}
          name="email"
          fieldtype={FormFieldType.INPUT}
          placeholder="name@example.com"
          Icon={Mail}
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
          <span>إرسال رابط التعيين</span>
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        </CustomButton>

        <div className="text-center mt-4">
          <Link
            href="/sign-in"
            className="text-xs font-semibold text-slate-500 hover:text-brand-600 transition-colors"
          >
            تذكرت كلمة المرور؟ تسجيل الدخول
          </Link>
        </div>
      </FieldGroup>
    </form>
  );
}
