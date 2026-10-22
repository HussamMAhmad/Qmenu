import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  DollarSign,
  ExternalLink,
  Eye,
  Menu,
  FolderKanban,
  Utensils,
  Plus,
  Settings,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SubscriptionCard from "@/components/dashboard/SubscriptionCard";
import { OverviewCard } from "@/components/dashboard/OverviewCard";
import QrCardOverview from "@/components/dashboard/QrCardOverview";
import SubscriptionIsFree from "@/components/dashboard/SubscriptionIsFree";
import ExchangeRateForm from "@/components/dashboard/ExchangeRateForm";
import { getRestaurant, getSetting } from "@/lib/queries/dashboard";
import { getCurrentUser } from "@/lib/auth-helper";
import { countItems } from "@/lib/queries/dashboard";
import dayjs from "dayjs";

export default async function DashboardOverviewPage() {
  const user = await getCurrentUser();
  const restaurant = await getRestaurant(user.id);
  const restaurantName = restaurant?.name ?? "مطعم غير معروف";
  const exchangeRate = Number(restaurant?.exchangeRate) ?? "0";
  const setting = await getSetting(user.id);
  const dishesCount = await countItems(user.id);
  const categoriesCount = restaurant?.categories.length ?? 0;
  const slug = restaurant?.slug ?? "";
  const menuUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/menu/${slug}`;
  const subscrption = restaurant?.subscriptions;
  
  let maxDishes = 0;
  if (subscrption?.status === "TRIAL") {
    maxDishes = 15;
  } else if (subscrption?.status === "ACTIVE") {
    maxDishes = 100;
  }
  
  const isTrial = subscrption?.status === "TRIAL";
  const now = dayjs();
  const renewal = dayjs(subscrption?.renewalDate);
  const daysLeft = Math.max(0, renewal.diff(now, "day"));

  return (
    <main className="min-h-screen bg-[#f7f8fa] px-2 py-4 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px] space-y-6">
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
            <Link href={menuUrl} target="_blank" rel="noreferrer">
              <Button className="h-[50px] w-full gap-2 rounded-2xl bg-brand-500 px-5 font-bold text-white shadow-sm hover:bg-brand-600 sm:w-auto">
                <Eye className="h-4 w-4" />
                معاينة المنيو
                <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </Button>
            </Link>
          </div>
        </header>

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
              <SubscriptionCard
                subscription={subscrption}
                dishesCount={dishesCount}
                maxDishes={maxDishes}
              />
            </div>
          </CardContent>
        </Card>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <OverviewCard
            title="الوجبات المعروضة"
            value={dishesCount}
            valueSuffix={`/ ${maxDishes}`}
            subtext={
              <p className="text-slate-500">
                متبقي{" "}
                <span className="font-extrabold text-brand-700">
                  {Math.max(0, maxDishes - dishesCount)}
                </span>{" "}
                وجبات
              </p>
            }
            icon={Utensils}
          />
          <OverviewCard
            title="الأقسام النشطة"
            value={categoriesCount}
            subtext={
              <p className="text-slate-500">
                متاحة في{" "}
                <span className="font-extrabold text-brand-700">
                  القائمة الرئيسية
                </span>
              </p>
            }
            icon={FolderKanban}
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

        <section className="grid items-start gap-5 lg:grid-cols-[0.8fr_1.45fr]">
          <QrCardOverview menuUrl={menuUrl} setting={setting.data} />
          
          <div className="space-y-5">
            {isTrial && <SubscriptionIsFree daysLeft={daysLeft} />}

            <div className="rounded-3xl border border-white/10 bg-white p-5 backdrop-blur-sm space-y-4 shadow-sm border-slate-200 bg-white">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-brand-600" />
                  إجراءات سريعة لإدارة المنيو
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link href="/dashboard/categories" className="block">
                  <Button
                    variant="outline"
                    className="w-full h-12 flex flex-col items-center justify-center gap-1 rounded-2xl border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 transition-all"
                  >
                    <Plus className="h-4 w-4 text-brand-600" />
                    إضافة وجبة جديدة
                  </Button>
                </Link>

                <Link href="/dashboard/setting" className="block">
                  <Button
                    variant="outline"
                    className="w-full h-12 flex flex-col items-center justify-center gap-1 rounded-2xl border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 transition-all"
                  >
                    <Settings className="h-4 w-4 text-slate-600" />
                    إعدادات المطعم
                  </Button>
                </Link>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="truncate">
                  <p className="text-[10px] text-slate-400">رابط المنيو العام الخاص بك</p>
                  <p className="text-xs font-mono text-brand-600 font-bold truncate">{slug}</p>
                </div>
                <Link href={menuUrl} target="_blank">
                  <Button size="sm" className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs gap-1 shadow-sm">
                    معاينة <ExternalLink className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-center gap-2 pb-2 text-[10px] text-slate-400">
          <Clock3 className="h-3.5 w-3.5" />
          آخر البيانات المعروضة هي بيانات الحساب الحالية
        </div>
      </div>
    </main>
  );
}