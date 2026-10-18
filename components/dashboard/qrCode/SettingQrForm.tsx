"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FileText, ArrowLeft, Palette } from "lucide-react";
import CustomField from "@/components/forms/CustomField";
import CustomButton from "@/components/CustomButton";
import { QrSetting } from "@/lib/validation";
import { FormFieldType } from "@/lib/types";
import { updateSetting } from "@/actions/dashboard.actions";
import { toast } from "sonner";
import ImageDropZone from "../ImageDropZone";
import { DEFAULT_QR_SETTING_COLOR } from "@/data/dashboard.constants";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MAX_SIZE } from "@/constants";
interface SettingProps {
  setting: QrSetting;
  setColor: (color: string) => void;
  setSubtitle: (subtitle: string) => void;
  setLogo: (logoUrl: string) => void;
}

export default function SettingQrForm({
  setting,
  setColor,
  setSubtitle,
  setLogo,
}: SettingProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof QrSetting>>({
    resolver: zodResolver(QrSetting),
    defaultValues: {
      qrColor: setting.qrColor,
      qrSubtitle: setting.qrSubtitle,
      qrLogo: setting.qrLogo,
    },
  });

  const color = form.watch("qrColor");
  const subtitle = form.watch("qrSubtitle");
  const logo = form.watch("qrLogo");

  useEffect(() => {
    setColor(color);
    setSubtitle(subtitle);
  }, [color, subtitle]);

  useEffect(() => {
    if (!logo) {
      setLogo("");
      return;
    }

    if (typeof logo === "string") {
      setLogo(logo);
    } else if (Array.isArray(logo) && (logo as any).length > 0) {
      const file = logo[0];

      if (file && typeof file === "object" && "size" in file) {
        const previewUrl = URL.createObjectURL(file as File);
        setLogo(previewUrl);
      }
    }
  }, [logo, setLogo]);

  const onSubmit = async (values: z.infer<typeof QrSetting>) => {
    setLoading(true);
    let formData = new FormData();
    if (values.qrLogo && values.qrLogo.length > 0) {
      const imageFile = values.qrLogo[0];
      if (imageFile.size >= MAX_SIZE) {
        toast.error("حجم الصورة كبير جدا, الحد الاقصى المسموح به هو 4 ميغا");
        setLoading(false);
        return;
      }
      formData.append("file", imageFile);
    } else {
      formData.append("removeLogo", "true");
    }
    try {
      const res = await updateSetting(values, formData);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("حدث خطأ غير متوقع في الاتصال بالسيرفر");
    } finally {
      setLoading(false);
    }
  };

  function handleColor(value: string) {
    setColor(value);
    form.setValue("qrColor", value);
  }
  return (
    <div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        dir="rtl"
      >
        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Palette className="h-3.5 w-3.5 text-slate-500" />
            <span>لون الرمز</span>
          </Label>
          <div className="flex items-center gap-2.5 flex-wrap">
            {DEFAULT_QR_SETTING_COLOR.map((col) => (
              <Button
                key={col.value}
                type="button"
                onClick={() => handleColor(col.value)}
                className={`h-8 w-8 rounded-full border-2 transition-all cursor-pointer ${
                  color === col.value
                    ? "border-brand-600 scale-110 shadow-sm ring-2 ring-brand-200"
                    : "border-slate-200 hover:scale-105"
                }`}
                style={{ backgroundColor: col.value }}
                title={col.name}
              />
            ))}
          </div>
        </div>
        <CustomField
          control={form.control}
          name="qrColor"
          fieldtype={FormFieldType.INPUT}
          label="ادخل الكود او اختر لونا جاهزا"
          placeholder="#0f172a"
          Icon={FileText}
        />

        <CustomField
          control={form.control}
          name="qrLogo"
          fieldtype={FormFieldType.SKELETON}
          label="شعار المطعم في المنتصف (اختياري)"
          renderSkeleton={(field) => (
            <div>
              <ImageDropZone
                files={field.value}
                onChange={field.onChange}
                name={field.name}
                aspectClass="w-full h-56 rounded-2xl"
              />
            </div>
          )}
        />

        <CustomField
          control={form.control}
          name="qrSubtitle"
          fieldtype={FormFieldType.INPUT}
          label="الوصف الترويجي تحت الرمز"
          placeholder="مثال : امسح الكود لتصفح القائمة"
        />

        <CustomButton
          isLoading={loading}
          className="w-full mt-4 py-6 px-6 rounded-xl font-bold text-white bg-brand-500 hover:bg-brand-600 active:bg-brand-700 focus:ring-4 focus:ring-brand-100 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 disabled:opacity-70 cursor-pointer"
        >
          <span>حفظ الاعدادات</span>
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        </CustomButton>
      </form>
    </div>
  );
}
