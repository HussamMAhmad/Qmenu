import React from "react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { ChevronLeft, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const subscription = {
  planName: "الخطة التجريبية (Free)",
  isFree: true,
  daysLeft: 12,
  totalDays: 30,
  maxDishes: 20,
  currentDishes: 14,
};

function SubscriptionCard() {
  const subscriptionProgress = Math.round(
    (subscription.daysLeft / subscription.totalDays) * 100,
  );

  const dishesProgress = Math.round(
    (subscription.currentDishes / subscription.maxDishes) * 100,
  );
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-400">الاشتراك الحالي</p>
          <h2 className="mt-2 text-xl font-black">{subscription.planName}</h2>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-xs">
          <Crown className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-3xl font-black">{subscription.daysLeft}</p>
          <p className="mt-1 text-[11px] text-slate-400">
            يوم متبقٍ من التجربة
          </p>
        </div>

        <Badge className="rounded-full border-0 bg-white/10 px-3 py-1 text-[10px] font-bold text-white hover:bg-white/10">
          مجاني
        </Badge>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-[11px] text-slate-400">
          <span>المدة المتبقية</span>
          <span className="font-bold text-slate-200">
            {subscriptionProgress}%
          </span>
        </div>
        <Progress
          value={subscriptionProgress}
          className="h-2 bg-white/10 [&>div]:bg-brand-400"
        />
      </div>

      <Link href="/dashboard/settings/subscription" className="block mt-5">
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
