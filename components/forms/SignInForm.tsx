"use client";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { FieldGroup } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/CustomButton";
import CustomField from "@/components/forms/CustomField";
import { FormFieldType } from "@/lib/types";
import { formSchemaSignIn } from "@/lib/validation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignIn } from "@/actions/auth.actions";

function SignInForm() {
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchemaSignIn>>({
    resolver: zodResolver(formSchemaSignIn),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchemaSignIn>) {
    setIsLoading(true);
    setError(null);
    try {
      const result = await SignIn(data);
      if (result?.success) {
        console.log("success signIn");
        router.push(`/onboarding`);
      }else {
        setError(result?.error || "بيانات الدخول غير صحيحة، يرجى التأكد من البريد وكلمة المرور");
      }
    } catch (e) {
      console.log("failed to sign in ", e);
      setError("حدث خطأ غير متوقع في الاتصال، يرجى المحاولة لاحقاً");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <CustomField
          control={form.control}
          name="email"
          fieldtype={FormFieldType.INPUT}
          label="البريد الالكتروني"
          placeholder="name@example.com"
          Icon={Mail}
        />
        <CustomField
          control={form.control}
          name="password"
          fieldtype={FormFieldType.PASSWORD}
          placeholder="••••••••"
          Icon={Lock}
          forgetPassword={true}
        />
      </FieldGroup>
      {error && (
        <div className="p-3 bg-brand-50 border border-brand-100 rounded-xl text-xs text-brand-700 font-semibold leading-relaxed">
          {error}
        </div>
      )}
      <CustomButton
        isLoading={loading}
        className="w-full py-6 px-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/35 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer mt-6"
      >
        <span>تسجيل الدخول</span>
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      </CustomButton>
    </form>
  );
}

export default SignInForm;
