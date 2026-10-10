"use client";
import React, { useState, useEffect } from "react";
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
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign, Clock, FileText, Tag, Edit3 } from "lucide-react";
import CustomField from "@/components/forms/CustomField";
import CustomButton from "@/components/CustomButton";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateItemsSchema } from "@/lib/validation";
import { FormFieldType } from "@/lib/types";
import { TbCategoryPlus } from "react-icons/tb";
import { SelectItem } from "@/components/ui/select";
import { PiBowlFood } from "react-icons/pi";
import { updateItem } from "@/actions/dashboard.actions";
import { defaultFormItemValues } from "@/constants/index";

function UpdateItem({
  item,
  categories,
  exchangeRate,
}: {
  item: CreateItem;
  categories: Category[];
  exchangeRate: number;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof CreateItemsSchema>>({
    resolver: zodResolver(CreateItemsSchema),
    defaultValues: {
      nameAr: item.nameAr,
      nameEn: item.nameEn ?? undefined,
      description: item.description ?? undefined,
      priceSyp: item.priceSyp,
      priceUsd: item.priceUsd,
      prepTime: item.prepTime ?? undefined,
      isAvailable: item.isAvailable,
      categoryId: item.categoryId,
    },
  });
  useEffect(() => {
    if (open) {
      form.reset({
        nameAr: item.nameAr,
        nameEn: item.nameEn ?? undefined,
        description: item.description ?? undefined,
        priceSyp: item.priceSyp,
        priceUsd: item.priceUsd,
        prepTime: item.prepTime ?? undefined,
        isAvailable: item.isAvailable,
        categoryId: item.categoryId,
      });
    }
  }, [item, open, form]);
  const priceSypValue = form.watch("priceSyp");
  useEffect(() => {
    const numericSyp = Number(priceSypValue);
    if (!isNaN(numericSyp) && numericSyp > 0 && exchangeRate > 0) {
      const calculatedUsd = Number((numericSyp / exchangeRate).toFixed(2));
      form.setValue("priceUsd", calculatedUsd, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else if (!priceSypValue) {
      form.setValue("priceUsd", "" as unknown as number);
    }
  }, [priceSypValue, exchangeRate, form]);

  async function onSubmit(data: z.infer<typeof CreateItemsSchema>) {
    setLoading(true);
    try {
      const result = await updateItem(data, item.id || "");
      if (result?.success) {
        form.reset();
        setOpen(false);
        toast.success(result.message);
      } else {
        toast.error(
          typeof result?.message === "string"
            ? result.message
            : "حدث خطأ أثناء تعديل الوجبة",
        );
      }
    } catch (e) {
      console.log("failed to create item ", e);
      toast.error("حدث خطأ غير متوقع، يرجى المحاولة لاحقاً");
    } finally {
      setLoading(false);
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      form.reset();
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer h-9 w-9 rounded-xl border-slate-200 text-slate-600 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
        >
          <Edit3 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[95vw] sm:max-w-2xl max-h-[90vh] rounded-2xl border-slate-100 bg-white p-4 sm:p-6 shadow-xl flex flex-col my-auto overflow-hidden">
        <AlertDialogHeader className="text-right space-y-1 pb-3 border-b border-slate-100 shrink-0">
          <AlertDialogTitle className="text-lg sm:text-xl font-bold text-slate-900">
           تعديل الوجبة
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs sm:text-sm text-slate-500">
           قم بتعديل تفاصيل الوجبة والحفظ لتحديث القائمة.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto space-y-4 py-3 px-1 min-h-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          translate="no"
        >
          <CustomField
            control={form.control}
            name="categoryId"
            fieldtype={FormFieldType.SELECT}
            label="القسم الرئيسي"
            placeholder="اختر القسم الذي تنتمي له الوجبة..."
            Icon={TbCategoryPlus}
          >
            {categories.map((cat) => (
              <SelectItem
                key={cat.id}
                value={cat.id}
                className="cursor-pointer rounded-lg py-2 text-sm text-slate-700 font-medium transition-colors focus:bg-brand-50 focus:text-brand-600 focus:outline-none"
              >
                {cat.name}
              </SelectItem>
            ))}
          </CustomField>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <CustomField
              control={form.control}
              name="nameAr"
              fieldtype={FormFieldType.INPUT}
              label="اسم الوجبة (عربي)"
              placeholder="مثال: سلطة سيزر"
              Icon={PiBowlFood}
            />
            <CustomField
              control={form.control}
              name="nameEn"
              fieldtype={FormFieldType.INPUT}
              label="اسم الوجبة (إنجليزي)"
              placeholder="مثال: Caesar Salad"
              Icon={Tag}
            />
          </div>
          <CustomField
            control={form.control}
            name="description"
            fieldtype={FormFieldType.INPUT}
            label="الوصف"
            placeholder="مكونات الوجبة أو التفاصيل..."
            Icon={FileText}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <CustomField
              control={form.control}
              name="priceSyp"
              fieldtype={FormFieldType.NUMBER}
              label="السعر (ل.س)"
              placeholder="0"
              Icon={DollarSign}
            />
            <CustomField
              control={form.control}
              name="priceUsd"
              fieldtype={FormFieldType.NUMBER}
              label="السعر ($)"
              placeholder="0.00"
              Icon={DollarSign}
            />
            <CustomField
              control={form.control}
              name="prepTime"
              fieldtype={FormFieldType.INPUT}
              label="وقت التحضير"
              placeholder="مثال: 15 دقيقة"
              Icon={Clock}
            />
          </div>
          <div className="pt-1">
            <CustomField
              control={form.control}
              name="isAvailable"
              fieldtype={FormFieldType.CHECKBOX}
              label="متاح للطلب والعرض في القائمة"
            />
          </div>
          <AlertDialogFooter className="flex flex-col-reverse sm:flex-row-reverse sm:justify-start gap-2 sm:gap-3 pt-3 border-t border-slate-100 shrink-0">
            <CustomButton
              type="submit"
              isLoading={loading}
              className="w-full sm:w-auto cursor-pointer bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl px-5 h-10 transition-all shadow-sm shadow-brand-500/20"
            >
              حفظ الوجبة
            </CustomButton>
            <AlertDialogCancel className="w-full sm:w-auto cursor-pointer m-0 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 h-10 px-5">
              إلغاء
            </AlertDialogCancel>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default UpdateItem;
