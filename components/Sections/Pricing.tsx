
import Link from "next/link";
import { Check, Sparkles, Zap, Crown, ShieldCheck } from "lucide-react";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-24 bg-slate-100 relative overflow-hidden font-[family-name:var(--font-cairo)]"
    >
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/60 text-brand-600 text-xs font-bold mb-4">
            <ShieldCheck className="w-4 h-4 text-brand-500" />
            <span>تجربة مجانية لمدة 14 يوماً بدون بطاقة إلكترونية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            خطط أسعار مرنة ومناسبة لنمو مطعمك
          </h2>
          <p className="text-slate-600 font-medium text-base leading-relaxed">
            استمتع بفترة تجريبية مجانية تتضمن حتى 15 وجبة، واختر الباقة الأنسب لبدء تحولك الرقمي.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* 1. الباقة الأساسية */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-slate-900">الباقة الأساسية</h3>
                <span className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500">
                  <Zap className="w-5 h-5" />
                </span>
              </div>
              <p className="text-slate-500 text-xs font-medium mb-6 min-h-[32px]">
                مثالية للمقاهي والمطاعم الناشئة لبدء حضورهم الرقمي.
              </p>

              <div className="mb-6 pb-6 border-b border-slate-100 flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">$6</span>
                <span className="text-slate-500 text-xs font-semibold">/ شهرياً</span>
              </div>

              <ul className="space-y-3.5 mb-8">
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>إضافة حتى 40 وجبة في المنيو</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>رمز QR Code خاص ودائم للمطعم</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>تحديث الأسعار والأطباق فوراً</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>دعم فني عبر البريد الإلكتروني</span>
                </li>
              </ul>
            </div>

            <Link
              href="/register?plan=starter"
              className="w-full py-3.5 rounded-xl font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] transition-all text-sm border border-slate-200/60 text-center block"
            >
              جرب مجاناً لمدة 14 يوماً
            </Link>
          </div>

          {/* 2. الباقة الاحترافية (الأكثر طلباً) */}
          <div className="bg-white rounded-3xl p-8 border-2 border-brand-500 shadow-xl shadow-brand-500/10 flex flex-col justify-between relative transform md:-translate-y-3 hover:-translate-y-4 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-500 text-white px-4 py-1 rounded-full text-xs font-black shadow-md shadow-brand-500/20 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>الخيار الأكثر طلباً 🔥</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 pt-2">
                <h3 className="text-xl font-black text-slate-900">
                  الباقة الاحترافية
                </h3>
                <span className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500">
                  <Sparkles className="w-5 h-5" />
                </span>
              </div>
              <p className="text-slate-500 text-xs font-medium mb-6 min-h-[32px]">
                تمنحك إمكانيات كاملة وتضمن وصولك للميزات المتقدمة فور صدورها.
              </p>

              <div className="mb-6 pb-6 border-b border-slate-100 flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">$12</span>
                <span className="text-slate-500 text-xs font-semibold">/ شهرياً</span>
              </div>

              <ul className="space-y-3.5 mb-8">
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>عدد غير محدود من الوجبات (Unlimited)</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>وصول مجاني لميزة الثيمات فور إطلاقها</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>وصول مجاني لنظام الطلبات فور إطلاقه</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>أولوية الدعم الفني المباشر</span>
                </li>
              </ul>
            </div>

            <Link
              href="/register?plan=pro"
              className="w-full py-3.5 rounded-xl font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-md shadow-brand-500/25 active:scale-[0.98] transition-all text-sm text-center block"
            >
              ابدأ تجربة 14 يوماً مجاناً
            </Link>
          </div>

          {/* 3. باقة الشركات والفروع (قريباً) */}
          <div className="bg-white/80 rounded-3xl p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between relative opacity-85 hover:opacity-100 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-200 border border-slate-700 font-bold px-4 py-1 rounded-full text-xs shadow-md">
              قريباً 🚀
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-slate-900">باقة الشركات</h3>
                <span className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                  <Crown className="w-5 h-5" />
                </span>
              </div>
              <p className="text-slate-500 text-xs font-medium mb-6 min-h-[32px]">
                مخصصة للمطاعم الكبرى التي تخطط لإدارة عدة فروع.
              </p>

              <div className="mb-6 pb-6 border-b border-slate-100 flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">$20</span>
                <span className="text-slate-500 text-xs font-semibold">/ شهرياً</span>
              </div>

              <ul className="space-y-3.5 mb-8">
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>كل ميزات الباقة الاحترافية</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>حجز مسبق لميزة إدارة الفروع المباشرة</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>لوحة تحكم خاصة لكل مدير فرع</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>دعم فني مخصص على مدار الساعة</span>
                </li>
              </ul>
            </div>

            <button
              disabled
              className="w-full py-3.5 rounded-xl font-bold text-slate-400 bg-slate-100 cursor-not-allowed border border-slate-200/80 text-sm text-center"
            >
              يتوفر قريباً
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}