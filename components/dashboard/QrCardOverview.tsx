"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QrCode, CheckCircle2, Download, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { DEFAULT_QR_SETTING_COLOR } from "@/data/dashboard.constants";

function QrCardOverview({
  menuUrl,
  setting,
}: {
  menuUrl: string;
  setting?: QrSetting | null;
}) {
  const [copied, setCopied] = useState<boolean>(false);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(menuUrl);
    setCopied(true);
    toast.success("تم نسخ الرابط بنجاح");
    setTimeout(() => setCopied(false), 2000);
  };

  const data = {
    qrColor: "#0f172a",
    qrLogo: null,
    qrSubtitle: "امسح الكود لتصفح القائمة",
  };

  const dataSetting = setting ?? data;
  const color =
    dataSetting.qrColor ?? DEFAULT_QR_SETTING_COLOR[0]?.value ?? "#0f172a";
  const subtitle = dataSetting?.qrSubtitle;
  const logoImage = dataSetting?.qrLogo ?? "";
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
          ctx.fillText(subtitle, canvas.width / 2, 300);

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

  return (
    <Card className="overflow-hidden rounded-[28px] border-slate-200/70 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 px-5 py-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white">
            <QrCode className="h-4.5 w-4.5" />
          </span>
          <div>
            <CardTitle className="text-base font-black text-slate-950">
              رمز QR المباشر
            </CardTitle>
            <CardDescription className="mt-1 text-xs">
              رابط المنيو جاهز للمشاركة والطباعة
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-5">
        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-md flex flex-col items-center gap-3 text-center">
          <div ref={qrRef} className="flex items-center justify-center" />
          <div className="space-y-0.5 max-w-[200px]">
            <p className="text-xs font-bold text-slate-800 break-words">
              {subtitle}
            </p>
            <p className="text-[10px] text-slate-400">Scan to view menu</p>
          </div>
        </div>

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

          <div className="pt-2">
            <Button
              onClick={handleDownload}
              className="w-full h-11 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs gap-2 shadow-sm cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>تحميل صورة الباركود (PNG)</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 text-[11px] font-semibold text-emerald-700">
          <CheckCircle2 className="h-3.5 w-3.5" />
          رابط المنيو مفعّل ويعمل حالياً
        </div>
      </CardContent>
    </Card>
  );
}

export default QrCardOverview;
