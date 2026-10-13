import { Button } from "@/components/ui/button";
import { QrCode, ExternalLink, Eye } from "lucide-react";
import Link from "next/link";
import QrSetting from "@/components/dashboard/qrCode/QrSetting";
import { getRestaurant, getSetting } from "@/lib/queries/dashboard";
import { getCurrentUser } from "@/lib/auth-helper";

export default async function QrCodePage() {
  const user = await getCurrentUser();
  const restaurant = await getRestaurant(user.id);
  const setting = await getSetting(user.id);
  const slug = restaurant?.slug;
  const menuUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/menu/${slug}`;
  const data = {
    qrColor: "#0f172a",
    qrLogo: null,
    qrSubtitle: "امسح الكود لتصفح القائمة",
  };

  const dataSetting = setting.data ?? data;

  return (
    <main
      dir="rtl"
      className="font-cairo min-h-screen bg-slate-50/60 px-2 py-4 text-slate-800 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1380px] space-y-8">
        {/* Header Section */}
        <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <QrCode className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold tracking-wide text-brand-700">
                QR MANAGEMENT
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              رمز QR الخاص بالمنيو
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              قم بتخصيص ألوان الشعار، ووصف الباركود، ثم حمله جاهزاً للطباعة.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link href={menuUrl} target="_blank" rel="noreferrer">
              <Button
                variant="outline"
                className="h-11 w-full gap-2 rounded-xl border-slate-200 bg-white font-bold hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 sm:w-auto cursor-pointer"
              >
                <Eye className="h-4 w-4" />
                معاينة المنيو
                <ExternalLink className="h-3.5 w-3.5 opacity-60" />
              </Button>
            </Link>
          </div>
        </header>
        <QrSetting menuUrl={menuUrl} setting={dataSetting} />
      </div>
    </main>
  );
}
