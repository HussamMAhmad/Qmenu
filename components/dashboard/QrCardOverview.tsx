"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QrCode, CheckCircle2, Download, Copy } from "lucide-react";
import { useState } from "react";

function QrCardOverview() {
  const [copied, setCopied] = useState<boolean>(false);
  const restaurantSlug = "al-sultan";
  const menuUrl = `https://yourdomain.com/m/${restaurantSlug}`;
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
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
        <div className="rounded-3xl bg-slate-50 p-5 text-center">
          <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-2xl border border-slate-200 bg-white text-brand-700 shadow-sm">
            <QrCode className="h-32 w-32" strokeWidth={1.35} />
          </div>

          <div
            className="mt-4 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left"
            dir="ltr"
          >
            <p className="truncate font-mono text-[10px] text-slate-500">
              {menuUrl}
            </p>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="h-11 gap-2 rounded-xl border-slate-200 font-bold hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
          >
            {copied ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "تم نسخ الرابط" : "نسخ رابط المنيو"}
          </Button>

          <Button className="h-11 gap-2 rounded-xl bg-brand-500 font-bold text-white shadow-sm hover:bg-brand-600">
            <Download className="h-4 w-4" />
            تحميل QR للطباعة
          </Button>
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
