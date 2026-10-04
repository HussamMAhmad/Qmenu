// components/onboarding/restaurant-onboarding-form.tsx
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Store,
  FileText,
  Banknote,
  Phone,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import CustomField from "./CustomField";
import CustomButton from "../CustomButton";
import { restaurantOnboardingSchema } from "@/lib/validation";
import { FormFieldType } from "@/lib/types";
import { CompleteOnboarding } from "@/actions/onboarding.actions";
import CreateMenu from "../CreateMenu";

export default function OnboardingForm() {
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof restaurantOnboardingSchema>>({
    resolver: zodResolver(restaurantOnboardingSchema),
    defaultValues: {
      name: "",
      description: "",
      exchangeRate: 15000,
      whatsappNumber: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof restaurantOnboardingSchema>,
  ) => {
    setLoading(true);
    setServerError(null);
    try {
      const res = await CompleteOnboarding(values);
      if (res.success) {
        setIsComplete(true);
      } else {
        setServerError(
          res.error || "حدث خطأ أثناء حفظ البيانات، يرجى المحاولة لاحقاً",
        );
      }
    } catch {
      setServerError("حدث خطأ غير متوقع في الاتصال بالسيرفر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isComplete ? <CreateMenu resturantName={form.getValues("name")} /> : ""}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/60 p-6 sm:p-8">
        {serverError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
            {serverError}
          </div>
        )}

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          dir="rtl"
        >
          <CustomField
            control={form.control}
            name="name"
            fieldtype={FormFieldType.INPUT}
            label="اسم المطعم"
            placeholder="مثال: مطعم الياسمين الدمشقي"
            Icon={Store}
          />

          <CustomField
            control={form.control}
            name="description"
            fieldtype={FormFieldType.INPUT}
            label="وصف قصير للمنيو"
            placeholder="أشهى المأكولات الشرقية والغربية والوجبات السريعة يومياً من الساعة 12 ظهراً"
            Icon={FileText}
          />

          <CustomField
            control={form.control}
            name="exchangeRate"
            fieldtype={FormFieldType.NUMBER}
            label="سعر صرف الدولار مقابل الليرة"
            placeholder="15000"
            Icon={Banknote}
          />
          <div className="space-y-2">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-brand-50 border border-brand-100 text-brand-900 mt-2">
              <Sparkles className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed font-medium">
                <span className="font-bold">ملاحظة:</span> يمكنك تغيير سعر الصرف
                بنقرة واحدة مستقبلاً لتعدل كل أسعار المنيو فوراً.
              </p>
            </div>
          </div>

          <CustomField
            control={form.control}
            name="whatsappNumber"
            fieldtype={FormFieldType.INPUT}
            label="رقم الواتساب للطلبات (اختياري)"
            placeholder="+963912345678"
            Icon={Phone}
          />

          <CustomButton
            isLoading={loading}
            className="w-full mt-4 py-6 px-6 rounded-xl font-bold text-white bg-brand-500 hover:bg-brand-600 active:bg-brand-700 focus:ring-4 focus:ring-brand-100 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 disabled:opacity-70 cursor-pointer"
          >
            <span>حفظ و بدء اضافة الوجبات</span>
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </CustomButton>
        </form>
      </div>
    </div>
  );
}
