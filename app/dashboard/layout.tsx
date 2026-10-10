import { redirect } from "next/navigation";
import DashboardLayoutContent from "@/components/dashboard/DashboardLayoutContent";
import { getRestaurant } from "@/lib/queries/dashboard";
import { getCurrentUser } from "@/lib/auth-helper";
import { Toaster } from "sonner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const restaurant = await getRestaurant(user.id);
  const restaurantName = restaurant?.name ?? "مطعم غير معروف";
  if (!restaurant) {
    redirect("/onboarding");
  }

  return (
    <DashboardLayoutContent
      restaurantName={restaurantName}
      userName={user.name || user.email}
    >
      {children}
      <Toaster
        position="bottom-center"
        dir="rtl"
        toastOptions={{
          className:
            "rounded-xl! border! border-slate-200! shadow-lg! dir-rtl",
          style: {
            backgroundColor: "#ffffff",
            color: "#0f172a",
          },
          classNames: {
            toast:
              "bg-white border-slate-200",
            title: "text-slate-900! font-semibold! text-sm!",
            description: "text-slate-500! text-xs!",
            actionButton:
              "bg-brand-600! text-white! rounded-lg! px-3! py-1! text-xs!",
            cancelButton:
              "bg-slate-100! text-slate-600! rounded-lg! px-3! py-1! text-xs!",
            success: "border-emerald-500/20! bg-emerald-50! text-emerald-900!",
            error: "border-rose-500/20! bg-rose-50! text-rose-900!",
          },
        }}
      />
    </DashboardLayoutContent>
  );
}
