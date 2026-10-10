"use client";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import CustomField from "@/components/forms/CustomField";
import CustomButton from "@/components/CustomButton";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@/lib/validation";
import { FormFieldType } from "@/lib/types";
import { updateCategory } from "@/actions/dashboard.actions";
import { BiCategory } from "react-icons/bi";
import { toast } from "sonner";

interface UpdateCategoriesProps {
  name: string;
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function UpdateCategories({
  name,
  id,
  open,
  onOpenChange,
}: UpdateCategoriesProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof Category>>({
    resolver: zodResolver(Category),
    defaultValues: { name },
  });

  async function onSubmit(data: z.infer<typeof Category>) {
    setLoading(true);
    try {
      const result = await updateCategory(data.name, id);
      if (result?.success) {
        form.reset();
        toast.success(result.message);
        onOpenChange(false);
      } else {
        toast.error(
          typeof result?.message === "string"
            ? result.message
            : "حدث خطأ أثناء تعديل القسم",
        );
      }
    } catch (e) {
      console.log("failed to create category ", e);
      toast.error("حدث خطأ غير متوقع، يرجى المحاولة لاحقاً");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open) {
      form.reset({ name });
    }
  }, [open, name, form]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md rounded-2xl border-slate-100 bg-white p-6 shadow-xl">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <AlertDialogHeader className="text-right space-y-1.5">
            <AlertDialogTitle className="text-xl font-bold text-slate-900">
              تعديل القسم
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-slate-500">
              قم بتعديل اسم القسم لتنظيم الوجبات داخل المنيو.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-2">
            <CustomField
              control={form.control}
              name="name"
              fieldtype={FormFieldType.INPUT}
              label="اسم القسم"
              placeholder="مثال: المشويات، المشروبات..."
              Icon={BiCategory }
            />
          </div>
          <AlertDialogFooter className="flex-row-reverse justify-start gap-3 pt-2">
            <CustomButton
              type="submit"
              isLoading={loading}
              className="cursor-pointer bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl px-5 h-10 transition-all shadow-sm shadow-brand-500/20"
            >
              حفظ التعديلات
            </CustomButton>
            <AlertDialogCancel
              onClick={() => onOpenChange(false)}
              className="cursor-pointer m-0 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 h-10 px-5"
            >
              إلغاء
            </AlertDialogCancel>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default UpdateCategories;
