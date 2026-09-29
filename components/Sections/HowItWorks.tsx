import { STEPS } from "@/data/constants";

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-28 relative overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            كيف تنطلق مع منيوك؟
          </h2>
          <p className="text-slate-600 font-medium text-base sm:text-lg">
            3 خطوات بسيطة تفصلك عن امتلاك أحدث تقنيات تقديم قوائم الطعام.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 text-center relative">
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-brand-100 via-brand-500 to-brand-100 z-0" />

          {STEPS.map((step, index) => {
            const isHighlighted = index === 1;
            return (
              <div
                key={index}
                className="relative z-10 flex flex-col items-center group cursor-default"
              >
                <div
                  className={`w-24 h-24 rounded-full border-4 flex items-center justify-center text-3xl font-black shadow-xl mb-6 transition-all duration-300 group-hover:scale-110 select-none ${
                    isHighlighted
                      ? "bg-brand-500 text-white border-white shadow-brand-500/30 shadow-lg"
                      : "bg-white text-slate-900 border-slate-100 shadow-slate-200/60 group-hover:border-brand-500/50"
                  }`}
                >
                  {step.number}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-brand-500 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
