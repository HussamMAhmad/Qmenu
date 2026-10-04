"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  Check,
  Copy,
  Download,
  Eye,
  ExternalLink,
  Link2,
  Palette,
  QrCode,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

type ColorSwatch = {
  name: string;
  value: string;
};

const BRAND_PALETTE: ColorSwatch[] = [
  { name: "Brand", value: "#5B4AE6" },
  { name: "Deep", value: "#4736C7" },
  { name: "Indigo", value: "#6D5CEB" },
  { name: "Violet", value: "#7C6FF0" },
  { name: "Blue", value: "#4F63E8" },
  { name: "Slate", value: "#334155" },
  { name: "Dark", value: "#0F172A" },
  { name: "Emerald", value: "#0F9F6E" },
  { name: "Amber", value: "#C88A16" },
  { name: "Rose", value: "#C94A68" },
  { name: "White", value: "#FFFFFF" },
  { name: "Soft", value: "#F8FAFC" },
];

const QR_MATRIX = [
  "111111100101011111111",
  "100000101101010000001",
  "101110101011010111101",
  "101110100110010111101",
  "101110101001010111101",
  "100000100111010000001",
  "111111101010111111111",
  "000000001110000000000",
  "110101110011101011011",
  "001110011101110100100",
  "111001101011001110111",
  "010111001110111001010",
  "101101110001011110101",
  "000000001011100000000",
  "111111101110101111111",
  "100000100011001000001",
  "101110101110101011101",
  "101110100010101011101",
  "101110101101101011101",
  "100000101010101000001",
  "111111101101101111111",
];

export default function QRCodePage() {
  const menuUrl = "https://yourdomain.com/m/al-sultan";

  const [foreground, setForeground] = useState("#5B4AE6");
  const [background, setBackground] = useState("#FFFFFF");
  const [customColor, setCustomColor] = useState("#5B4AE6");
  const [title, setTitle] = useState("امسح الكود لعرض المنيو");
  const [subtitle, setSubtitle] = useState("اطلب بسهولة من منيو السلطان");
  const [showBrand, setShowBrand] = useState(true);
  const [showUrl, setShowUrl] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const qrPreviewRef = useRef<HTMLDivElement | null>(null);

  const qrCells = useMemo(
    () =>
      QR_MATRIX.map((row) =>
        row.split("").map((cell) => cell === "1")
      ),
    []
  );

  const selectColor = (color: string) => {
    setForeground(color);
    setCustomColor(color);
  };

  const handleCustomColor = (value: string) => {
    setCustomColor(value);
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setForeground(value);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const resetDesign = () => {
    setForeground("#5B4AE6");
    setBackground("#FFFFFF");
    setCustomColor("#5B4AE6");
    setTitle("امسح الكود لعرض المنيو");
    setSubtitle("اطلب بسهولة من منيو السلطان");
    setShowBrand(true);
    setShowUrl(false);
  };

  const saveDesign = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  const downloadSvg = () => {
    // This exports the current visual preview structure.
    const cellSize = 12;
    const padding = 24;
    const qrSize = QR_MATRIX.length * cellSize;
    const total = qrSize + padding * 2;

    const rects = QR_MATRIX.flatMap((row, r) =>
      row
        .split("")
        .map((value, c) =>
          value === "1"
            ? `<rect x="${padding + c * cellSize}" y="${padding + r * cellSize}" width="${cellSize}" height="${cellSize}" fill="${foreground}"/>`
            : ""
        )
        .join("")
    ).join("");

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${total}" height="${total}" viewBox="0 0 ${total} ${total}">
        <rect width="100%" height="100%" fill="${background}"/>
        ${rects}
      </svg>
    `.trim();

    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "al-sultan-qr.svg";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const downloadPng = () => {
    const cellSize = 14;
    const padding = 28;
    const qrSize = QR_MATRIX.length * cellSize;
    const canvasSize = qrSize + padding * 2;
    const canvas = document.createElement("canvas");
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    ctx.fillStyle = foreground;
    QR_MATRIX.forEach((row, r) => {
      row.split("").forEach((value, c) => {
        if (value === "1") {
          ctx.fillRect(
            padding + c * cellSize,
            padding + r * cellSize,
            cellSize,
            cellSize
          );
        }
      });
    });

    const anchor = document.createElement("a");
    anchor.href = canvas.toDataURL("image/png");
    anchor.download = "al-sultan-qr.png";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
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
                <QrCode className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold tracking-wide text-brand-700">
                QR MANAGEMENT
              </span>
            </div>

            <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              رمز QR الخاص بالمنيو
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              خصّص ألوان الرمز والنصوص، راجع النتيجة مباشرة، ثم احفظ التصميم أو
              حمّله للاستخدام.
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
                <ExternalLink className="h-3.5 w-3.5 opacity-60" />
              </Button>
            </Link>

            <Button
              onClick={saveDesign}
              className="h-11 gap-2 rounded-xl bg-brand-500 px-5 font-bold text-white shadow-sm hover:bg-brand-600"
            >
              <Check className="h-4 w-4" />
              {saved ? "تم حفظ التصميم" : "حفظ التصميم"}
            </Button>
          </div>
        </header>

        {/* URL */}
        <Card className="rounded-[26px] border-slate-200/70 bg-white shadow-sm">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Link2 className="h-4 w-4" />
                </span>

                <div>
                  <p className="text-xs font-black text-slate-900">
                    رابط المنيو المرتبط
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    هذا هو الرابط الذي سيتم فتحه عند مسح الرمز.
                  </p>
                </div>
              </div>

              <div className="flex flex-1 gap-2 lg:mr-auto">
                <Input
                  readOnly
                  value={menuUrl}
                  className="h-11 min-w-0 rounded-xl border-slate-200 bg-slate-50 font-mono text-[10px]"
                  dir="ltr"
                />
                <Button
                  onClick={copyLink}
                  variant="outline"
                  className="h-11 shrink-0 gap-2 rounded-xl border-slate-200 px-4 font-bold hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? "تم النسخ" : "نسخ الرابط"}
                </Button>
              </div>

              <Badge className="w-fit rounded-full border-0 bg-emerald-50 px-3 text-[10px] font-bold text-emerald-700 hover:bg-emerald-50">
                متاح للعملاء
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Main editor */}
        <section className="grid items-start gap-5 xl:grid-cols-[0.88fr_1.12fr]">
          {/* Controls */}
          <Card className="rounded-[30px] border-slate-200/70 bg-white shadow-sm">
            <CardHeader className="border-b border-slate-100 px-5 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-black text-slate-950">
                    تخصيص التصميم
                  </CardTitle>
                  <p className="mt-1 text-xs text-slate-400">
                    تحكم بالألوان والمحتوى الظاهر حول رمز QR
                  </p>
                </div>

                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Palette className="h-4.5 w-4.5" />
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-7 p-5 sm:p-6">
              {/* Foreground palette */}
              <section>
                <div className="mb-3">
                  <h3 className="text-sm font-black text-slate-950">
                    لون رمز QR
                  </h3>
                  <p className="mt-1 text-[10px] leading-5 text-slate-400">
                    اختر أحد ألوان الهوية أو أدخل لوناً مخصصاً.
                  </p>
                </div>

                <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
                  {BRAND_PALETTE.map((swatch) => {
                    const active =
                      foreground.toLowerCase() === swatch.value.toLowerCase();

                    return (
                      <button
                        key={swatch.name}
                        type="button"
                        onClick={() => selectColor(swatch.value)}
                        title={swatch.name}
                        className={`group relative flex aspect-square items-center justify-center rounded-xl border transition ${
                          active
                            ? "border-brand-500 bg-brand-50 p-1"
                            : "border-slate-200 bg-white p-1 hover:border-brand-200"
                        }`}
                      >
                        <span
                          className="h-full w-full rounded-[9px] border border-black/5"
                          style={{ backgroundColor: swatch.value }}
                        />
                        {active && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span
                              className={`flex h-6 w-6 items-center justify-center rounded-full shadow ${
                                swatch.value.toLowerCase() === "#ffffff"
                                  ? "bg-slate-900 text-white"
                                  : "bg-white text-slate-900"
                              }`}
                            >
                              <Check className="h-3.5 w-3.5" />
                            </span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 p-3.5">
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={customColor}
                      onChange={(e) => handleCustomColor(e.target.value)}
                      className="h-11 w-11 cursor-pointer rounded-xl border-0 bg-transparent p-0"
                      aria-label="اختيار لون مخصص"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-700">
                        لون مخصص
                      </p>
                      <p className="mt-1 text-[10px] text-slate-400">
                        يمكنك اختيار أي لون من لوحة الألوان.
                      </p>
                    </div>
                    <Input
                      value={customColor}
                      onChange={(e) => handleCustomColor(e.target.value)}
                      className="h-10 w-[110px] rounded-xl font-mono text-[10px]"
                      dir="ltr"
                    />
                  </div>
                </div>
              </section>

              {/* Background palette */}
              <section>
                <div className="mb-3">
                  <h3 className="text-sm font-black text-slate-950">
                    لون الخلفية
                  </h3>
                  <p className="mt-1 text-[10px] leading-5 text-slate-400">
                    يفضّل استخدام خلفية فاتحة لسهولة قراءة الرمز.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "#FFFFFF",
                    "#F8FAFC",
                    "#F1F5F9",
                    "#EEF2FF",
                    "#FFFDF7",
                    "#F0FDFA",
                  ].map((color) => {
                    const active =
                      background.toLowerCase() === color.toLowerCase();

                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setBackground(color)}
                        className={`relative h-11 w-11 rounded-xl border p-1 transition ${
                          active
                            ? "border-brand-500"
                            : "border-slate-200 hover:border-brand-200"
                        }`}
                        title={color}
                      >
                        <span
                          className="block h-full w-full rounded-lg border border-black/5"
                          style={{ backgroundColor: color }}
                        />
                        {active && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white">
                              <Check className="h-3 w-3" />
                            </span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <input
                    type="color"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded-xl border-0 bg-transparent p-0"
                    aria-label="اختيار لون خلفية مخصص"
                  />
                  <Input
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="h-10 flex-1 rounded-xl font-mono text-[10px]"
                    dir="ltr"
                  />
                </div>
              </section>

              {/* Text */}
              <section>
                <div className="mb-3">
                  <h3 className="text-sm font-black text-slate-950">
                    النصوص
                  </h3>
                  <p className="mt-1 text-[10px] leading-5 text-slate-400">
                    عدّل النص الظاهر أسفل رمز QR كما تريد.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold text-slate-500">
                      العنوان
                    </label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="h-10 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold text-slate-500">
                      الوصف
                    </label>
                    <Input
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      className="h-10 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </section>

              {/* Visibility */}
              <section>
                <div className="mb-3">
                  <h3 className="text-sm font-black text-slate-950">
                    عناصر إضافية
                  </h3>
                  <p className="mt-1 text-[10px] leading-5 text-slate-400">
                    اختر المعلومات التي تريد ظهورها مع الرمز.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3.5">
                    <div>
                      <p className="text-xs font-bold text-slate-700">
                        إظهار شعار المطعم
                      </p>
                      <p className="mt-1 text-[9px] text-slate-400">
                        مطعم السلطان
                      </p>
                    </div>
                    <Switch
                      checked={showBrand}
                      onCheckedChange={setShowBrand}
                      className="data-[state=checked]:bg-brand-500"
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3.5">
                    <div>
                      <p className="text-xs font-bold text-slate-700">
                        إظهار رابط المنيو
                      </p>
                      <p className="mt-1 font-mono text-[9px] text-slate-400" dir="ltr">
                        yourdomain.com/m/al-sultan
                      </p>
                    </div>
                    <Switch
                      checked={showUrl}
                      onCheckedChange={setShowUrl}
                      className="data-[state=checked]:bg-brand-500"
                    />
                  </div>
                </div>
              </section>

              {/* Reset */}
              <div className="border-t border-slate-100 pt-4">
                <button
                  onClick={resetDesign}
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 transition hover:text-slate-700"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  إعادة الإعدادات الافتراضية
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="overflow-hidden rounded-[30px] border-slate-200/70 bg-white shadow-sm">
            <CardHeader className="border-b border-slate-100 px-5 py-5 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-black text-slate-950">
                    المعاينة
                  </CardTitle>
                  <p className="mt-1 text-xs text-slate-400">
                    المعاينة تتحدث مباشرة مع تغييرات التصميم.
                  </p>
                </div>

                <Badge className="rounded-full border-0 bg-brand-50 px-3 text-[10px] font-bold text-brand-700 hover:bg-brand-50">
                  LIVE
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-5 sm:p-6">
              <div className="rounded-[28px] bg-slate-100/80 p-4 sm:p-8">
                <div
                  ref={qrPreviewRef}
                  className="mx-auto max-w-[520px] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl"
                  style={{ backgroundColor: background }}
                >
                  <div className="p-6 sm:p-10">
                    {showBrand && (
                      <div className="mb-6 flex items-center justify-center gap-2">
                        <span
                          className="flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-sm"
                          style={{ backgroundColor: foreground }}
                        >
                          <QrCode className="h-5 w-5" />
                        </span>
                        <div className="text-right">
                          <p className="text-sm font-black text-slate-900">
                            مطعم السلطان
                          </p>
                          <p className="mt-1 text-[10px] text-slate-400">
                            المنيو الرقمي
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="mx-auto w-full max-w-[350px] rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                      <div className="relative mx-auto grid aspect-square w-full gap-[2px]">
                        <div
                          className="absolute inset-0 grid gap-[2px]"
                          style={{
                            gridTemplateColumns:
                              "repeat(21, minmax(0, 1fr))",
                          }}
                        >
                          {qrCells.flatMap((row, rowIndex) =>
                            row.map((active, colIndex) => (
                              <span
                                key={`${rowIndex}-${colIndex}`}
                                className="aspect-square rounded-[2px]"
                                style={{
                                  backgroundColor: active
                                    ? foreground
                                    : "transparent",
                                }}
                              />
                            ))
                          )}
                        </div>

                        {/* Finder rings */}
                        {[
                          "left-0 top-0",
                          "right-0 top-0",
                          "bottom-0 left-0",
                        ].map((position) => (
                          <span
                            key={position}
                            className={`pointer-events-none absolute ${position} h-[33.33%] w-[33.33%] rounded-[6px] border-[7px] bg-white/0`}
                            style={{ borderColor: foreground }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 text-center">
                      <p className="text-base font-black text-slate-950">
                        {title}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
                    </div>

                    {showUrl && (
                      <p
                        className="mt-4 break-all text-center font-mono text-[9px] text-slate-400"
                        dir="ltr"
                      >
                        {menuUrl}
                      </p>
                    )}
                  </div>
                </div>

                {/* Download row */}
                <div className="mx-auto mt-4 grid max-w-[520px] gap-2 sm:grid-cols-3">
                  <Button
                    onClick={downloadSvg}
                    variant="outline"
                    className="h-11 gap-2 rounded-xl border-slate-200 bg-white text-xs font-bold hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                  >
                    <Download className="h-4 w-4" />
                    تحميل SVG
                  </Button>

                  <Button
                    onClick={downloadPng}
                    variant="outline"
                    className="h-11 gap-2 rounded-xl border-slate-200 bg-white text-xs font-bold hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                  >
                    <Download className="h-4 w-4" />
                    تحميل PNG
                  </Button>

                  <Button
                    onClick={copyLink}
                    className="h-11 gap-2 rounded-xl bg-brand-500 text-xs font-bold text-white shadow-sm hover:bg-brand-600"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied ? "تم نسخ الرابط" : "نسخ الرابط"}
                  </Button>
                </div>

                <div className="mx-auto mt-3 flex max-w-[520px] items-center justify-center gap-2 text-[10px] text-slate-400">
                  <Sparkles className="h-3.5 w-3.5 text-brand-500" />
                  التصميم يحافظ على ألوان الهوية ويمكن تخصيصها من لوحة الألوان.
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
