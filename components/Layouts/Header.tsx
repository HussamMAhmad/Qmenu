"use client";
import Image from "next/image";
import { icon } from "@/public/assets";
import Link from "next/link";
import { LINKS } from "@/data/constants";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Menu, X } from "lucide-react";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-lg shadow-slate-900/[0.035] backdrop-blur-2xl sm:px-5">
        <Link
          href="#home"
          aria-label="Q-Menu — الصفحة الرئيسية"
          className="group inline-flex shrink-0 items-center gap-2.5"
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-2xl shadow-md shadow-brand-600/10 transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-105 bg-brand-50/50 flex items-center justify-center">
            <Image
              src={icon}
              alt="Q-Menu Logo"
              fill
              priority
              sizes="40px"
              className="object-contain p-1.5"
            />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-950">
            Q<span className="text-brand-600">-</span>Menu
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map(({ name, url }) => (
            <Link
              key={url}
              href={url}
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-brand-600"
            >
              {name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/sign-in"
            className="hidden px-3 py-2 text-sm font-bold text-slate-700 transition hover:text-brand-600 sm:inline-flex"
          >
            تسجيل الدخول
          </Link>

          <Link
            href="/sign-up"
            className="hidden items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-600/20 transition hover:-translate-y-0.5 hover:bg-brand-700 active:scale-[0.98] sm:inline-flex"
          >
            ابدأ مجاناً
            <ArrowLeft size={16} />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-1">
              {LINKS.map(({ name, url }) => (
                <Link
                  key={url}
                  href={url}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
                >
                  {name}
                </Link>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-2 pt-2 border-t border-slate-100">
              <Link
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-brand-600"
              >
                تسجيل الدخول
              </Link>

              <Link
                href="/sign-up"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-600/20 transition hover:bg-brand-700 active:scale-[0.98]"
              >
                ابدأ مجاناً
                <ArrowLeft size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
