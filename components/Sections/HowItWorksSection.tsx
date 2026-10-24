"use client";

import React, { useState } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

export default function HowItWorksSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section
      id="how-it-works"
      className="relative py-24 px-5 sm:px-8 lg:px-12 bg-slate-50 overflow-hidden scroll-mt-20"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto text-center space-y-12">
        
        <Reveal>
          <SectionHeading
            eyebrow="شاهد النظام على الطبيعة"
            title="كيف تتحكم"
            accent="بمنيو مطعمك"
            description="تعرّف في دقيقة واحدة على كيفية إضافة الأصناف، تعديل الأسعار، وإدارة أقسام المنيو لحظياً من لوحة تحكم بسيطة."
          />
        </Reveal>

        <Reveal delay={0.12} className="max-w-4xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative rounded-3xl border border-slate-200/80 bg-white p-3 shadow-2xl shadow-slate-900/10"
          >
            <div
              className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center group cursor-pointer"
              onClick={() => setIsVideoOpen(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-slate-900/40 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90" />

              <div className="absolute z-20 flex flex-col items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-2xl shadow-brand-600/40 group-hover:bg-brand-500 transition-colors duration-300"
                >
                  <Play size={32} fill="currentColor" className="mr-1" />
                </motion.div>
                
                <span className="text-white font-bold text-xs sm:text-sm tracking-wide bg-slate-950/60 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
                  اضغط لمشاهدة العرض التوضيحي (دقيقة واحدة)
                </span>
              </div>

              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>
          </motion.div>
        </Reveal>
      </div>

      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
            >
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 left-4 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="إغلاق الفيديو"
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