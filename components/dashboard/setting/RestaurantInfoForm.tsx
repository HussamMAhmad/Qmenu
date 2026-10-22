"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  Phone,
  Banknote,
  FileText,
  Store,
  DollarSign,
  Save,
  Globe2,
} from "lucide-react";
import CustomField from "@/components/forms/CustomField";
import CustomButton from "@/components/CustomButton";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingInfoSchema } from "@/lib/validation";
import { FormFieldType } from "@/lib/types";
import { updateResSetting } from "@/actions/dashboard.actions";
import ImageDropZone from "../ImageDropZone";
import { MAX_SIZE } from "@/constants";

function RestaurantInfoForm({
  initialData,
}: {
  initialData: RestaurantInfo | null;
}) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof SettingInfoSchema>>({
    resolver: zodResolver(SettingInfoSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      exchangeRate: initialData?.exchangeRate ?? 1,
      whatsappNumber: initialData?.whatsappNumber ?? "",
      showUSD: initialData?.showUSD ?? true,
      imageCoverUrl: initialData?.imageCoverUrl,
      logo: initialData?.logo,
    },
  });

  const isDollarEnabled = form.watch("showUSD");

  async function onSubmit(data: z.infer<typeof SettingInfoSchema>) {
    setLoading(true);
    let formData = new FormData();
    if (data.imageCoverUrl && data.imageCoverUrl.length > 0) {
      const imageFile = data.imageCoverUrl[0];
      if (imageFile.size >= MAX_SIZE) {
        toast.error("حجم الصورة كبير جدا, الحد الاقصى المسموح به هو 4 ميغا");
        setLoading(false);
        return;
      }
      formData.append("img", imageFile);
    } else {
      formData.append("removeImg", "true");
    }
    if (data.logo && data.logo.length > 0) {
      const logo = data.logo[0];
      if (logo.size >= MAX_SIZE) {
        toast.error("حجم الصورة كبير جدا, الحد الاقصى المسموح به هو 4 ميغا");
        setLoading(false);
        return;
      }
      formData.append("logo", logo);
    } else {
      formData.append("removeLogo", "true");
    }
    try {
      const result = await updateResSetting(data, formData);
      if (result?.success) {
        toast.success(result.message);
      } else {
        toast.error(
          typeof result?.message === "string"
            ? result.message
            : "حدث خطأ أثناء تعديل الإعدادات",
        );
      }
    } catch (e) {
      console.error("failed to update settings ", e);
      toast.error("حدث خطأ غير متوقع، يرجى المحاولة لاحقاً");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 pt-2"
      dir="rtl"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Globe2 className="h-4 w-4 text-brand-600" />
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            معلومات القائمة العامة
          </h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <CustomField
              control={form.control}
              name="name"
              fieldtype={FormFieldType.INPUT}
              label="اسم المطعم"
              placeholder="مثال: مطعم الياسمين الدمشقي"
              Icon={Store}
              disabled={loading}
            />
          </div>
          <div className="sm:col-span-2">
            <CustomField
              control={form.control}
              name="description"
              fieldtype={FormFieldType.INPUT}
              label="وصف قصير للمنيو"
              placeholder="أشهى المأكولات الشرقية والغربية والوجبات السريعة يومياً من الساعة 12 ظهراً"
              Icon={FileText}
              disabled={loading}
            />
          </div>
          <div className="sm:col-span-2">
            <CustomField
              control={form.control}
              name="whatsappNumber"
              fieldtype={FormFieldType.INPUT}
              label="رقم الواتساب للطلبات (اختياري)"
              placeholder="+963912345678"
              Icon={Phone}
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <DollarSign className="h-4 w-4 text-brand-600" />
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            تفضيلات العملة والأسعار
          </h3>
        </div>
        <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <CustomField
              control={form.control}
              name="showUSD"
              fieldtype={FormFieldType.CHECKBOX}
              label="تفعيل عرض الأسعار بالدولار الأمريكي (USD)"
              disabled={loading}
            />
          </div>
          {isDollarEnabled && (
            <div className="pt-2 border-t border-slate-200/60 animate-in fade-in duration-200">
              <CustomField
                control={form.control}
                name="exchangeRate"
                fieldtype={FormFieldType.NUMBER}
                label="سعر صرف الدولار مقابل الليرة المحلية"
                placeholder="مثال: 15000"
                Icon={Banknote}
                disabled={loading}
              />
              <p className="text-[11px] text-slate-400 mt-1.5">
                سيتم استخدام هذا المعامل لتحويل الأسعار تلقائياً في واجهة
                الزبائن.
              </p>
            </div>
          )}
        </div>

        {/* شبكة متجاوبة لعرض صور الخلفية والأيقونة بجانب بعضهما على الشاشات المتوسطة والأكبر */}
        <div className="grid gap-4 sm:grid-cols-2 pt-2">
          <CustomField
            control={form.control}
            name="imageCoverUrl"
            fieldtype={FormFieldType.SKELETON}
            label="صورة الخلفية (الغلاف)"
            renderSkeleton={(field) => (
              <div>
                <ImageDropZone
                  files={field.value}
                  onChange={field.onChange}
                  name={field.name}
                  aspectClass="w-full h-36 sm:h-40 rounded-xl"
                  disabled={loading}
                />
              </div>
            )}
          />
          <CustomField
            control={form.control}
            name="logo"
            fieldtype={FormFieldType.SKELETON}
            label="صورة الأيقونة (الشعار)"
            renderSkeleton={(field) => (
              <div>
                <ImageDropZone
                  files={field.value}
                  onChange={field.onChange}
                  name={field.name}
                  aspectClass="w-full h-36 sm:h-40 rounded-xl"
                  disabled={loading}
                />
              </div>
            )}
          />
        </div>
      </div>

      <div className="pt-4 flex items-center justify-end border-t border-slate-100">
        <CustomButton
          label="جاري الحفظ"
          type="submit"
          isLoading={loading}
          className="w-full sm:w-auto h-11 px-8 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs gap-2 shadow-sm transition-all cursor-pointer"
        >
          <Save className="h-4 w-4" />
          <span>حفظ الإعدادات</span>
        </CustomButton>
      </div>
    </form>
  );
}

export default RestaurantInfoForm;
