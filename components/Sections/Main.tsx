
import React from "react";
import {
  IoQrCode,
  IoCheckmarkCircle,
  IoArrowBack,
  IoArrowUp,
  IoRestaurantOutline,
  IoEyeOutline,
  IoTrendingUpOutline,
  IoPlay,
  IoSparklesOutline,
} from "react-icons/io5";

const benefits = [
  "بدون عمولات على المبيعات",
  "تحديث فوري للأسعار",
  "يدعم العملات المتعددة",
];

const menuItems = [
  {
    name: "برجر لحم دابل",
    description: "لحم مشوي، جبنة شيدر وصوص خاص",
    price: "$9.00",
    emoji: "🍔",
    color: "bg-amber-50 dark:bg-amber-950/40",
  },
  {
    name: "سيزر سالاد",
    description: "خضروات طازجة وصوص سيزر",
    price: "$6.50",
    emoji: "🥗",
    color: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    name: "بيتزا مارجريتا",
    description: "موزاريلا، طماطم وريحان",
    price: "$8.00",
    emoji: "🍕",
    color: "bg-rose-50 dark:bg-rose-950/40",
  },
];

function Main() {
  return (
    <section
      id="home"
      dir="rtl"
      className="relative isolate overflow-hidden bg-slate-50 dark:bg-slate-950"
    >
      {/* خلفية البراند */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/40 via-transparent to-transparent dark:from-brand-950/20" />

        <div className="absolute -top-40 right-[-8%] h-[420px] w-[420px] rounded-full bg-brand-400/15 blur-[110px] dark:bg-brand-500/10" />

        <div className="absolute bottom-[-180px] left-[-8%] h-[460px] w-[460px] rounded-full bg-brand-600/10 blur-[120px] dark:bg-brand-600/10" />

        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.045]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 0.7px, transparent 0.7px)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-32 lg:pt-36">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.95fr] lg:gap-12 xl:gap-20">

          {/* الجانب النصي */}
          <div className="relative z-10 text-center lg:text-right">

            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-brand-200/80 bg-white/80 px-4 py-2 text-xs font-bold text-brand-700 shadow-sm shadow-brand-500/5 backdrop-blur-md dark:border-brand-800/70 dark:bg-slate-900/80 dark:text-brand-300 sm:text-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-900/70 dark:text-brand-300">
                <IoSparklesOutline className="text-base" />
              </span>

              <span>كل ما يحتاجه مطعمك في مكان واحد</span>

              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            </div>

            <h1 className="mx-auto mb-6 max-w-2xl text-[2.65rem] font-black leading-[1.3] tracking-tight text-slate-950 dark:text-white sm:text-5xl sm:leading-[1.25] lg:mx-0 lg:text-[3.65rem] lg:leading-[1.24] xl:text-[4rem]">
              منيو مطعمك،
              <br />
              <span className="relative inline-block bg-gradient-to-l from-brand-700 via-brand-500 to-brand-400 bg-clip-text pb-1 text-transparent">
                بتجربة مختلفة.
              </span>
            </h1>

            <p className="mx-auto mb-9 max-w-xl text-base font-medium leading-8 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-9 lg:mx-0">
              أنشئ منيو رقميًا احترافيًا، واعرض أطباقك وأسعارك عبر QR،
              وأدر قائمة مطعمك بسهولة من لوحة تحكم واحدة، دون عمولات
              على مبيعاتك.
            </p>

            {/* الأزرار الرئيسية */}
            <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <a
                href="#signup"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-brand-600 to-brand-500 px-7 py-4 text-base font-extrabold text-white shadow-lg shadow-brand-600/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-600/25 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/30 active:translate-y-0 sm:min-w-56"
              >
                <span>أنشئ منيو مطعمك</span>
                <IoArrowBack className="text-xl transition-transform duration-200 group-hover:-translate-x-1" />
              </a>

              <a
                href="#demo"
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-7 py-4 text-base font-bold text-slate-800 shadow-sm transition duration-200 hover:border-brand-300 hover:bg-brand-50/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:border-brand-700 dark:hover:bg-slate-900 sm:min-w-48"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
                  <IoPlay className="translate-x-[-1px] text-sm" />
                </span>
                <span>اكتشف المنصة</span>
              </a>
            </div>

            {/* المزايا */}
            <div className="mt-10 border-t border-slate-200/80 pt-6 dark:border-slate-800">
              <p className="mb-4 text-xs font-bold text-slate-400">
                مصمم لتسهيل إدارة مطعمك
              </p>

              <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 lg:justify-start">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 sm:text-sm"
                  >
                    <IoCheckmarkCircle className="shrink-0 text-lg text-emerald-500" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* معاينة المنتج */}
          <div className="relative mx-auto w-full max-w-[540px] lg:mr-auto">

            {/* الهالة الخلفية */}
            <div
              aria-hidden="true"
              className="absolute inset-8 rounded-[3rem] bg-brand-500/15 blur-3xl"
            />

            <div className="relative rounded-[2rem] border border-white/80 bg-white/90 p-2.5 shadow-[0_30px_100px_-35px_rgba(15,23,42,0.24)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/30 sm:rounded-[2.25rem] sm:p-3">

              <div className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 sm:rounded-[1.75rem]">

                {/* رأس لوحة التحكم */}
                <div className="flex items-center justify-between border-b border-slate-200/80 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900 sm:px-6 sm:py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-500/20">
                      <IoRestaurantOutline className="text-2xl" />
                    </div>

                    <div>
                      <p className="text-sm font-black text-slate-900 dark:text-white sm:text-base">
                        مطعمي
                      </p>
                      <p className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        لوحة إدارة المنيو
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 dark:border-emerald-900 dark:bg-emerald-950/50">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                      المنيو نشط
                    </span>
                  </div>
                </div>

                <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">

                  {/* بطاقة الترحيب والإحصائيات */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-brand-700 via-brand-600 to-brand-500 p-5 text-white sm:p-6">
                    <div
                      aria-hidden="true"
                      className="absolute -left-8 -top-12 h-36 w-36 rounded-full border-[24px] border-white/10"
                    />

                    <div className="relative flex items-start justify-between gap-3">
                      <div>
                        <p className="mb-2 text-xs font-medium text-white/75">
                          أهلاً بك في لوحة التحكم
                        </p>
                        <h2 className="text-xl font-black sm:text-2xl">
                          منيو مطعمك جاهز!
                        </h2>
                        <p className="mt-2 max-w-[250px] text-xs leading-6 text-white/80">
                          أدر أصنافك وأسعارك وحدّث قائمتك في أي وقت.
                        </p>
                      </div>

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 backdrop-blur-sm">
                        <IoQrCode className="text-3xl" />
                      </div>
                    </div>

                    <div className="relative mt-5 flex items-center justify-between border-t border-white/20 pt-4">
                      <div>
                        <p className="text-[11px] font-medium text-white/75">
                          إجمالي الأصناف
                        </p>
                        <p className="mt-1 text-2xl font-black">24</p>
                      </div>

                      <div className="h-10 w-px bg-white/20" />

                      <div>
                        <p className="text-[11px] font-medium text-white/75">
                          حالة القائمة
                        </p>
                        <p className="mt-2 flex items-center gap-1.5 text-sm font-bold">
                          <IoCheckmarkCircle className="text-lg" />
                          منشورة
                        </p>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                        <IoTrendingUpOutline className="text-2xl" />
                      </div>
                    </div>
                  </div>

                  {/* عنوان قائمة الطعام */}
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-medium text-slate-400">
                        معاينة مباشرة
                      </p>
                      <h3 className="mt-1 text-lg font-black text-slate-900 dark:text-white">
                        قائمة الطعام
                      </h3>
                    </div>

                    <span className="rounded-lg bg-brand-50 px-3 py-2 text-xs font-bold text-brand-700 dark:bg-brand-950/70 dark:text-brand-300">
                      الأكثر طلباً
                    </span>
                  </div>

                  {/* الأصناف */}
                  <div className="space-y-3">
                    {menuItems.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 transition-colors hover:border-brand-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-800 sm:gap-4 sm:p-3.5"
                      >
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl sm:h-14 sm:w-14 ${item.color}`}
                        >
                          {item.emoji}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-extrabold text-slate-900 dark:text-white">
                            {item.name}
                          </p>
                          <p className="mt-1 truncate text-[10px] font-medium text-slate-500 dark:text-slate-400 sm:text-xs">
                            {item.description}
                          </p>
                        </div>

                        <div className="shrink-0 text-left">
                          <p
                            dir="ltr"
                            className="text-sm font-black text-brand-700 dark:text-brand-300 sm:text-base"
                          >
                            {item.price}
                          </p>
                          <p className="mt-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                            متاح للطلب
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* تذييل المعاينة */}
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-brand-100 bg-brand-50/70 p-4 dark:border-brand-900/60 dark:bg-brand-950/30">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm dark:bg-slate-900 dark:text-brand-300">
                        <IoQrCode className="text-2xl" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900 dark:text-white sm:text-sm">
                          منيو عبر رمز QR
                        </p>
                        <p className="mt-1 text-[10px] font-medium text-slate-500 dark:text-slate-400 sm:text-xs">
                          افتح القائمة من أي هاتف
                        </p>
                      </div>
                    </div>

                    <IoArrowUp className="shrink-0 rotate-45 text-xl text-brand-600 dark:text-brand-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* بطاقة QR عائمة */}
            <div className="absolute -bottom-5 -left-2 flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/95 p-3 shadow-xl shadow-slate-900/10 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 sm:-bottom-7 sm:-left-5 sm:gap-4 sm:p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300 sm:h-12 sm:w-12">
                <IoQrCode className="text-3xl" />
              </div>

              <div>
                <p className="text-xs font-black text-slate-900 dark:text-white sm:text-sm">
                  امسح واستعرض
                </p>
                <p className="mt-1 text-[10px] font-medium text-slate-500 dark:text-slate-400 sm:text-xs">
                  بدون تحميل تطبيق
                </p>
              </div>

              <IoCheckmarkCircle className="text-xl text-emerald-500" />
            </div>

            {/* بطاقة صغيرة عائمة */}
            <div className="absolute -right-2 top-16 hidden items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white/95 px-3.5 py-3 shadow-xl shadow-slate-900/5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 sm:flex lg:-right-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <IoEyeOutline className="text-xl" />
              </div>

              <div>
                <p className="text-xs font-black text-slate-900 dark:text-white">
                  تجربة سهلة
                </p>
                <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                  لجميع العملاء
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Main;
