"use client";
import Image from "next/image";
import { icon } from "@/public/assets";
import { IoClose, IoLink, IoList } from "react-icons/io5";
import Link from "next/link";
import { LINKS } from "@/data/constants";
import { useState } from "react";
import { Button } from "../ui/button";

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass-nav border-b border-white/20 dark:border-slate-800/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="shrink-0 flex items-center gap-3 cursor-pointer group transition-all duration-200 active:scale-95">
            <div className="bg-transparent w-10 h-10 rounded-xl flex items-center justify-center">
              <Image
                src={icon}
                alt="Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white select-none">
              كيومنيو
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <Link
              href="/login"
              className="hidden md:inline-flex items-center justify-center px-4.5 py-2.5 rounded-xl font-semibold text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 active:scale-95 transition-all duration-200"
            >
              تسجيل الدخول
            </Link>

            <Link
              href="/register"
              className="hidden md:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/35 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              <span>ابدأ مجاناً</span>
            </Link>
          </div>
          <div className="flex md:hidden items-center relative">
            <Button
              onClick={() => setOpen(!open)}
              aria-label="القائمة الرئيسية"
              aria-expanded={open}
              className={`relative w-10 h-10 p-0 rounded-xl border transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-brand-500/50 ${
                open
                  ? "bg-brand-50 border-brand-200 text-brand-600 shadow-inner"
                  : "bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50 hover:text-brand-600 shadow-xs"
              }`}
            >
              <span
                className={`transition-transform duration-200 ${open ? "rotate-90 scale-110" : "rotate-0 scale-100"}`}
              >
                {open ? (
                  <IoClose className="w-5 h-5" />
                ) : (
                  <IoList className="w-5 h-5" />
                )}
              </span>
            </Button>

            <div
              className={`absolute top-full left-0 mt-2.5 z-50 flex flex-col bg-white/90 backdrop-blur-xl border border-slate-200/70 rounded-2xl shadow-xl shadow-slate-900/5 transition-all duration-200 ease-out origin-top-left ${
                open
                  ? "opacity-100 scale-100 pointer-events-auto visible"
                  : "opacity-0 scale-95 pointer-events-none invisible"
              }`}
            >
              <div className="p-3.5 space-y-1 w-[270px]">
                {LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.url}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:text-brand-600 hover:bg-brand-50/70 font-medium transition-all group active:scale-[0.98]"
                  >
                    {/* <div className="w-8 h-8 rounded-lg bg-slate-100/80 group-hover:bg-brand-100/60 flex items-center justify-center text-slate-500 group-hover:text-brand-600 shrink-0 transition-colors">
                      {link.icon ? <link.icon className="w-4 h-4" /> : null}
                    </div> */}
                    <span className="text-sm">{link.name}</span>
                  </Link>
                ))}

                <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200/80 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all text-xs active:scale-[0.98]"
                  >
                    تسجيل الدخول
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold shadow-md shadow-brand-500/20 transition-all text-xs active:scale-[0.98]"
                  >
                    ابدأ مجاناً
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
