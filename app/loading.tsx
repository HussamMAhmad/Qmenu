"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50/30 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 px-4 transition-colors">
      
      {/* خلفية توهج دافئة تعبر عن ألوان البراند */}
      <div className="absolute w-64 h-64 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex items-center justify-center mb-6">
        {/* الحلقة الخارجية باللون البرتقالي البراند */}
        <motion.div
          className="w-20 h-20 border-4 border-amber-200 dark:border-amber-950 border-t-amber-500 dark:border-t-amber-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        />

        {/* أيقونة المطعم بنبضات هادئة لونها ناري/دافئ */}
        <motion.div
          className="absolute flex items-center justify-center text-amber-600 dark:text-amber-500"
          initial={{ scale: 0.85, opacity: 0.6 }}
          animate={{ scale: [0.85, 1.1, 0.85], opacity: [0.6, 1, 0.6] }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: "easeInOut",
          }}
        >
          <UtensilsCrossed className="w-8 h-8" />
        </motion.div>
      </div>

      {/* اسم العلامة التجارية بالنص والتدرج الخاص بـ Q-Menu */}
      <motion.div
        className="flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
          Q-Menu
        </h2>
        
        {/* شريط تحميل دقيق في الأسفل بنفس ألوان البراند */}
        <div className="w-32 h-1 bg-amber-100 dark:bg-zinc-800 rounded-full overflow-hidden mt-1">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "easeInOut",
            }}
          />
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1 animate-pulse">
          جاري تجهيز القائمة...
        </p>
      </motion.div>
    </div>
  );
}