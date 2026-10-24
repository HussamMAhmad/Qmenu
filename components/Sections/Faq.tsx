"use client";
import { FAQ } from "@/data/constants";
import { MessageCircle, ChevronDown } from "lucide-react";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section
      id="faq"
      className="scroll-mt-24 bg-white px-5 py-20 dark:bg-slate-900/40 sm:px-8 sm:py-28 lg:px-12"
    >
      <div className="mx-auto max-w-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="هل لديك سؤال؟"
            title="إجابات"
            accent="عن Q-Menu"
            description="إليك إجابات عن أكثر الأسئلة شيوعاً حول المنيو الرقمي."
          />
        </Reveal>
        {FAQ.map((faq, index) => {
          const isOpen = open === index;

          return (
            <Reveal key={faq.ans} delay={index * 0.035}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-right sm:px-6"
                >
                  <span className="text-sm font-black text-slate-900 dark:text-white sm:text-base">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={19}
                    className={`shrink-0 text-brand-600 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-slate-100 px-5 py-4 text-sm leading-8 text-slate-600 dark:border-slate-800 dark:text-slate-300 sm:px-6">
                        {faq.ans}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
