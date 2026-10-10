"use client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import CustomButton from "@/components/CustomButton";
import { deleteItem } from "@/actions/dashboard.actions";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DeleteCategoryProps {
  id?: string;
  catId: string;
}

function DeleteItem({ id, catId }: DeleteCategoryProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      const result = await deleteItem(id || "", catId);
      if (result?.success) {
        toast.success(result.message);
        setOpen(false);
      } else {
        toast.error(
          typeof result?.message === "string"
            ? result.message
            : "حدث خطأ أثناء حذف القسم",
        );
      }
    } catch (e) {
      console.error("failed to delete category", e);
      toast.error("حدث خطأ غير متوقع، يرجى المحاولة لاحقاً");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer h-9 w-9 rounded-xl border-slate-200 text-slate-600 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md rounded-2xl border-slate-100 bg-white p-6 shadow-xl">
        <AlertDialogHeader className="text-right space-y-1.5">
          <AlertDialogTitle className="text-xl font-bold text-slate-900">
            تأكيد حذف القسم
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-slate-500 text-start">
            هل أنت تأكد من رغبتك في حذف هذا القسم؟ لا يمكنك التراجع عن هذا
            الإجراء لاحقاً.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row-reverse justify-start gap-3 pt-4">
          <CustomButton
            onClick={handleDelete}
            isLoading={loading}
            className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl px-5 h-10 transition-all shadow-sm shadow-red-600/20"
          >
            حذف
          </CustomButton>
          <AlertDialogCancel
            onClick={() => setOpen(false)}
            className="cursor-pointer m-0 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 h-10 px-5"
          >
            إلغاء
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default DeleteItem;
