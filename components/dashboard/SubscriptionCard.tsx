import React from "react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { ChevronLeft, Crown, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";

// const subscription = {
//   planName: "الخطة التجريبية (Free)",
//   isFree: true,
//   daysLeft: 12,
//   totalDays: 30,
//   maxDishes: 20,
//   currentDishes: 14,
// };

async function SubscriptionCard({
  subscription,
  dishesCount,
  maxDishes,
}: {
  subscription: Subscription | null | undefined;
  dishesCount: number;
  maxDishes: number;
}) {
  if (!subscription) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm text-center">
        <p className="text-sm text-slate-400">لا يوجد اشتراك نشط حالياً</p>
        <Link href="/subscription/checkout" className="block mt-4">
          <Button className="w-full rounded-xl bg-brand-600 text-white">
            اشترك الآن
          </Button>
        </Link>
      </div>
    );
  }

  let totalDays = 0;
  if (subscription?.status === "TRIAL") {
    totalDays = 14;
  } else if (subscription?.status === "ACTIVE") {
    totalDays = 30;
  }

  const now = dayjs();
  const renewal = dayjs(subscription.renewalDate);
  const daysLeft = Math.max(0, renewal.diff(now, "day"));

  const subscriptionProgress =
    totalDays > 0 ? Math.round(((totalDays - daysLeft) / totalDays) * 100) : 0;
  const dishesProgress =
    maxDishes > 0 ? Math.round((dishesCount / maxDishes) * 100) : 0;

  const isTrial = subscription.status === "TRIAL";
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-400">الاشتراك الحالي</p>
          <h2 className="mt-2 text-xl font-black">{subscription.name}</h2>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-xs">
          <Crown className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-3xl font-black">{daysLeft}</p>
          <p className="mt-1 text-[11px] text-slate-400">
            {isTrial ? "يوم متبقٍ من التجربة" : "يوم متبقٍ على التجديد"}
          </p>
        </div>

        <Badge
          className={`rounded-full border-0 px-3 py-1 text-[10px] font-bold text-white hover:opacity-90 ${
            isTrial
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
          }`}
        >
          {isTrial ? "تجريبي (مجاني)" : "مدفوع (نشط)"}
        </Badge>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-[11px] text-slate-400">
          <span>المدة المتبقية للاشتراك</span>
          <span className="font-bold text-slate-200">
            {subscriptionProgress}%
          </span>
        </div>
        <Progress
          value={subscriptionProgress}
          className="h-2 bg-white/10 [&>div]:bg-brand-400"
        />
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Utensils className="h-3 w-3" /> الوجبات المضافة ({dishesCount} /{" "}
            {maxDishes})
          </span>
          <span className="font-bold text-slate-200">{dishesProgress}%</span>
        </div>
        <Progress
          value={dishesProgress}
          className="h-2 bg-white/10 [&>div]:bg-emerald-400"
        />
      </div>

      <Link href="/subscription/checkout" className="block mt-5">
        <Button
          variant="outline"
          className="h-10 w-full rounded-xl border-white/10 bg-white/5 text-xs font-bold text-white hover:bg-white/10 hover:text-white transition-all"
        >
          إدارة الاشتراك
          <ChevronLeft className="mr-1 h-3.5 w-3.5" />
        </Button>
      </Link>
    </div>
  );
}

export default SubscriptionCard;
