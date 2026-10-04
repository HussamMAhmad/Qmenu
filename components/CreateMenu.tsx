import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { PartyPopper, ArrowLeft } from "lucide-react";
import { check } from "@/public/assets/index";
import Image from "next/image";

function CreateMenu({ resturantName }: { resturantName: string }) {
  const handleGoToDashboard = () => {
    redirect("/dashboard");
  };
  return (
    <AlertDialog open>
      <AlertDialogContent
        className="max-w-md border-emerald-500/20 bg-background/95 p-6 text-center shadow-xl backdrop-blur-md sm:rounded-2xl"
        dir="rtl"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
          <Image src={check} alt="check" width={300} height={300} />
        </div>

        <AlertDialogHeader className="mt-4 space-y-2 text-center sm:text-center">
          <AlertDialogTitle className="text-2xl font-bold tracking-tight text-foreground text-center">
            مُبارك! تم إنشاء مطعمك بنجاح
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base leading-relaxed text-muted-foreground text-center">
            أهلاً بك في منصة
            <span className="font-semibold text-emerald-600">
              {" "}
              {resturantName || "مطعمك"}
            </span>
            . يمكنك الآن البدء في إضافة الأقسام والأصناف وإنشاء القائمة الرقمية
            الخاصة بك.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 sm:justify-center">
          <AlertDialogAction
            onClick={handleGoToDashboard}
            className="cursor-pointer w-full gap-2 bg-emerald-600! py-5 text-base font-medium text-white transition-all hover:bg-emerald-700! active:scale-[0.98]!"
          >
            الانتقال إلى لوحة التحكم
            <ArrowLeft className="h-4 w-4" />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CreateMenu;
