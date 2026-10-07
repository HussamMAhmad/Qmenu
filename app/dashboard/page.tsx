import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  DollarSign,
  ExternalLink,
  Eye,
  Menu,
  QrCode,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SubscriptionCard from "@/components/dashboard/SubscriptionCard";
import { OverviewCard } from "@/components/dashboard/OverviewCard";
import QrCardOverview from "@/components/dashboard/QrCardOverview";
import SubscriptionIsFree from "@/components/dashboard/SubscriptionIsFree";
import RecentDishes from "@/components/dashboard/RecentDishes";
import ExchangeRateForm from "@/components/dashboard/ExchangeRateForm";
import { getRestaurant } from "@/lib/queries/dashboard";
import { getCurrentUser } from "@/lib/auth-helper";
import { countItems } from "@/lib/queries/dashboard";

export default async function DashboardOverviewPage() {
  const subscription = {
    planName: "الخطة التجريبية (Free)",
    isFree: true,
    daysLeft: 12,
    totalDays: 30,
    maxDishes: 20,
    currentDishes: 14,
  };
  const user = await getCurrentUser();
  const restaurant = await getRestaurant(user.id);
  const restaurantName = restaurant?.name ?? "مطعم غير معروف";
  const exchangeRate = Number(restaurant?.exchangeRate) ?? "0";
  const dishesCount = await countItems(user.id);
  return (
    <main className="min-h-screen bg-[#f7f8fa] px-2 py-4 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px] space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Menu className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold tracking-wide text-brand-700">
                OVERVIEW
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              أهلاً بك، {restaurantName}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              كل ما يخص المنيو والاشتراك وسعر الصرف في مكان واحد، مع نظرة سريعة
              على حالة حسابك الحالية.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href={`/m/${restaurantName}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button className="h-[50px] w-full gap-2 rounded-2xl bg-brand-500 px-5 font-bold text-white shadow-sm hover:bg-brand-600 sm:w-auto">
                <Eye className="h-4 w-4" />
                معاينة المنيو
                <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </Button>
            </Link>
          </div>
        </header>

        {/* Primary dashboard block */}
        <Card className="overflow-hidden rounded-[28px] border-0 bg-slate-950 text-white shadow-xl shadow-slate-200/60">
          <CardContent className="relative p-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.10),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_28%)]" />

            <div className="relative grid min-h-[250px] gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
                    <DollarSign className="h-4 w-4 text-brand-400" />
                  </span>
                  سعر الصرف المعتمد
                </div>
                <ExchangeRateForm exchangeRate={exchangeRate} />
              </div>
              <SubscriptionCard />
            </div>
          </CardContent>
        </Card>

        {/* Secondary metrics */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <OverviewCard
            title="الوجبات المعروضة"
            value={dishesCount}
            valueSuffix={`/ ${subscription.maxDishes}`}
            subtext={
              <p className="text-slate-500">
                متبقي{" "}
                <span className="font-extrabold text-brand-700">
                  {subscription.maxDishes - dishesCount}
                </span>{" "}
                وجبات
              </p>
            }
            icon={Utensils}
          />
          <OverviewCard
            title="زيارات المنيو هذا الشهر"
            value="1,420"
            subtext={
              <p className="flex items-center gap-1.5 font-bold text-emerald-700">
                <ArrowUpRight className="h-3.5 w-3.5" />
                +18% مسحات QR جديدة
              </p>
            }
            icon={QrCode}
          />
          <OverviewCard
            title="حالة المنيو"
            value="مفعّل"
            subtext={
              <p className="font-bold text-emerald-700">يظهر للعملاء الآن</p>
            }
            icon={CheckCircle2}
            iconBgColor="bg-emerald-50"
            iconColor="text-emerald-600"
          />
          <OverviewCard
            title="تحديث الأسعار"
            value="تلقائي"
            subtext={<p className="text-slate-500">حسب سعر الصرف الحالي</p>}
            icon={DollarSign}
          />
        </section>

        {/* Bottom workspace */}
        <section className="grid items-start gap-5 lg:grid-cols-[0.8fr_1.45fr]">
          <QrCardOverview />
          <div className="space-y-5">
            {subscription.isFree && (
              <SubscriptionIsFree daysLeft={subscription.daysLeft} />
            )}
            {/* Recent dishes */}
            <RecentDishes />
          </div>
        </section>
        {/* Footer hint */}
        <div className="flex items-center justify-center gap-2 pb-2 text-[10px] text-slate-400">
          <Clock3 className="h-3.5 w-3.5" />
          آخر البيانات المعروضة هي بيانات الحساب الحالية
        </div>
      </div>
    </main>
  );
}
