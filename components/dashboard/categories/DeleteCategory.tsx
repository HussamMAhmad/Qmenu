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
} from "@/components/ui/alert-dialog";
import CustomButton from "@/components/CustomButton";
import { deleteCategory } from "@/actions/dashboard.actions";

interface DeleteCategoryProps {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteCategory({ id, open, onOpenChange }: DeleteCategoryProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleDelete() {
    setLoading(true);
    setErrorMessage(null);

    try {
      const result = await deleteCategory(id);
      if (result?.success) {
        onOpenChange(false);
      } else {
        setErrorMessage(
          typeof result?.message === "string"
            ? result.message
            : "حدث خطأ أثناء حذف القسم"
        );
      }
    } catch (e) {
      console.error("failed to delete category", e);
      setErrorMessage("حدث خطأ غير متوقع، يرجى المحاولة لاحقاً");
    } finally {
      setLoading(false);
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      setErrorMessage(null);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="max-w-md rounded-2xl border-slate-100 bg-white p-6 shadow-xl">
        <AlertDialogHeader className="text-right space-y-1.5">
          <AlertDialogTitle className="text-xl font-bold text-slate-900">
            تأكيد حذف القسم
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-slate-500">
            هل أنت تأكد من رغبتك في حذف هذا القسم؟ لا يمكنك التراجع عن هذا الإجراء لاحقاً.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {errorMessage && (
          <p className="text-sm text-red-500 font-medium text-right pt-2">
            {errorMessage}
          </p>
        )}

        <AlertDialogFooter className="flex-row-reverse justify-start gap-3 pt-4">
          <CustomButton
            onClick={handleDelete}
            isLoading={loading}
            className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl px-5 h-10 transition-all shadow-sm shadow-red-600/20"
          >
            حذف
          </CustomButton>
          <AlertDialogCancel
            onClick={() => handleOpenChange(false)}
            className="cursor-pointer m-0 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 h-10 px-5"
          >
            إلغاء
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteCategory;