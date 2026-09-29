import React from "react";
import { Rocket, ArrowLeft, ShieldCheck, Clock, Sparkles } from "lucide-react";

export default function FinalCall() {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-br from-brand-600 via-brand-500 to-amber-500 text-white relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold mb-6 shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>ابدأ في تطوير تجربة زبائنك وتكبير مبيعاتك</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight">
          جاهز لتحديث منيو مطعمك اليوم؟
        </h2>

        <p className="text-base sm:text-xl text-white/95 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
          احصل على تجربتك المجانية لمدة 30 يوماً وابدأ في إعداد المنيو الرقمي والتفاعلي الخاص بك في أقل من 5 دقائق.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-900/20 hover:bg-black hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-base sm:text-lg group"
          >
            <span>أنشئ حساب مطعمك مجاناً</span>
            <Rocket className="w-5 h-5 text-amber-400 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="#demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/25 backdrop-blur-md active:scale-95 transition-all duration-200 text-base sm:text-lg"
          >
            <span>مشاهدة منيو تجريبي</span>
            <ArrowLeft className="w-4 h-4 text-white/80" />
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-white/90 border-t border-white/15 pt-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>لا تتطلب بطاقة إلكترونية</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-200" />
            <span>إعداد سريع خلال 5 دقائق</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>تجربة كاملة مجانية</span>
          </div>
        </div>

      </div>
    </section>
  );
}