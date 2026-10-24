"use client";
import { ArrowLeft, Mail, Sparkles } from "lucide-react";
import Reveal from "../ui/Reveal";
import Link from "next/link";

function FinalCall() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-14 text-center shadow-2xl sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-700/80 via-brand-600/40 to-slate-950"
          />

          <div
            aria-hidden="true"
            className="absolute -left-20 -top-32 -z-10 h-80 w-80 rounded-full bg-brand-400/30 blur-[100px]"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-40 -right-10 -z-10 h-80 w-80 rounded-full bg-brand-500/30 blur-[100px]"
          />

          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur-xl">
            <Sparkles size={27} />
          </span>

          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-black leading-[1.4] text-white sm:text-4xl lg:text-5xl">
            اجعل منيو مطعمك
            <span className="block text-brand-300">جزءاً من تجربة لا تُنسى</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/75 sm:text-base">
            ابدأ بخطوة بسيطة نحو منيو رقمي أكثر أناقة ووضوحاً
            وسهولة في الإدارة.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="#pricing"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-black text-brand-700 transition hover:-translate-y-0.5 hover:bg-brand-50"
            >
              ابدأ الآن
              <ArrowLeft size={18} />
            </Link>

            <a
              href="mailto:hello@q-menu.example"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-bold text-white backdrop-blur-xl transition hover:bg-white/10"
            >
              <Mail size={17} />
              تواصل معنا
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default FinalCall;