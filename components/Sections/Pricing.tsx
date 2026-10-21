"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, ShieldCheck, Sparkles, ArrowLeft } from "lucide-react";
import { PLANS } from "@/data/constants";

function SubscriptionContent() {
  const searchParams = useSearchParams();
  const isExpired = searchParams.get("expired") === "true";

  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");

  const handleProceedToCheckout = (planId: string, price: string) => {
    const encodedPrice = encodeURIComponent(price);
    router.push(`/subscription/checkout?plan=${planId}&price=${encodedPrice}`);
  };

  return (
    <div
      className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      dir="rtl"
    >
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        {isExpired ? (
          <div className="max-w-4xl mx-auto mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs sm:text-sm font-bold text-center">
            ⚠️ انتهت فترة اشتراك مطعمك، يرجى اختيار إحدى الباقات أدناه وإتمام
            الدفع عبر شام كاش لاستعادة تفعيل المنيو فوراً.
          </div>
        ) : (
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/60 text-brand-600 text-xs font-bold mb-4 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-brand-500" />
            <span>14 يوم تجربة مجانية (حتى 15 وجبة)</span>
          </span>
        )}
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          اختر الباقة المناسبة لنمو مطعمك
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          جميع الباقات تتضمن فترة تجريبية مجانية. ابدأ اليوم واجعل منيو مطعمك
          متاحاً لكل زبون بأسلوب عالي الاحترافية.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch relative z-10">
        {PLANS.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          const IconComponent = plan.icon;

          return (
            <div
              key={plan.id}
              onClick={() => !plan.comingSoon && setSelectedPlan(plan.id)}
              className={`relative rounded-3xl bg-white border flex flex-col justify-between p-8 transition-all duration-300 ${
                plan.comingSoon
                  ? "border-slate-200/80 bg-white/80 opacity-80 cursor-not-allowed"
                  : plan.popular
                    ? "border-2 border-brand-500 shadow-xl shadow-brand-500/10 md:-translate-y-3 hover:-translate-y-4 cursor-pointer"
                    : isSelected
                      ? "border-brand-500 ring-2 ring-brand-500/20 shadow-md hover:-translate-y-1 cursor-pointer"
                      : "border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 cursor-pointer"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-500 text-white font-black px-4 py-1 rounded-full text-xs shadow-md shadow-brand-500/20 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>الخيار الأكثر طلباً 🔥</span>
                </div>
              )}

              {plan.comingSoon && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-200 border border-slate-700 font-bold px-4 py-1 rounded-full text-xs shadow-md">
                  قريباً 🚀
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4 pt-2">
                  <h3 className="text-xl font-black text-slate-900">
                    {plan.name}
                  </h3>
                  <span className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500">
                    <IconComponent className="w-5 h-5" />
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 font-medium mb-6 min-h-[40px] leading-relaxed">
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-100">
                  <span className="text-4xl font-black text-slate-900 tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    / {plan.period}
                  </span>
                </div>

                <div className="space-y-3.5 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-semibold"
                    >
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                disabled={plan.comingSoon}
                onClick={(e) => {
                  e.stopPropagation();
                  handleProceedToCheckout(plan.id, plan.price);
                }}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 block text-center cursor-pointer ${
                  plan.comingSoon
                    ? "bg-slate-100 text-slate-400 border border-slate-200/80 cursor-not-allowed"
                    : plan.popular
                      ? "bg-brand-500 hover:bg-brand-600 text-white shadow-md shadow-brand-500/25 active:scale-[0.98]"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/60 active:scale-[0.98]"
                }`}
              >
                <span>
                  {plan.comingSoon ? "يتوفر قريباً" : "متابعة عملية الدفع"}
                </span>
                {!plan.comingSoon && <ArrowLeft className="w-4 h-4" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SubscriptionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">جاري تحميل الباقات...</div>}>
      <SubscriptionContent />
    </Suspense>
  );
}