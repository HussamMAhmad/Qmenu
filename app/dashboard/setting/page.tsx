import Link from "next/link";
import { Eye, Store, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import RestaurantInfoForm from "@/components/dashboard/setting/RestaurantInfoForm";
import SecuritySection from "@/components/dashboard/setting/SecuritySection";
import { getSettingInfo } from "@/lib/queries/dashboard";
import { getCurrentUser } from "@/lib/auth-helper";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  const restaurant = await getSettingInfo(user.id);
  return (
    <main
      dir="rtl"
      className="font-cairo min-h-screen bg-[#f7f8fa] px-4 py-5 text-slate-800 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1380px] space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Store className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold tracking-wide text-brand-700">
                SETTINGS
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              إعدادات النظام
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              إدارة معلومات المطعم، تفضيلات العملة، وإعدادات الحساب والأمان.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link href="/m/al-sultan" target="_blank" rel="noreferrer">
              <Button
                variant="outline"
                className="h-11 w-full gap-2 rounded-xl border-slate-200 bg-white font-bold hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 sm:w-auto"
              >
                <Eye className="h-4 w-4" />
                معاينة المنيو
              </Button>
            </Link>
          </div>
        </header>
        <Card className="rounded-2xl border border-slate-200/80 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Store className="h-4 w-4 text-brand-600" />
              <span>المعلومات الأساسية والعملة</span>
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              اسم المطعم، الشعار، والتحكم بعرض الأسعار بالدولار.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RestaurantInfoForm initialData={restaurant} />
          </CardContent>
        </Card>
        <Card className="rounded-2xl border border-slate-200/80 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Shield className="h-4 w-4 text-brand-600" />
              <span>الحساب والأمان</span>
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              إدارة أمان حسابك وتغيير كلمة المرور.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SecuritySection />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
