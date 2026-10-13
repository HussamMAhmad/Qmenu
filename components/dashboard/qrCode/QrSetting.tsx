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
  Copy,
  Check,
  ExternalLink,
  Palette,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { DEFAULT_QR_SETTING_COLOR } from "@/data/dashboard.constants";
import SettingQrForm from "./SettingQrForm";

function QrSetting({
  menuUrl,
  setting,
}: {
  menuUrl: string;
  setting: QrSetting;
}) {
  const qrColor =
    setting?.qrColor ?? DEFAULT_QR_SETTING_COLOR[0]?.value ?? "#0f172a";
  const qrSubtitle = setting?.qrSubtitle ?? "امسح الكود لتصفح القائمة";
  const qrLogo = setting?.qrLogo ?? "";

  const [copied, setCopied] = useState(false);
  const [color, setQrColor] = useState(qrColor);
  const [logoImage, setLogoImage] = useState<string>(qrLogo);
  const [subtitle, setSubtitle] = useState(qrSubtitle);

  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      qrCodeInstance.current = new QRCodeStyling({
        width: 220,
        height: 220,
        type: "svg",
        data: menuUrl,
        dotsOptions: {
          color: color,
          type: "rounded",
        },
        backgroundOptions: {
          color: "#ffffff",
        },
        cornersSquareOptions: {
          type: "extra-rounded",
          color,
        },
        cornersDotOptions: {
          type: "dot",
          color,
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

  useEffect(() => {
    if (qrCodeInstance.current) {
      qrCodeInstance.current.update({
        data: menuUrl,
        dotsOptions: { color, type: "rounded" },
        cornersSquareOptions: { color, type: "extra-rounded" },
        cornersDotOptions: { color, type: "dot" },
        image: logoImage || undefined,
      });
    }
  }, [menuUrl, color, logoImage]);

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

  const handleDownload = async () => {
    if (!qrCodeInstance.current) return;

    try {
      const qrBlob = await qrCodeInstance.current.getRawData("png");
      if (!qrBlob) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const qrImageUrl = event.target?.result as string;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = 400;
        canvas.height = 400;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const qrImage = new Image();
        qrImage.src = qrImageUrl;
        qrImage.onload = () => {
          ctx.drawImage(qrImage, 90, 40, 220, 220);

          ctx.textAlign = "center";

          ctx.fillStyle = "#0f172a";
          ctx.font = "bold 16px sans-serif";
          ctx.fillText(
            subtitle || "امسح الكود لتصفح القائمة",
            canvas.width / 2,
            300,
          );

          ctx.fillStyle = "#94a3b8";
          ctx.font = "12px sans-serif";
          ctx.fillText("Scan to view menu", canvas.width / 2, 325);

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(menuUrl);
    setCopied(true);
    toast.success("تم نسخ الرابط بنجاح");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
      <Card className="rounded-2xl border border-slate-200/80 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Palette className="h-4 w-4 text-brand-600" />
            <span>تخصيص تصميم الباركود</span>
          </CardTitle>
          <CardDescription className="text-xs text-slate-400 mt-2">
            عدل الألوان والشعار والنص الظاهر تحت الباركود.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SettingQrForm
            setting={setting}
            setColor={setQrColor}
            setSubtitle={setSubtitle}
            setLogo={setLogoImage}
          />
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

      <Card className="rounded-2xl border border-slate-200/80 shadow-sm bg-white flex flex-col items-center justify-center p-6">
        <div className="text-center mb-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            معاينة الباركود المباشرة
          </span>
        </div>

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
    </section>
  );
}

export default QrSetting;
