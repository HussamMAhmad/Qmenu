"use client";
import React from "react";
import { FEATURES } from "@/data/constants";
import { IconType } from "react-icons";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { motion } from "framer-motion";

function Features() {
  return (
    <section
      id="features"
      className="bg-white scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="كل ما تحتاجه في مكان واحد"
            title="أدوات ذكية،"
            accent="إدارة أبسط"
            description="كل التفاصيل التي يحتاجها مطعمك لتقديم منيو رقمي أنيق، وإدارة الأصناف والأسعار من واجهة واحدة."
          />
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map(
            (
              {
                title,
                text,
                Icon,
                className,
              }: {
                title: string;
                text: string;
                Icon: IconType;
                className: string;
              },
              index,
            ) => (
              <Reveal key={title} delay={index * 0.06}>
                <motion.article
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.22 }}
                  className="group h-full overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-white p-5 shadow-sm transition-colors hover:border-brand-300/70 hover:shadow-xl hover:shadow-brand-900/[0.04] dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-brand-800 sm:p-7"
                >
                  <div key={title}>
                    <div className="w-14 h-14 bg-brand-50  rounded-2xl shadow-soft flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                      <Icon className={className} />
                    </div>
                    <h4 className="text-xl font-black text-slate-900  mb-3">
                      {title}
                    </h4>
                    <p className="text-slate-600  text-sm leading-relaxed">
                      {text}
                    </p>
                  </div>
                </motion.article>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export default Features;
