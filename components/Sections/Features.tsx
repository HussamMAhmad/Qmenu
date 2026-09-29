import React from "react";
import { FEATURES } from "@/data/constants";
import { IconType } from "react-icons";

function Features() {
  return (
    <section
      id="features"
      className="py-20 bg-white border-y border-slate-100 relative z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-500 font-black text-xs tracking-widest uppercase mb-2">
            لماذا منصة كيومينو؟
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900  mb-4">
            أدوات ذكية متكاملة لإدارة منيو مطعمك
          </h3>
          <p className="text-slate-600  font-medium">
            كل ما تحتاجه لرفع نسبة المبيعات وتسهيل طلبات الزبائن مع تقليل
            التكاليف التشغيلية والطباعة.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map(
            ({
              title,
              text,
              Icon,
              className,
            }: {
              title: string;
              text: string;
              Icon: IconType;
              className: string;
            }) => (
              <div
                key={title}
                className="bg-slate-50  p-8 rounded-[2rem] border border-slate-200/80  hover:-translate-y-2 transition-all duration-300 group shadow-sm hover:shadow-xl"
              >
                <div className="w-14 h-14 bg-brand-50  rounded-2xl shadow-soft flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                  <Icon className={className}/>
                </div>
                <h4 className="text-xl font-black text-slate-900  mb-3">
                  {title}
                </h4>
                <p className="text-slate-600  text-sm leading-relaxed">
                  {text}
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export default Features;
