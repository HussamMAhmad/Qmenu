"use client";
import React from "react";
import HeroPreview from "./HeroPreview";
import {
  ArrowLeft,
  CheckCircle2,
  Headphones,
  ShieldCheck,
  Zap,
  Play,
  MonitorSmartphone,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-36 lg:px-12 lg:pb-32 lg:pt-30"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(148,163,184,0.12),transparent_60%)]" />
        <div className="absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-brand-400/10 blur-[120px]" />
        <div className="absolute bottom-0 left-[25%] h-[350px] w-[350px] rounded-full bg-brand-600/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.3) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div className="relative z-10 text-center lg:text-right">
          <Reveal>
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-brand-200/80 bg-white/75 px-4 py-2.5 text-xs font-bold text-brand-700 shadow-sm backdrop-blur-xl sm:text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-600" />
              </span>
              طريقة أذكى لإدارة منيو مطعمك
              <ArrowLeft size={14} />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mx-auto max-w-3xl text-4xl font-black leading-[1.4] tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.32] lg:mx-0 lg:text-6xl xl:text-[4.5rem]">
              منيو مطعمك،
              <span className="block bg-gradient-to-l from-brand-700 via-brand-500 to-brand-400 bg-clip-text pb-2 text-transparent">
                بتجربة تفاعلية ذكية
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg sm:leading-9 lg:mx-0">
              أنشئ منيو رقمياً احترافياً، اعرض أطباقك بأجمل صورة، حدّث الأسعار
              بسهولة، وامنح زبائنك تجربة تصفح عصرية تبدأ بمسح رمز QR — دون
              عمولات على المبيعات بحسب نموذج الخدمة المعتمد.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col justify-center gap-3.5 sm:flex-row lg:justify-start">
              <Link
                href="/sign-up"
                className="group inline-flex min-h-[58px] items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-brand-600 to-brand-500 px-7 py-4 font-black text-white shadow-lg shadow-brand-600/25 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-600/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/30"
              >
                ابدأ تجربتك المجانية
                <ArrowLeft
                  size={19}
                  className="transition-transform group-hover:-translate-x-1"
                />
              </Link>

              <a
                href="#preview"
                className="group inline-flex min-h-[58px] items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-7 py-4 font-bold text-slate-800 shadow-sm backdrop-blur-xl transition hover:border-brand-300 hover:bg-brand-50/70"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
                  <Play size={14} fill="currentColor" />
                </span>
                اكتشف طريقة العمل
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-slate-200/80 pt-6 lg:justify-start">
              {[
                "إدارة سهلة",
                "تجربة متوافقة مع الجوال",
                "تحديث سريع للأسعار",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs font-bold text-slate-600 sm:text-sm"
                >
                  <CheckCircle2 size={17} className="text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="relative" delay={0.12}>
          <HeroPreview />
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-20 max-w-6xl sm:mt-24">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/60 shadow-sm backdrop-blur-xl md:grid-cols-4">
          {[
            [Zap, "إعداد سريع", "ابدأ دون تعقيد"],
            [MonitorSmartphone, "جميع الأجهزة", "جوال وتابلت وكمبيوتر"],
            [ShieldCheck, "خصوصية وأمان", "إدارة منظمة"],
            [Headphones, "دعم فني", "مساعدة عند الحاجة"],
          ].map(([Icon, title, subtitle], index) => {
            const IconComponent = Icon as LucideIcon;
            return (
              <div
                key={title as string}
                className={`flex items-center gap-3 px-4 py-5 sm:px-6 ${
                  index % 2 === 1 ? "md:border-r md:border-slate-200" : ""
                } ${
                  index > 0 ? "border-r border-slate-200/70 md:border-r-0" : ""
                } ${index !== 0 ? "md:border-r md:border-slate-200" : ""}`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <IconComponent size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 sm:text-sm">
                    {title as string}
                  </p>
                  <p className="mt-1 text-[10px] leading-5 text-slate-500 sm:text-xs">
                    {subtitle as string}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
