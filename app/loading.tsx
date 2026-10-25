"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50/30 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 px-4 transition-colors">
      
      <div className="absolute w-64 h-64 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex items-center justify-center mb-6">
        <motion.div
          className="w-20 h-20 border-4 border-amber-200 dark:border-amber-950 border-t-amber-500 dark:border-t-amber-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        />

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

      <motion.div
        className="flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
          Q-Menu
        </h2>
      </motion.div>
    </div>
  );
}