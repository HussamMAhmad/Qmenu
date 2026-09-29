"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/data/constants";
import { HelpCircle, MessageCircle } from "lucide-react";

export default function Faq() {
  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/60 text-brand-600 text-xs font-bold mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>الأسئلة الشائعة</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
            كل ما تحتاجه لمعرفته عن منيوك
          </h2>
          <p className="text-slate-600 font-medium text-base max-w-xl mx-auto leading-relaxed">
            إجابات شاطبة ومباشرة عن أكثر الاستفسارات وروداً حول الميزات، الخطط، وآلية العمل.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {FAQ.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-slate-200/80 rounded-2xl bg-slate-50/50 px-6 transition-all duration-200 hover:bg-white hover:border-brand-200 data-[state=open]:bg-white data-[state=open]:border-brand-400 data-[state=open]:shadow-md data-[state=open]:shadow-brand-500/5 overflow-hidden"
            >
              <AccordionTrigger className="cursor-pointer py-5 text-right font-bold text-slate-900 text-base md:text-lg hover:text-brand-600 hover:no-underline transition-colors flex justify-between items-center">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 pt-1 text-slate-600 text-sm md:text-base leading-relaxed font-medium border-t border-slate-100/80 mt-1">
                {item.ans}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center p-6 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-right">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">لديك سؤال آخر لم نجب عليه؟</h4>
            <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">فريق الدعم الفني جاهز لمساعدتك على مدار الساعة.</p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-white text-slate-800 hover:text-brand-600 border border-slate-200/80 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs hover:border-brand-200 transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-brand-500" />
            <span>تواصل مع الدعم</span>
          </a>
        </div>

      </div>
    </section>
  );
}