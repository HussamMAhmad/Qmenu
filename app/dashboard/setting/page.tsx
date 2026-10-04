"use client";

import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Check,
  ChevronLeft,
  Eye,
  Globe2,
  Image as ImageIcon,
  Info,
  Menu,
  Pencil,
  RefreshCw,
  Save,
  Store,
  Upload,
  UserRound,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

type ToggleRowProps = {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
};

function ToggleRow({
  title,
  description,
  checked,
  onCheckedChange,
}: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4">
      <div className="min-w-0">
        <p className="text-xs font-extrabold text-slate-800">{title}</p>
        <p className="mt-1 max-w-xl text-[10px] leading-5 text-slate-400">
          {description}
        </p>
      </div>

      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="shrink-0 data-[state=checked]:bg-brand-500"
      />
    </div>
  );
}

export default function SettingsPage() {
  const [restaurantName, setRestaurantName] = useState("مطعم السلطان");
  const [restaurantDescription, setRestaurantDescription] = useState(
    "أشهى المأكولات والوجبات المختارة بعناية لتجربة طعام مميزة."
  );

  const [showDollarPrice, setShowDollarPrice] = useState(true);
  const [showSypPrice, setShowSypPrice] = useState(true);
  const [showLogo, setShowLogo] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [menuLive, setMenuLive] = useState(true);
  const [showCategoriesCount, setShowCategoriesCount] = useState(true);

  const [exchangeRate, setExchangeRate] = useState(14800);
  const [language, setLanguage] = useState("العربية");
  const [saved, setSaved] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const saveSettings = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    const url = URL.createObjectURL(file);
    setLogoPreview(url);
  };

  const resetSettings = () => {
    setRestaurantName("مطعم السلطان");
    setRestaurantDescription(
      "أشهى المأكولات والوجبات المختارة بعناية لتجربة طعام مميزة."
    );
    setShowDollarPrice(true);
    setShowSypPrice(true);
    setShowLogo(true);
    setShowDescription(true);
    setMenuLive(true);
    setShowCategoriesCount(true);
    setExchangeRate(14800);
    setLanguage("العربية");
    setLogoPreview(null);
  };

  return (
    <main
      dir="rtl"
      className="font-cairo min-h-screen bg-[#f7f8fa] px-4 py-5 text-slate-800 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1380px] space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Store className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold tracking-wide text-brand-700">
                SETTINGS
              </span>
            </div>

            <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              إعدادات المطعم والمنيو
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              تحكم بالمعلومات الظاهرة للعملاء، طريقة عرض الأسعار، هوية المطعم،
              وحالة المنيو من مكان واحد.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link href="/m/al-sultan" target="_blank" rel="noreferrer">
              <Button
                variant="outline"
                className="h-11 w-full gap-2 rounded-xl border-slate-200 bg-white font-bold hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 sm:w-auto"
              >
                <Eye className="h-4 w-4" />
                معاينة المنيو
              </Button>
            </Link>

            <Button
              onClick={saveSettings}
              className="h-11 gap-2 rounded-xl bg-brand-500 px-5 font-bold text-white shadow-sm hover:bg-brand-600"
            >
              {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saved ? "تم حفظ التغييرات" : "حفظ التغييرات"}
            </Button>
          </div>
        </header>

        {/* Status */}
        <section className="grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Check className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[10px] font-medium text-slate-400">حالة المنيو</p>
              <p className="mt-0.5 text-xs font-extrabold text-emerald-700">
                {menuLive ? "منشور ومتاح للعملاء" : "متوقف مؤقتاً"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Globe2 className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[10px] font-medium text-slate-400">لغة المنيو</p>
              <p className="mt-0.5 text-xs font-extrabold text-slate-700">{language}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <RefreshCw className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[10px] font-medium text-slate-400">سعر الصرف</p>
              <p className="mt-0.5 text-xs font-extrabold text-slate-700">
                {exchangeRate.toLocaleString("en-US")} ل.س / $
              </p>
            </div>
          </div>
        </section>

        {/* Workspace */}
        <section className="grid items-start gap-5 xl:grid-cols-[1fr_360px]">
          {/* Main settings */}
          <div className="space-y-5">
            {/* Restaurant identity */}
            <Card className="rounded-[28px] border-slate-200/70 bg-white shadow-sm">
              <CardHeader className="border-b border-slate-100 px-5 py-5 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Store className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <CardTitle className="text-base font-black text-slate-950">
                      معلومات المطعم
                    </CardTitle>
                    <CardDescription className="mt-1 text-xs">
                      هذه المعلومات تظهر في واجهة المنيو للعملاء.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-5 p-5 sm:p-6">
                <div className="grid gap-5 md:grid-cols-[1fr_180px]">
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-600">
                        اسم المطعم
                      </label>
                      <div className="relative">
                        <UserRound className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          value={restaurantName}
                          onChange={(e) => setRestaurantName(e.target.value)}
                          className="h-11 rounded-xl border-slate-200 pr-10 text-sm font-bold focus-visible:ring-brand-500"
                          placeholder="اسم المطعم"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-600">
                        وصف المطعم
                      </label>
                      <textarea
                        value={restaurantDescription}
                        onChange={(e) => setRestaurantDescription(e.target.value)}
                        rows={4}
                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs leading-6 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/10"
                        placeholder="اكتب وصفاً مختصراً عن المطعم..."
                      />
                      <p className="mt-1.5 text-[10px] text-slate-400">
                        استخدم وصفاً قصيراً وواضحاً يساعد العميل على معرفة هوية المطعم.
                      </p>
                    </div>

                    <ToggleRow
                      title="إظهار وصف المطعم"
                      description="اعرض الوصف أسفل اسم المطعم في رأس المنيو."
                      checked={showDescription}
                      onCheckedChange={setShowDescription}
                    />
                  </div>

                  {/* Logo */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-600">
                      شعار المطعم
                    </label>

                    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-3">
                      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-white">
                        {logoPreview ? (
                          <img
                            src={logoPreview}
                            alt="شعار المطعم"
                            className="h-full w-full object-contain p-5"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-slate-300">
                            <ImageIcon className="h-10 w-10" strokeWidth={1.5} />
                            <span className="text-[10px] font-bold">شعار المطعم</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <label className="flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white text-[10px] font-bold text-slate-600 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700">
                          <Upload className="h-3.5 w-3.5" />
                          رفع شعار
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleLogoUpload}
                          />
                        </label>

                        <Button
                          type="button"
                          variant="outline"
                          className="h-9 rounded-xl border-slate-200 text-[10px] font-bold"
                          onClick={() => setLogoPreview(null)}
                          disabled={!logoPreview}
                        >
                          إزالة
                        </Button>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-[9px] leading-4 text-slate-400">
                      <Info className="h-3 w-3 shrink-0" />
                      يفضّل استخدام صورة مربعة بخلفية شفافة.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="rounded-[28px] border-slate-200/70 bg-white shadow-sm">
              <CardHeader className="border-b border-slate-100 px-5 py-5 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <span className="text-sm font-black">$</span>
                  </span>
                  <div>
                    <CardTitle className="text-base font-black text-slate-950">
                      عرض الأسعار والعملات
                    </CardTitle>
                    <CardDescription className="mt-1 text-xs">
                      حدد كيف تظهر الأسعار داخل المنيو.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 p-5 sm:p-6">
                <ToggleRow
                  title="إظهار سعر الدولار"
                  description="عرض السعر الأساسي بالدولار بجانب سعر الوجبة في المنيو."
                  checked={showDollarPrice}
                  onCheckedChange={setShowDollarPrice}
                />

                <ToggleRow
                  title="إظهار السعر بالليرة السورية"
                  description="عرض السعر المحسوب بالليرة السورية للعملاء."
                  checked={showSypPrice}
                  onCheckedChange={setShowSypPrice}
                />

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-extrabold text-slate-700">
                        سعر الصرف المستخدم
                      </p>
                      <p className="mt-1 text-[10px] text-slate-400">
                        يتم استخدامه لتحويل أسعار الوجبات تلقائياً.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={exchangeRate}
                        onChange={(e) => setExchangeRate(Number(e.target.value))}
                        className="h-10 w-[150px] rounded-xl border-slate-200 text-sm font-black focus-visible:ring-brand-500"
                      />
                      <span className="whitespace-nowrap text-[10px] font-bold text-slate-500">
                        ل.س / $
                      </span>
                    </div>
                  </div>
                </div>

                {!showDollarPrice && !showSypPrice && (
                  <div className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3.5 py-3 text-[10px] leading-5 text-amber-800">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    يجب إبقاء عملة واحدة على الأقل مفعّلة حتى تظهر أسعار الوجبات
                    للعملاء.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Menu display */}
            <Card className="rounded-[28px] border-slate-200/70 bg-white shadow-sm">
              <CardHeader className="border-b border-slate-100 px-5 py-5 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Menu className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <CardTitle className="text-base font-black text-slate-950">
                      إعدادات عرض المنيو
                    </CardTitle>
                    <CardDescription className="mt-1 text-xs">
                      تحكم في ظهور المنيو والمعلومات المساندة للعملاء.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 p-5 sm:p-6">
                <ToggleRow
                  title="إظهار شعار المطعم في المنيو"
                  description="عرض شعار المطعم أعلى صفحة المنيو."
                  checked={showLogo}
                  onCheckedChange={setShowLogo}
                />

                <ToggleRow
                  title="إظهار عدد الوجبات داخل الأقسام"
                  description="عرض عدد الوجبات بجانب اسم كل قسم."
                  checked={showCategoriesCount}
                  onCheckedChange={setShowCategoriesCount}
                />

                <ToggleRow
                  title="المنيو متاح للعملاء"
                  description="عند الإيقاف لن يظهر المنيو للزوار حتى تعيد تفعيله."
                  checked={menuLive}
                  onCheckedChange={setMenuLive}
                />

                <div className="grid gap-3 pt-2 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-600">
                      لغة المنيو
                    </label>
                    <div className="relative">
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 pl-10 text-xs font-bold text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/10"
                      >
                        <option>العربية</option>
                        <option>English</option>
                      </select>
                      <ChevronLeft className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-[-90deg] text-slate-400" />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-4 py-3">
                    <p className="text-[10px] font-bold text-slate-400">
                      الرابط العام
                    </p>
                    <p className="mt-2 truncate font-mono text-[10px] font-bold text-slate-600" dir="ltr">
                      yourdomain.com/m/al-sultan
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reset */}
            <div className="flex flex-col gap-3 rounded-[24px] border border-slate-200/70 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div>
                <p className="text-xs font-black text-slate-800">
                  إعادة الإعدادات الافتراضية
                </p>
                <p className="mt-1 text-[10px] text-slate-400">
                  إعادة القيم الحالية إلى إعدادات البداية في هذه الصفحة.
                </p>
              </div>

              <Button
                variant="outline"
                onClick={resetSettings}
                className="h-10 gap-2 rounded-xl border-slate-200 text-xs font-bold hover:bg-slate-50"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                إعادة التعيين
              </Button>
            </div>
          </div>

          {/* Preview / side panel */}
          <aside className="space-y-5 xl:sticky xl:top-5">
            <Card className="overflow-hidden rounded-[30px] border-slate-200/70 bg-white shadow-sm">
              <CardHeader className="border-b border-slate-100 px-5 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-black text-slate-950">
                      معاينة سريعة
                    </CardTitle>
                    <p className="mt-1 text-xs text-slate-400">
                      كيف سيظهر الجزء العلوي من المنيو
                    </p>
                  </div>

                  <Badge className="rounded-full border-0 bg-brand-50 px-3 text-[10px] font-bold text-brand-700 hover:bg-brand-50">
                    LIVE
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-5">
                <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                  <div className="bg-brand-50/60 p-5 text-center">
                    {showLogo && (
                      <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white text-brand-600 shadow-sm">
                        {logoPreview ? (
                          <img
                            src={logoPreview}
                            alt="شعار المطعم"
                            className="h-full w-full object-contain p-2"
                          />
                        ) : (
                          <Store className="h-7 w-7" strokeWidth={1.6} />
                        )}
                      </div>
                    )}

                    <h2 className="text-xl font-black text-slate-950">
                      {restaurantName || "اسم المطعم"}
                    </h2>

                    {showDescription && (
                      <p className="mx-auto mt-2 max-w-xs text-[10px] leading-5 text-slate-500">
                        {restaurantDescription || "وصف المطعم سيظهر هنا."}
                      </p>
                    )}

                    <div className="mt-4 flex items-center justify-center gap-2">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-[9px] font-bold text-emerald-700">
                        {menuLive ? "المنيو مفتوح" : "المنيو مغلق"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 p-4">
                    {[
                      { name: "برغر السلطان الخاص", usd: 4.5 },
                      { name: "بيتزا مارغريتا وسط", usd: 6 },
                      { name: "بطاطا ويدجز عائلية", usd: 2 },
                    ].map((dish) => (
                      <div
                        key={dish.name}
                        className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-[11px] font-extrabold text-slate-800">
                            {dish.name}
                          </p>
                          <p className="mt-1 text-[9px] text-slate-400">
                            الوجبات الرئيسية
                          </p>
                        </div>

                        <div className="shrink-0 text-left">
                          {showDollarPrice && (
                            <p className="text-[10px] font-black text-slate-800">
                              ${dish.usd.toFixed(2)}
                            </p>
                          )}
                          {showSypPrice && (
                            <p className="mt-0.5 text-[9px] font-bold text-brand-700">
                              {(dish.usd * exchangeRate).toLocaleString("en-US")} ل.س
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href="/m/al-sultan" target="_blank" rel="noreferrer">
                  <Button
                    variant="outline"
                    className="mt-4 h-10 w-full gap-2 rounded-xl border-slate-200 text-xs font-bold hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                  >
                    عرض المنيو بالكامل
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Helpful note */}
            <Card className="rounded-[26px] border-brand-100 bg-brand-50/60 shadow-none">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
                    <Pencil className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-black text-brand-900">
                      نصيحة للتخصيص
                    </p>
                    <p className="mt-1 text-[10px] leading-5 text-brand-700/70">
                      اجعل اسم المطعم والوصف مختصرين وواضحين، واستخدم لوناً
                      أساسياً ثابتاً متوافقاً مع هوية المطعم.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </section>
      </div>
    </main>
  );
}
