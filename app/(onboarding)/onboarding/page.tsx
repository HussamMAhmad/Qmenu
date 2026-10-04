import { Store, Info } from "lucide-react";
import OnboardingForm from "@/components/forms/OnBoardingForm";
import OnboardingHeroPanel from "@/components/forms/OnboardingHeroPanel";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function RestaurantOnboardingForm() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/login");
  }
  const restaurant = await prisma.restaurant.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });
  if (restaurant) {
    redirect("/dashboard");
  }
  return (
    <div className="w-full bg-white flex justify-center lg:justify-end relative">
      <OnboardingHeroPanel />
      <div className="min-h-screen my-auto text-slate-800 lg:w-[55%] sm:w-[70%] w-full flex flex-col py-6 px-2 sm:p-12 lg:p-16 overflow-y-auto">
        <div className="text-center mb-8 px-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 mb-4 shadow-sm border border-brand-100">
            <Store className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            تهيئة المطعم والمنيو
          </h1>
          <p className="mt-4 text-sm text-slate-500">
            خطوة واحدة تفصلك عن إطلاق المنيو الرقمي الخاص بمطعمك
          </p>
        </div>
        <OnboardingForm />
        <div className="text-center mt-6 text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <Info className="w-3.5 h-3.5" />
          يمكنك تعديل جميع هذه البيانات لاحقاً من لوحة تحكم المطعم
        </div>
      </div>
    </div>
  );
}
