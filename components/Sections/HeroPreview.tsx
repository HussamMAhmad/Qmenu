import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  CreditCard,
  LayoutDashboard,
  QrCode,
  TrendingUp,
  Utensils,
  Zap,
  Plus,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

const foodImages = {
  burger:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
  salad:
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85",
  pasta:
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=85",
  restaurant:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=85",
  dining:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85",
  coffee:
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=85",
};

interface MenuItem {
  icon: LucideIcon;
  label: string;
}

const menuItems1: MenuItem[] = [
  { icon: LayoutDashboard, label: "الرئيسية" },
  { icon: Utensils, label: "الأصناف" },
  { icon: QrCode, label: "رمز QR" },
  { icon: CreditCard, label: "الأسعار" },
];

const menuItems = [
  {
    name: "برجر دابل",
    description: "لحم مشوي، شيدر، صلصة خاصة",
    price: "$9.00",
    image: foodImages.burger,
  },
  {
    name: "سلطة سيزر",
    description: "خضروات طازجة وصلصة سيزر",
    price: "$6.50",
    image: foodImages.salad,
  },
  {
    name: "باستا إيطالية",
    description: "باستا طازجة بصلصة الريحان",
    price: "$8.00",
    image: foodImages.pasta,
  },
];

function FloatingStat({
  icon: Icon,
  label,
  value,
  className = "",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  className: string;
}) {
  return (
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute z-20 hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-3.5 shadow-xl shadow-slate-900/[0.06] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90 sm:flex ${className}`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
        <Icon size={21} />
      </span>

      <span>
        <span className="block text-lg font-black text-slate-950 dark:text-white">
          {value}
        </span>
        <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          {label}
        </span>
      </span>
    </motion.div>
  );
}

function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[610px]">
      <motion.div
        aria-hidden="true"
        animate={{ rotate: [0, 8, 0], scale: [1, 1.035, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[7%] top-[7%] aspect-square w-[84%] rounded-[42%_58%_61%_39%/44%_41%_59%_56%] bg-gradient-to-br from-brand-400/40 via-brand-500/35 to-brand-700/45 blur-[1px]"
      />

      <div className="absolute inset-x-[15%] bottom-[4%] h-28 rounded-full bg-brand-600/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-[84%] rotate-[-2deg] rounded-[2rem] border border-white/80 bg-white/85 p-2.5 shadow-[0_35px_100px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-transform duration-500 hover:rotate-0 dark:border-slate-700 dark:bg-slate-900/90 sm:w-[78%]">
        <div className="overflow-hidden rounded-[1.5rem] bg-slate-50 dark:bg-slate-950">
          {/* شريط لوحة التحكم */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>

            <div className="flex items-center gap-2 text-[10px] font-black text-brand-700 dark:text-brand-300">
              <LayoutDashboard size={14} />
              Q-Menu Dashboard
            </div>
          </div>

          <div className="grid grid-cols-[0.72fr_1.28fr] gap-3 p-3 sm:gap-4 sm:p-4">
            {/* القائمة الجانبية */}
            <div className="space-y-3 rounded-2xl bg-white p-3 dark:bg-slate-900">
              <div className="mb-5 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                  <Utensils size={16} />
                </span>
                <span className="text-[10px] font-black text-slate-900 dark:text-white">
                  مطعمي
                </span>
              </div>

              {menuItems1.map(({ icon: Icon, label }, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 rounded-lg px-2 py-2 text-[9px] font-bold ${
                    index === 0
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-500"
                  }`}
                >
                  <Icon size={13} />
                  <span>{label}</span>
                </div>
              ))}

              <div className="mt-6 rounded-xl bg-gradient-to-br from-brand-600 to-brand-700 p-3 text-white">
                <QrCode size={27} className="mb-3" />
                <p className="text-[9px] font-black">منيو مطعمك</p>
                <p className="mt-1 text-[8px] text-white/75">جاهز للمشاركة</p>
              </div>
            </div>

            {/* محتوى لوحة التحكم */}
            <div className="min-w-0 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400">
                    أهلاً بك
                  </p>
                  <h3 className="mt-1 text-sm font-black text-slate-950 dark:text-white sm:text-base">
                    لوحة مطعمك
                  </h3>
                </div>

                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1.5 text-[8px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  نشط
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-slate-100 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-[8px] text-slate-500 dark:text-slate-400">
                    الأصناف
                  </span>
                  <div className="mt-2 flex items-center justify-between">
                    <strong className="text-xl font-black text-slate-950 dark:text-white">
                      24
                    </strong>
                    <Utensils size={17} className="text-brand-600" />
                  </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-[8px] text-slate-500 dark:text-slate-400">
                    حالة المنيو
                  </span>
                  <div className="mt-2 flex items-center justify-between">
                    <strong className="text-sm font-black text-emerald-600">
                      متاح
                    </strong>
                    <CheckCircle2 size={17} className="text-emerald-500" />
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2.5 dark:border-slate-800">
                  <span className="text-[9px] font-black text-slate-900 dark:text-white">
                    أصناف المنيو
                  </span>
                  <span className="text-[8px] font-bold text-brand-600">
                    عرض الكل
                  </span>
                </div>

                <div className="space-y-2.5 p-2.5">
                  {menuItems.slice(0, 2).map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[9px] font-black text-slate-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="mt-1 text-[8px] text-slate-500">
                          {item.price}
                        </p>
                      </div>

                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
                        <Plus size={13} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900">
            <span className="text-[9px] font-bold text-slate-500">
              آخر تحديث: الآن
            </span>
            <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600">
              <CheckCircle2 size={12} />
              جميع الأنظمة تعمل
            </span>
          </div>
        </div>
      </div>

      <FloatingStat
        icon={TrendingUp}
        value="24"
        label="وجبة مفعلة"
        className="-left-1 bottom-[14%] sm:-left-3"
      />

      <FloatingStat
        icon={Zap}
        value="نشط الآن"
        label="المنيو متاح"
        className="-right-1 top-[18%] sm:-right-3"
      />

      <motion.div
        animate={{ y: [0, 7, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-2 right-[5%] z-20 hidden rounded-2xl border border-white/80 bg-white/90 p-3 shadow-xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90 sm:block"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-brand-50 p-2 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
            <QrCode size={29} />
          </div>
          <div>
            <p className="text-xs font-black text-slate-950 dark:text-white">
              امسح واستعرض
            </p>
            <p className="mt-1 text-[10px] text-slate-500">دون تحميل تطبيق</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default HeroPreview;
