"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { UtensilsCrossed, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50/40 text-zinc-900 px-4 relative overflow-hidden">
      
      <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -top-20 -right-20" />
      <div className="absolute w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -bottom-20 -left-20" />

      <div className="max-w-md w-full text-center z-10">
        
        <motion.div
          className="relative flex items-center justify-center mb-6 mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="text-8xl sm:text-9xl font-black tracking-extrabold bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 bg-clip-text text-transparent select-none">
            404
          </span>

          <motion.div
            className="absolute p-4 bg-white shadow-xl rounded-2xl border border-amber-200/60 text-amber-600"
            animate={{ y: [-6, 6, -6] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          >
            <UtensilsCrossed className="w-10 h-10" />
          </motion.div>
        </motion.div>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
            عذراً، هذه الوجبة غير موجودة في القائمة!
          </h1>
          <p className="text-sm text-zinc-600 leading-relaxed px-4">
            الصفحة التي تحاول الوصول إليها ربما تم نقلها، حذفت، أو أن الرابط الذي اتبعته غير صحيح.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 shadow-md shadow-amber-500/20 transition-all duration-200 active:scale-95"
          >
            <Home className="w-4 h-4" />
            الرئيسية
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium bg-amber-100/60 hover:bg-amber-100 text-zinc-800 border border-amber-200/50 transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            الرجوع للخلف
          </button>
        </motion.div>

      </div>
    </div>
  );
}