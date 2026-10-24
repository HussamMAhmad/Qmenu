import React from "react";
import { Sparkles } from "lucide-react";

interface SectionHeadingProps {
  eyebrow : string;
  title: string;
  accent: string;
  description: string;
}

function SectionHeading({ eyebrow, title, accent, description } : SectionHeadingProps) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
      {eyebrow && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-brand-50/80 px-3.5 py-2 text-xs font-bold text-brand-700 dark:border-brand-800 dark:bg-brand-950/50 dark:text-brand-300">
          <Sparkles size={14} />
          {eyebrow}
        </div>
      )}

      <h2 className="text-3xl font-black leading-[1.35] tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
        {title}{" "}
        {accent && (
          <span className="bg-gradient-to-l from-brand-700 via-brand-500 to-brand-400 bg-clip-text text-transparent">
            {accent}
          </span>
        )}
      </h2>

      {description && (
        <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-slate-600 dark:text-slate-300 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
