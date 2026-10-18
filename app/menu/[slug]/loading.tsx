export default function Loading() {
  return (
    <div className="min-h-screen bg-white pb-12 animate-pulse">
      <div className="w-full h-48 sm:h-64 bg-brand-100 relative mb-6">
        <div className="absolute -bottom-8 start-8 sm:start-12 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-brand-200 border-4 border-white shadow-md"></div>
      </div>

      <div className="px-4 sm:px-8 max-w-5xl mx-auto space-y-6">
        <div className="space-y-2 pt-4">
          <div className="h-6 w-48 bg-brand-200 rounded-lg"></div>
          <div className="h-4 w-72 bg-brand-100 rounded-md"></div>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto py-2 scrollbar-none">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-10 w-28 bg-brand-100 rounded-full shrink-0"
            ></div>
          ))}
        </div>

        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="bg-brand-100 p-3 sm:p-4 rounded-[30px] flex flex-col justify-between border border-white/50 space-y-3"
            >
              <div className="w-full h-40 sm:h-44 rounded-[18px] bg-brand-200/70"></div>

              <div className="space-y-2 px-0.5">
                <div className="h-4 bg-brand-200 rounded-md w-4/5"></div>
                <div className="h-3 bg-brand-200/60 rounded-md w-2/3"></div>
              </div>

              <div className="pt-2.5 border-t border-brand-200/60 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="h-4 w-16 bg-brand-200 rounded-md"></div>
                </div>
                <div className="size-8 rounded-full bg-brand-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}