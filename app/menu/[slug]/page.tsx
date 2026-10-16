import PublicMenu from "@/components/menu/PublicMenu";
import { Toaster } from "sonner";
import { getMenu } from "@/lib/queries/menu";
import { notFound } from "next/navigation";

export default async function MenuPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
let restaurant;
  try{
    const data = await getMenu(slug);
 if (!data.success || !data.result) {
      notFound();
    }
    restaurant = data.result;
  }catch(e){
    console.log("failed to get data for menu" , e);
    notFound();
  }

  return (
    <>
      <div className="min-h-screen bg-brand-50 shadow-2xl border-x border-brand-100 max-sm:max-w-md sm:w-full mx-auto">
        <PublicMenu restaurant={restaurant} />
      </div>
      <Toaster
        position="top-center"
        dir="rtl"
        toastOptions={{
          className: "rounded-xl! border! border-slate-200! shadow-lg! dir-rtl",
          style: {
            backgroundColor: "#ffffff",
            color: "#0f172a",
          },
          classNames: {
            toast: "bg-white border-slate-200",
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
    </>
  );
}
