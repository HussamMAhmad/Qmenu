import Image from "next/image";
import { 
  Sparkles, 
  ShieldCheck, 
  Banknote, 
  QrCode, 
  Zap 
} from "lucide-react";
import icon from "@/public/assets/icon.png";

export default function OnboardingHeroPanel() {
  return (
    <div className="lg:fixed max-lg:hidden h-full z-30 top-0 right-0 w-[45%] bg-slate-900 text-white p-12 relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-700/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="relative z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center p-2 shadow-inner">
          <Image
            src={icon}
            alt="Q-menu"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <span className="text-2xl font-black text-white tracking-tight">
          كيومنيو
        </span>
      </div>

      <div className="relative z-10 my-auto py-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-bold mb-6 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span>الخطوة الأخيرة لإطلاق منيو مطعمك</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black leading-normal mb-5 tracking-tight">
          ضع بيانات مطعمك الأساسية وابدأ باستقبال الزبائن
        </h1>

        <p className="text-slate-300 text-sm leading-relaxed font-medium mb-8">
          من خلال هذه المعلومات، سنقوم بإعداد صفحة المنيو الرقمي وتوليد رمز الـ QR الخاص بك فوراً، مع إمكانية ربط الطلبات عبر الواتساب.
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
            <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Banknote className="w-4 h-4" />
            </div>
            <span>ربط وتعديل أسعار أصناف المنيو بسعر الصرف بنقرة واحدة</span>
          </div>

          <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
            <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <QrCode className="w-4 h-4" />
            </div>
            <span>توليد كود QR جاهز للطباعة والمشاركة على الطاولات</span>
          </div>

          <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
            <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <span>تحديث بيانات المنيو وإعادة الترتيب فوراً دون إعادة الطباعة</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-6 border-t border-slate-800/80 flex items-center gap-3 text-xs text-slate-400 font-medium">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <span>
          بيانات مطعمك وسعر الصرف والطلبات محمية بأعلى معايير السرية والتشفير.
        </span>
      </div>
    </div>
  );
}