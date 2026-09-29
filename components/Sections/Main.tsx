import React from "react";
import { IoQrCode, IoCheckmarkCircle } from "react-icons/io5";
import { FaLongArrowAltLeft, FaPlayCircle } from "react-icons/fa";

function Main() {
  return (
    <section
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden"
      id="home"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 -left-4 w-72 h-72 sm:w-96 sm:h-96 bg-brand-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20  animate-blob transform-gpu" />
        <div className="absolute top-0 -right-4 w-72 h-72 sm:w-96 sm:h-96 bg-brand-500 rounded-full mix-blend-multiply  filter blur-3xl opacity-20  animate-blob animation-delay-2000 transform-gpu" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 sm:w-96 sm:h-96 bg-brand-600 rounded-full mix-blend-multiply  filter blur-3xl opacity-20  animate-blob animation-delay-4000 transform-gpu" />
        <div className="absolute inset-0 hero-pattern opacity-40" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="text-center lg:text-right z-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-50  text-brand-700 text-sm font-bold mb-6 border border-brand-100 select-none shadow-sm shadow-brand-500/5">
              <span
                className="relative flex h-2.5 w-2.5 shrink-0"
                aria-hidden="true"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500" />
              </span>

              <span>منصة إدارة قوائم المطاعم الرقمية الأحدث</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900  leading-[1.2] sm:leading-[1.18] lg:leading-[1.15] tracking-tight mb-6">
              حوّل منيو مطعمك إلى <br className="hidden sm:block" />
              <span className="inline-block pb-2 bg-gradient-to-l from-brand-700 via-brand-500 to-brand-400 bg-clip-text text-transparent drop-shadow-sm">
                تجربة تفاعلية ذكية
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-600  mb-8 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              أنشئ قائمة طعام رقمية (QR Menu) احترافية في دقائق، استقبل الطلبات
              مباشرة من الطاولات، وأدر مطعمك بكفاءة عالية وبدون أي عمولات على
              المبيعات.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button
                type="button"
                className="group w-full cursor-pointer sm:w-auto px-8 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50"
              >
                <span>أنشئ منيو مطعمك الآن</span>
                <FaLongArrowAltLeft className="text-lg transition-transform duration-200 group-hover:-translate-x-1" />
              </button>

              <button
                type="button"
                className="group w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-slate-700  bg-white  border border-slate-200  hover:bg-brand-50/50 dark:hover:bg-slate-700/80 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-soft select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50"
              >
                <FaPlayCircle className="text-lg text-brand-500 transition-transform duration-200 group-hover:scale-110" />
                <span>شاهد كيف يعمل</span>
              </button>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-200/60  flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm font-bold text-slate-600 ">
              <div className="flex items-center gap-2">
                <IoCheckmarkCircle className="text-emerald-500 text-lg" />
                <span>تحديث تلقائي للأسعار</span>
              </div>
              <div className="flex items-center gap-2">
                <IoCheckmarkCircle className="text-emerald-500 text-lg" />
                <span>بدون عمولة على المبيعات</span>
              </div>
              <div className="flex items-center gap-2">
                <IoCheckmarkCircle className="text-emerald-500 text-lg" />
                <span>دعم الليرة $ والعملات</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 hidden lg:block animate-float">
            <div className="relative bg-white  rounded-[2rem] p-2 shadow-2xl border border-slate-200  rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-slate-100  rounded-[1.5rem] p-4 flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-slate-200  pb-3">
                  <div className="w-24 h-4 bg-slate-200 rounded-full" />
                  <div className="flex gap-2">
                    <div className="w-4 h-4 bg-red-400 rounded-full" />
                    <div className="w-4 h-4 bg-amber-400 rounded-full" />
                    <div className="w-4 h-4 bg-green-400 rounded-full" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white  p-4 rounded-2xl shadow-sm">
                    <div className="w-8 h-8 bg-brand-100  text-brand-500 rounded-lg mb-2" />
                    <div className="w-16 h-3 bg-slate-200  rounded-full mb-2" />
                    <div className="w-10 h-4 bg-slate-300 rounded-full" />
                  </div>
                  <div className="bg-white  p-4 rounded-2xl shadow-sm">
                    <div className="w-8 h-8 bg-blue-100  text-blue-500 rounded-lg mb-2" />
                    <div className="w-16 h-3 bg-slate-200  rounded-full mb-2" />
                    <div className="w-10 h-4 bg-slate-300  rounded-full" />
                  </div>
                </div>

                <div className="bg-white  p-4 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200  rounded-xl" />
                    <div className="flex-1">
                      <div className="w-20 h-3 bg-slate-300 rounded-full mb-1" />
                      <div className="w-12 h-2 bg-slate-200 rounded-full" />
                    </div>
                    <div className="w-14 h-6 bg-brand-50  rounded-full" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200  rounded-xl" />
                    <div className="flex-1">
                      <div className="w-20 h-3 bg-slate-300  rounded-full mb-1" />
                      <div className="w-12 h-2 bg-slate-200  rounded-full" />
                    </div>
                    <div className="w-14 h-6 bg-brand-50  rounded-full" />
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-6 -left-6 bg-white  p-3 rounded-2xl shadow-xl border border-slate-100  flex items-center gap-3 animate-bounce"
                style={{ animationDuration: "3s" }}
              >
                <div className="w-11 h-11 bg-brand-100  text-brand-500 rounded-xl flex items-center justify-center text-xl">
                  <IoQrCode />
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-500">
                    <span className="block text-xs font-black text-slate-900 ">
                      امسح الكود واستعرض
                    </span>
                    <span className="block text-[10px] text-brand-600  font-bold">
                      بدون تحميل تطبيقات
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;
