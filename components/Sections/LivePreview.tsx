"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Smartphone, CheckCircle2, ArrowLeft, QrCode } from "lucide-react";
import Reveal from "../ui/Reveal";

import { tabletMockup, mobileMockup } from "@/public/assets";

export default function LivePreview() {
  return (
    <section
      id="preview"
      className="scroll-mt-24 overflow-hidden bg-slate-50/80 px-5 py-20 sm:px-8 sm:py-28 lg:px-12 relative"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-brand-400/10 blur-[140px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-2 text-xs font-bold text-brand-700 shadow-sm">
            <Smartphone size={15} />
            المعاينة الحية
          </div>

          <h2 className="max-w-xl text-3xl font-black leading-[1.4] text-slate-950 sm:text-4xl lg:text-5xl">
            تجربة زبائنك تبدأ
            <span className="block bg-gradient-to-l from-brand-700 via-brand-500 to-brand-400 bg-clip-text text-transparent pb-1">
              من أول لمسة
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-8 text-slate-600 sm:text-base">
            اعرض أصناف مطعمك بصور واضحة وتفاصيل مرتبة وأسعار سهلة القراءة على
            جميع الأجهزة. هذه معاينة تفاعلية لتوضيح تجربة تصفح المنيو الاحترافية
            عبر الجوال والتابلت.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "تصميم متجاوب مع الهواتف واللوحيات",
              "تصنيفات واضحة وسهلة التصفح",
              "عرض صور الأصناف والأسعار بانسيابية تامّة",
            ].map((label) => (
              <div
                key={label}
                className="flex items-center gap-3 text-sm font-bold text-slate-700"
              >
                <CheckCircle2 size={19} className="text-emerald-500 shrink-0" />
                {label}
              </div>
            ))}
          </div>

          <Link
            href="/sign-up"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 active:scale-[0.98]"
          >
            أنشئ منيو مطعمك
            <ArrowLeft size={17} />
          </Link>
        </Reveal>

        <Reveal
          delay={0.12}
          className="relative mx-auto w-full max-w-[520px] flex items-center justify-center"
        >
          <div className="absolute inset-x-[10%] top-[15%] h-[65%] rounded-full bg-gradient-to-br from-brand-400/30 via-brand-500/25 to-brand-700/35 blur-3xl pointer-events-none" />

          <div className="relative w-full flex items-center justify-center min-h-[420px] sm:min-h-[480px]">
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-[85%] max-w-[420px] z-10 drop-shadow-2xl"
            >
              <Image
                src={tabletMockup}
                alt="معاينة المنيو على جهاز التابلت"
                width={800}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30, y: 40 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="absolute -bottom-6 -right-4 sm:-right-8 w-[42%] max-w-[190px] z-20 drop-shadow-[0_25px_35px_rgba(15,23,42,0.3)]"
            >
              <Image
                src={mobileMockup}
                alt="معاينة المنيو على الهاتف المحمول"
                width={400}
                height={800}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-2 top-[15%] z-30 hidden rounded-2xl border border-white/80 bg-white/90 p-3.5 shadow-xl backdrop-blur-xl sm:flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <QrCode size={20} />
            </span>
            <div>
              <p className="text-xs font-black text-slate-900">QR Menu</p>
              <p className="mt-0.5 text-[10px] text-slate-500 font-medium">
                تصفح فوري وسريع
              </p>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
