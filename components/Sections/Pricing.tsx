"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, ShieldCheck, Sparkles, ArrowLeft, type LucideIcon } from "lucide-react";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { PLANS } from "@/data/constants";

function PricingContent() {
  const searchParams = useSearchParams();
  const isExpired = searchParams.get("expired") === "true";

  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");

  const handleProceedToCheckout = (planId: string, price: string) => {
    const encodedPrice = encodeURIComponent(price);
    router.push(`/subscription/checkout?plan=${planId}&price=${encodedPrice}`);
  };

  return (
    <section
      id="pricing"
      className="bg-white scroll-mt-24 px-4 sm:px-6 lg:px-12 py-16 sm:py-24"
      dir="rtl"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="خطط واضحة"
            title="اختر الخطة المناسبة"
            accent="لمطعمك"
            description="ابدأ بالخطة المناسبة لحجم عملك. جميع الباقات متكاملة لتلبي احتياجات مطعمك الرقمية."
          />
        </Reveal>

        {/* شريط التنبيه عند انتهاء الاشتراك أو شارة الضمان */}
        <Reveal delay={0.05}>
          <div className="mx-auto mb-10 sm:mb-14 flex justify-center">
            {isExpired ? (
              <div className="max-w-3xl w-full p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 text-xs sm:text-sm font-bold text-center shadow-xs">
                ⚠️ انتهت فترة اشتراك مطعمك، يرجى اختيار إحدى الباقات أدناه وإتمام الدفع لاستعادة تفعيل المنيو فوراً.
              </div>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-200/60 text-brand-600 text-xs sm:text-sm font-bold shadow-xs">
                <ShieldCheck className="w-4 h-4 text-brand-500" />
                <span>14 يوم تجربة مجانية (حتى 15 وجبة)</span>
              </span>
            )}
          </div>
        </Reveal>

        {/* شبكة الباقات المتجاوبة بمرونة عالية للتابلت (md:grid-cols-2 lg:grid-cols-3) */}
        <div className="mx-auto grid max-w-6xl gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {PLANS.map((plan, index) => {
            const isSelected = selectedPlan === plan.id;
            const IconComponent = plan.icon as LucideIcon;

            return (
              <Reveal key={plan.id} delay={index * 0.08} className="h-full">
                <div
                  onClick={() => !plan.comingSoon && setSelectedPlan(plan.id)}
                  className={`relative flex h-full flex-col justify-between overflow-hidden rounded-[1.8rem] bg-white p-5 sm:p-7 lg:p-8 transition-all duration-300 ${
                    plan.comingSoon
                      ? "border border-slate-200/80 bg-white/80 opacity-80 cursor-not-allowed shadow-sm"
                      : plan.popular
                        ? "border-2 border-brand-500 shadow-xl shadow-brand-900/[0.08] lg:-translate-y-3 hover:-translate-y-4 cursor-pointer"
                        : isSelected
                          ? "border border-brand-500 ring-2 ring-brand-500/20 shadow-md hover:-translate-y-1 cursor-pointer"
                          : "border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 cursor-pointer"
                  }`}
                >
                  {/* الشريط العلوي للباقة الأكثر شعبية */}
                  {plan.popular && (
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-brand-700 via-brand-500 to-brand-400" />
                  )}

                  {/* شارات الحالة */}
                  {plan.popular && (
                    <div className="absolute left-4 top-4 sm:left-5 sm:top-5 rounded-full bg-brand-50 px-3 py-1.5 text-[10px] font-black text-brand-700 shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                      <span>الخيار الأكثر طلباً 🔥</span>
                    </div>
                  )}

                  {plan.comingSoon && (
                    <div className="absolute left-4 top-4 sm:left-5 sm:top-5 rounded-full bg-slate-800 text-slate-200 border border-slate-700 font-bold px-3 py-1 text-[10px] shadow-xs">
                      قريباً 🚀
                    </div>
                  )}

                  <div>
                    {/* أيقونة الباقة */}
                    <div
                      className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl ${
                        plan.popular
                          ? "bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-600/20"
                          : "bg-brand-50 text-brand-600"
                      }`}
                    >
                      {IconComponent && <IconComponent size={22} />}
                    </div>

                    {/* اسم الباقة والوصف */}
                    <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl font-black text-slate-950">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-6 sm:leading-7 text-slate-500 min-h-[38px] sm:min-h-[42px]">
                      {plan.description}
                    </p>

                    {/* سعر الباقة */}
                    <div className="my-5 sm:my-6 flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950">
                        {plan.price}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-500">
                        / {plan.period}
                      </span>
                    </div>

                    {/* قائمة الميزات */}
                    <div className="mb-6 sm:mb-7 space-y-3 border-t border-slate-100 pt-5 sm:pt-6">
                      {plan.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700"
                        >
                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                              plan.popular
                                ? "bg-brand-100 text-brand-600"
                                : "bg-emerald-50 text-emerald-600"
                            }`}
                          >
                            <Check size={13} />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* زر المتابعة */}
                  <button
                    type="button"
                    disabled={plan.comingSoon}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProceedToCheckout(plan.id, plan.price);
                    }}
                    className={`mt-auto inline-flex min-h-11 sm:min-h-12 w-full items-center justify-center gap-2 rounded-xl font-bold text-xs sm:text-sm transition duration-200 cursor-pointer ${
                      plan.comingSoon
                        ? "bg-slate-100 text-slate-400 border border-slate-200/80 cursor-not-allowed"
                        : plan.popular
                          ? "bg-gradient-to-l from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-600/20 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]"
                          : "border border-brand-200 bg-brand-50/50 text-brand-700 hover:bg-brand-100 active:scale-[0.98]"
                    }`}
                  >
                    <span>
                      {plan.comingSoon ? "يتوفر قريباً" : "متابعة عملية الدفع"}
                    </span>
                    {!plan.comingSoon && <ArrowLeft size={16} />}
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mx-auto mt-8 sm:mt-12 max-w-xl text-center text-xs leading-6 text-slate-500">
          تعتمد معالجة الاشتراكات وتأكيد التفعيل على وسيلة الدفع المحددة عند إتمام العملية.
        </p>
      </div>
    </section>
  );
}

export default function Pricing() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-sm text-slate-500 font-bold">
          جاري تحميل الباقات...
        </div>
      }
    >
      <PricingContent />
    </Suspense>
  );
}