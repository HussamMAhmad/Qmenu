import React from "react";
import Image from "next/image";
import { icon } from "@/public/assets";
import { Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });

  console.log(session);

  if (session?.user) redirect("/dashboard");
  return (
    <div className=" bg-slate-50">
      <div className="w-full bg-white flex justify-center lg:justify-end relative">
        <div className=" lg:fixed max-lg:hidden h-full z-30 top-0 right-0 w-[45%] bg-slate-900 text-white p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col justify-between items-start h-full">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-700/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center p-2">
                <Image
                  src={icon}
                  alt="ََQ-menu"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                كيومنيو
              </span>
            </div>

            <div className="relative z-10 my-auto py-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff5722]/15 border border-[#ff5722]/30 text-[#ff7043] text-xs font-bold mb-6">
                <Sparkles className="w-4 h-4 text-brand-400" />
                <span>انضم لأكثر من 500+ مطعم ومقهى</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-6">
                أدر منيو مطعمك وطلباتك بذكاء وسرعة فائقة
              </h1>

              <p className="text-slate-300 text-sm leading-relaxed font-medium mb-8">
                قم بإنشاء منيو رقمي تفاعلي بكود QR، واستقبل الطلبات المباشرة،
                وزد من متوسط فاتورة عملائك بدون عمولات هافية.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>تجربة مجانية لمدة 30 يوماً بدون بطاقة إلكترونية</span>
                </div>

                <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>تحديث أسعار وأصناف المنيو بضغطة زر واحدة</span>
                </div>
                {/* for the next feature which it containe an order from table */}
                {/* <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>دعم نظام طلب الطاولات والتوصيل المباشر</span>
              </div> */}
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-slate-800 flex items-center gap-3 text-xs text-slate-400 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                بيانات مطعمك وعملائك محمية بأعلى معايير التشفير والسرية.
              </span>
            </div>
          </div>
        </div>

        <div className="lg:w-[55%] sm:w-[70%] w-full flex flex-col justify-between p-6 sm:p-12 lg:p-16 bg-white overflow-y-auto">
          <div className="flex items-center justify-between lg:justify-end mb-8">
            <div className="flex lg:hidden items-center gap-2">
              <Image src={icon} alt="Q-menu" width={32} height={32} />
              <span className="text-xl font-black text-slate-900">كيومنيو</span>
            </div>
          </div>
          {children}
          <div className="mt-8 text-center text-xs text-slate-400 font-medium">
            © 2026 جميع الحقوق محفوظة لمنصة منيوك (Q-Menu)
          </div>
        </div>
      </div>
    </div>
  );
}

export default layout;
