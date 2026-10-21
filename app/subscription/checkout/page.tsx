"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Copy, Check, Wallet, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import ShamForm from "@/components/forms/ShamForm";
import { Suspense } from 'react';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const planName = searchParams.get("plan") || "pro";
  const planPrice = searchParams.get("price") || "12";

  const [copied, setCopied] = useState(false);

  // عنوان حساب شام كاش الخاص بك (يستقبل USD)
  const merchantShamAddress = "a8f3e2b1c9d04f5678901234abcdef01";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("تم نسخ عنوان الحساب بنجاح");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6" dir="rtl">
      <div className="max-w-xl mx-auto space-y-6">
        <button
          onClick={() => router.back()}
          className="cursor-pointer flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للخطط</span>
        </button>

        <div className="bg-brand-100 border border-white/50 p-6 rounded-[30px] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500">
              الاشتراك المختار
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 mt-0.5 uppercase">
              {planName}
            </h2>
          </div>
          <div className="text-left">
            <span className="text-xs font-medium text-slate-500">
              المبلغ الإجمالي
            </span>
            <div className="text-lg font-black text-brand-600">
              {planPrice}{" "}
              <span className="text-xs text-slate-600 font-medium">USD</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[30px] shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-brand-100 text-brand-600">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">
                الدفع الإلكتروني عبر شام كاش (USD)
              </h3>
              <p className="text-xs text-slate-500 mt-2">
                قم بالتحويل بالدولار الأمريكي حصراً لإتمام التفعيل
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 space-y-3">
            <div className="text-xs font-bold text-slate-700">
              عنوان حساب شام كاش المخصص للاستلام:
            </div>

            <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
              <span className="font-mono font-bold text-xs sm:text-sm text-slate-900 tracking-wider">
                {merchantShamAddress}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(merchantShamAddress)}
                className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500 text-white text-xs font-bold hover:bg-brand-600 active:scale-95 transition-all"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copied ? "تم النسخ" : "نسخ"}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              💡 بعد إتمام التحويل، أدخل{" "}
              <span className="font-bold text-slate-700">
                رقم العملية (Transaction ID)
              </span>{" "}
              أدناه ليتولى النظام التحقق الفوري وتفعيل حسابك.
            </p>
          </div>
          <ShamForm planId={planName} />
        </div>
      </div>
    </div>
    </Suspense>
  );
}
