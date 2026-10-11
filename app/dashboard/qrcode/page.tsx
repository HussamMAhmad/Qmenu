"use client";

import { useState, useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Download,
  QrCode,
  Copy,
  Check,
  ExternalLink,
  Eye,
  Palette,
  Image as ImageIcon,
  Type,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function QrCodePage() {
  const [copied, setCopied] = useState(false);
  const [qrColor, setQrColor] = useState("#0f172a"); // اللون الافتراضي (Slate 900)
  const [logoImage, setLogoImage] = useState<string>(""); // رابط الشعار أو الـ Base64
  const [subtitle, setSubtitle] = useState("امسح الكود لتصفح القائمة"); // الوصف تحت الباركود

  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<QRCodeStyling | null>(null);

  // رابط المنيو العام للمطعم
  const menuUrl = `localhost:3000/dashboard/qrcode`;

  // تهيئة مثيل الـ QR Code لمرة واحدة
  useEffect(() => {
    if (typeof window !== "undefined") {
      qrCodeInstance.current = new QRCodeStyling({
        width: 220,
        height: 220,
        type: "svg",
        data: menuUrl,
        dotsOptions: {
          color: qrColor,
          type: "rounded",
        },
        backgroundOptions: {
          color: "#ffffff",
        },
        cornersSquareOptions: {
          type: "extra-rounded",
          color: qrColor,
        },
        cornersDotOptions: {
          type: "dot",
          color: qrColor,
        },
        image: logoImage || undefined,
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.35,
          margin: 6,
        },
      });

      if (qrRef.current) {
        qrRef.current.innerHTML = "";
        qrCodeInstance.current.append(qrRef.current);
      }
    }
  }, []);

  // تحديث الخصائص (الرابط، اللون، الشعار) عند تغيرها
  useEffect(() => {
    if (qrCodeInstance.current) {
      qrCodeInstance.current.update({
        data: menuUrl,
        dotsOptions: { color: qrColor, type: "rounded" },
        cornersSquareOptions: { color: qrColor, type: "extra-rounded" },
        cornersDotOptions: { color: qrColor, type: "dot" },
        image: logoImage || undefined,
      });
    }
  }, [menuUrl, qrColor, logoImage]);

  // دالة رفع الشعار وتحويله إلى Base64 لعرضه فوراً
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImage(reader.result as string);
        toast.success("تم رفع الشعار بنجاح");
      };
      reader.readAsDataURL(file);
    }
  };

  // دالة التحميل المباشر للباركود
const handleDownload = async () => {
    if (!qrCodeInstance.current) return;

    try {
      // 1. الحصول على الـ QR كـ Blob أو DataUrl من المكتبة
      const qrBlob = await qrCodeInstance.current.getRawData("png");
      if (!qrBlob) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const qrImageUrl = event.target?.result as string;
        
        // 2. إنشاء عنصر Canvas وهمي في الذاكرة لدمج الصور والنصوص
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // تحديد أبعاد الصورة النهائية (مثلاً عرض 400 × ارتفاع 500 بكسل بجودة عالية)
        canvas.width = 400;
        canvas.height = 400;

        // خلفية بيضاء نقية
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // تحميل صورة الـ QR ورسمها في المنتصف
        const qrImage = new Image();
        qrImage.src = qrImageUrl;
        qrImage.onload = () => {
          // رسم الـ QR في الأعلى (الإحداثيات: X=90, Y=40, الحجم 220×220)
          ctx.drawImage(qrImage, 90, 40, 220, 220);

          // إعداد خط النصوص (نفس تصميم التطبيق)
          ctx.textAlign = "center";
          
          // رسم الوصف الأول (مثلاً: امسح الكود لتصفح القائمة)
          ctx.fillStyle = "#0f172a";
          ctx.font = "bold 16px sans-serif";
          ctx.fillText(subtitle || "امسح الكود لتصفح القائمة", canvas.width / 2, 300);

          // رسم النص الإنجليزي تحتها
          ctx.fillStyle = "#94a3b8";
          ctx.font = "12px sans-serif";
          ctx.fillText("Scan to view menu", canvas.width / 2, 325);

          // 3. تحويل الـ Canvas إلى رابط تحميل وتنزيله تلقائياً
          const pngUrl = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.href = pngUrl;
          downloadLink.download = "qmenu-general-qr.png";
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);

          toast.success("تم تحميل الباركود مع الوصف بنجاح");
        };
      };
      reader.readAsDataURL(qrBlob as Blob);
    } catch (error) {
      toast.error("حدث خطأ أثناء تحميل الباركود");
    }
  };
  // دالة نسخ الرابط
  const handleCopyLink = () => {
    navigator.clipboard.writeText(menuUrl);
    setCopied(true);
    toast.success("تم نسخ الرابط بنجاح");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main
      dir="rtl"
      className="font-cairo min-h-screen bg-slate-50/60 px-2 py-4 text-slate-800 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1380px] space-y-8">
        {/* Header Section */}
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
              قم بتخصيص ألوان الشعار، ووصف الباركود، ثم حمله جاهزاً للطباعة.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link href={menuUrl} target="_blank" rel="noreferrer">
              <Button
                variant="outline"
                className="h-11 w-full gap-2 rounded-xl border-slate-200 bg-white font-bold hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 sm:w-auto cursor-pointer"
              >
                <Eye className="h-4 w-4" />
                معاينة المنيو
                <ExternalLink className="h-3.5 w-3.5 opacity-60" />
              </Button>
            </Link>
          </div>
        </header>
        {/* Workspace Grid */}
        <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
          {/* قسم التحكم والإعدادات */}
          <Card className="rounded-2xl border border-slate-200/80 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Palette className="h-4 w-4 text-brand-600" />
                <span>تخصيص تصميم الباركود</span>
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                عدل الألوان والشعار والنص الظاهر تحت الباركود.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* تعديل اللون */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Palette className="h-3.5 w-3.5 text-slate-500" />
                  <span>لون الرمز</span>
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded-xl border border-slate-200 bg-white p-1"
                  />
                  <Input
                    type="text"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="h-10 rounded-xl text-xs border-slate-200 dir-ltr text-left font-mono"
                  />
                </div>
              </div>
              {/* رفع الأيقونة / الشعار */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="h-3.5 w-3.5 text-slate-500" />
                    <span>شعار المطعم في المنتصف (اختياري)</span>
                  </span>
                  {logoImage && (
                    <button
                      type="button"
                      onClick={() => {
                        setLogoImage("");
                        toast.success("تم إزالة الشعار بنجاح");
                      }}
                      className="text-[11px] text-rose-600 hover:text-rose-700 font-semibold cursor-pointer underline"
                    >
                      إزالة الشعار
                    </button>
                  )}
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="h-10 rounded-xl text-xs border-slate-200 file:ml-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-3 file:text-xs file:font-semibold file:text-brand-700 hover:file:bg-brand-100 cursor-pointer"
                  />
                </div>
              </div>
              {/* تعديل الوصف تحت الباركود */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Type className="h-3.5 w-3.5 text-slate-500" />
                  <span>الوصف الترويجي تحت الرمز</span>
                </Label>
                <Input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="مثال: امسح الكود لتصفح القائمة"
                  className="h-10 rounded-xl text-xs border-slate-200"
                />
              </div>
              {/* رابط المنيو المباشر */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <Label className="text-xs font-bold text-slate-700">
                  رابط المنيو المباشر
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    readOnly
                    value={menuUrl}
                    className="h-10 rounded-xl text-xs bg-slate-50 text-slate-500 border-slate-200 dir-ltr text-left"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyLink}
                    className="h-10 w-10 shrink-0 rounded-xl border-slate-200 hover:bg-slate-50 cursor-pointer"
                    title="نسخ الرابط"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-slate-600" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="pt-2">
                <Button
                  onClick={handleDownload}
                  className="w-full h-11 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs gap-2 shadow-sm cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>تحميل صورة الباركود (PNG)</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* قسم المعاينة الحية للـ QR */}
          <Card className="rounded-2xl border border-slate-200/80 shadow-sm bg-white flex flex-col items-center justify-center p-6">
            <div className="text-center mb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                معاينة الباركود المباشرة
              </span>
            </div>
            {/* حاوية الـ QR مع الوصف */}
            <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-md flex flex-col items-center gap-3 text-center">
              <div ref={qrRef} className="flex items-center justify-center" />
              <div className="space-y-0.5 max-w-[200px]">
                <p className="text-xs font-bold text-slate-800 break-words">
                  {subtitle || "امسح الكود لتصفح القائمة"}
                </p>
                <p className="text-[10px] text-slate-400">Scan to view menu</p>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href={menuUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-600 transition-colors"
              >
                <span>معاينة صفحة المنيو مباشرة</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
