"use client";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CustomField from "@/components/forms/CustomField";
import CustomButton from "@/components/CustomButton";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@/lib/validation";
import { FormFieldType } from "@/lib/types";
import { TbCategoryPlus } from "react-icons/tb";
import { createCategory } from "@/actions/dashboard.actions";

function CreateCategories() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const form = useForm<z.infer<typeof Category>>({
    resolver: zodResolver(Category),
    defaultValues: { name: "" },
  });

  async function onSubmit(data: z.infer<typeof Category>) {
    setLoading(true);
    setErrorMessage(null);
    try {
      const result = await createCategory(data.name);
      if (result?.success) {
        form.reset();
        setOpen(false);
      } else {
        setErrorMessage(
          typeof result?.message === "string"
            ? result.message
            : "حدث خطأ أثناء إضافة القسم",
        );
      }
    } catch (e) {
      console.log("failed to create category ", e);
      setErrorMessage("حدث خطأ غير متوقع، يرجى المحاولة لاحقاً");
    } finally {
      setLoading(false);
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      form.reset();
      setErrorMessage(null);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="h-9 w-9 cursor-pointer rounded-xl border-slate-200 text-slate-600 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md rounded-2xl border-slate-100 bg-white p-6 shadow-xl">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <AlertDialogHeader className="text-right space-y-1.5">
            <AlertDialogTitle className="text-xl font-bold text-slate-900">
              إضافة قسم جديد
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-slate-500">
              أضف قسماً جديداً لتنظيم الوجبات داخل المنيو.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-2">
            <CustomField
              control={form.control}
              name="name"
              fieldtype={FormFieldType.INPUT}
              label="اسم القسم"
              placeholder="مثال: المشويات، المشروبات..."
              Icon={TbCategoryPlus}
            />
            {errorMessage && (
              <p className="text-sm text-red-500 font-medium text-right pt-1">
                {errorMessage}
              </p>
            )}
          </div>

          <AlertDialogFooter className="flex-row-reverse justify-start gap-3 pt-2">
            <CustomButton
              type="submit"
              isLoading={loading}
              className="cursor-pointer bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl px-5 h-10 transition-all shadow-sm shadow-brand-500/20"
            >
              إضافة القسم
            </CustomButton>

            <AlertDialogCancel className="cursor-pointer m-0 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 h-10 px-5">
              إلغاء
            </AlertDialogCancel>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CreateCategories;
