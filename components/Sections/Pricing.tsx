"use client";

import React, { useState } from "react";
import { Check, X, Sparkles, Zap, Building2 } from "lucide-react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section
      id="pricing"
      className="py-24 bg-slate-100 relative overflow-hidden"
    >
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/60 text-brand-600 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>خطط أسعار مرنة ومنافسة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            باقات تناسب حجم مطعمك وطموحك
          </h2>
          <p className="text-slate-600 font-medium text-base mb-8 leading-relaxed">
            اختر الباقة الأنسب واستمتع بفترة تجريبية مجانية لمدة 14 يوماً
            للباقتين المتقدمتين دون الحاجة لبطاقة إلكترونية.
          </p>

          <div className="inline-flex items-center bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200/80">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                !isAnnual
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              الدفع الشهري
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                isAnnual
                  ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>الدفع السنوي</span>
              <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-md">
                وفر 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-slate-900">الأساسية</h3>
                <span className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                  <Zap className="w-5 h-5" />
                </span>
              </div>
              <p className="text-slate-500 text-xs font-medium mb-6 min-h-[32px]">
                مثالية للمقاهي والمطاعم الناشئة للبدء فوراً.
              </p>

              <div className="mb-6 pb-6 border-b border-slate-100">
                <span className="text-4xl font-black text-slate-900">
                  مجاناً
                </span>
                <span className="text-slate-400 text-xs font-medium mr-1">
                  / للأبد
                </span>
              </div>

              <ul className="space-y-3.5 mb-8">
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>حتى 50 صنف في المنيو</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>رمز QR واحد عام للمطعم</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>تصميم المنيو القياسي السريع</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-medium text-slate-400 line-through opacity-75">
                  <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span>دعم العملات المتعددة</span>
                </li>
              </ul>
            </div>

            <button className="w-full py-3.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] transition-all text-sm border border-slate-200/50">
              ابدأ مجاناً
            </button>
          </div>

          <div className="bg-white rounded-3xl p-8 border-2 border-brand-500 shadow-xl shadow-brand-500/10 flex flex-col justify-between relative transform md:-translate-y-3 hover:-translate-y-4 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-500 to-amber-500 text-white px-4 py-1 rounded-full text-xs font-black shadow-md shadow-brand-500/20 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>الخيار الأكثر طلباً</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 pt-2">
                <h3 className="text-xl font-black text-slate-900">
                  الاحترافية
                </h3>
                <span className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                  <Sparkles className="w-5 h-5" />
                </span>
              </div>
              <p className="text-slate-500 text-xs font-medium mb-6 min-h-[32px]">
                الحل الأنسب للمطاعم النشطة الراغبة بتجربة طلب متكاملة.
              </p>

              <div className="mb-6 pb-6 border-b border-slate-100 flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">
                  ${isAnnual ? "12" : "15"}
                </span>
                <span className="text-slate-500 text-xs font-semibold">
                  / شهرياً {isAnnual ? "(تُدفع سنوياً)" : ""}
                </span>
              </div>

              <ul className="space-y-3.5 mb-8">
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>أصناف وأقسام غير محدودة</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>دعم كامل لعملتين (ل.س / $)</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>أكواد QR مخصصة لكل طاولة</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>الطلب المباشر وإرسال للمطبخ</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>لوحة إحصائيات وتقارير المبيعات</span>
                </li>
              </ul>
            </div>

            <button className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 shadow-md shadow-brand-500/25 active:scale-[0.98] transition-all text-sm">
              ابدأ تجربة 14 يوماً مجاناً
            </button>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-slate-900">الأعمال</h3>
                <span className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                  <Building2 className="w-5 h-5" />
                </span>
              </div>
              <p className="text-slate-500 text-xs font-medium mb-6 min-h-[32px]">
                مصممة خصيصاً لسلاسل المطاعم والمجموعات الكبرى.
              </p>

              <div className="mb-6 pb-6 border-b border-slate-100">
                <span className="text-4xl font-black text-slate-900">مخصص</span>
              </div>

              <ul className="space-y-3.5 mb-8">
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>كافة مميزات الباقة الاحترافية</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>إدارة فروع متعددة من حساب واحد</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>دومين مخصص (اسم مطعمك الخاص)</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>ربط متقدم مع أنظمة الكاشير (POS)</span>
                </li>
              </ul>
            </div>

            <button className="w-full py-3.5 rounded-xl font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] transition-all text-sm border border-slate-200/60">
              تواصل مع المبيعات
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
