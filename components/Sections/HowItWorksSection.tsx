"use client";
import React, { useState } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HowItWorksSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section id="preview" className="py-24 px-5 sm:px-8 lg:px-12 bg-slate-50 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto text-center space-y-12">
        
        <div className="space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-brand-700 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
            شاهد النظام على الطبيعة
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-950">
            كيف تتحكم بمنيو مطعمك في ثوانٍ معدودة؟
          </h2>
          <p className="text-slate-600 font-medium text-base">
            فيديو قصير يوضح لك خطوة بخطوة كيف تقوم بإنشاء القائمة الرقمية، ربطها بالطاولات، وتحديث الأسعار لحظياً.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto rounded-3xl border border-slate-200/80 bg-white p-3 shadow-2xl shadow-slate-900/10">
          <div 
            className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center group cursor-pointer"
            onClick={() => setIsVideoOpen(true)}
          >
            
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-slate-900/40 to-transparent z-10" />
            
            <div className="absolute z-20 flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-xl shadow-brand-600/30 group-hover:scale-110 transition-transform duration-300">
                <Play size={32} fill="currentColor" className="ml-1" />
              </div>
              <span className="text-white font-bold text-sm tracking-wide bg-slate-950/60 px-4 py-1.5 rounded-full backdrop-blur-md">
                اضغط لمشاهدة العرض التوضيحي (دقيقة واحدة)
              </span>
            </div>

            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>
        </div>

      </div>

      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 left-4 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                <iframe
                  src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
                  title="Q-Menu Demo"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}