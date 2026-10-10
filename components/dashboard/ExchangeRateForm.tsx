"use client";
import React from "react";
import CustomButton from "../CustomButton";
import CustomField from "../forms/CustomField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { exchangeRateOverview } from "@/lib/validation";
import { FormFieldType } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import { updateExchangeRate } from "@/actions/dashboard.actions";
import { useOptimistic, useTransition } from "react";

function ExchangeRateForm({ exchangeRate }: { exchangeRate: number }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticExchangeRate, setOptimisticExchangeRate] = useOptimistic(
    exchangeRate,
    (current, newValue: number) => newValue,
  );
  const form = useForm<z.infer<typeof exchangeRateOverview>>({
    resolver: zodResolver(exchangeRateOverview),
    defaultValues: {
      exchangeRate,
    },
  });

  const onSubmit = async (values: z.infer<typeof exchangeRateOverview>) => {
    startTransition(async () => {
      setOptimisticExchangeRate(values.exchangeRate);
      try {
        const update = await updateExchangeRate(values.exchangeRate);
        if (!update) {
          console.log("failed to update the exchangeRate");
        }
      } catch (e) {
        console.log("failed to update the exchangeRate", e);
      }
    });
  };
  return (
    <>
      <div className="mt-5 flex items-end gap-3">
        <span className="text-5xl font-black tracking-tight sm:text-6xl">
          {optimisticExchangeRate.toLocaleString("en-US")}
        </span>
        <span className="mb-2 text-sm font-bold text-slate-400">ل.س / $</span>
      </div>
      <p className="mt-4 max-w-md text-xs leading-6 text-slate-400">
        يتم استخدام السعر الحالي تلقائياً لحساب أسعار المنيو بالليرة السورية
        فوراً للزبائن.
      </p>
      <div className="mt-6 flex max-w-sm items-center gap-2">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          dir="rtl"
        >
          <CustomField
            control={form.control}
            name="exchangeRate"
            fieldtype={FormFieldType.NUMBER}
            label="سعر صرف الدولار مقابل الليرة"
          />
          <CustomButton
            isLoading={isPending}
            className="w-full mt-4 py-6 px-6 rounded-xl font-bold text-white bg-brand-500 hover:bg-brand-600 active:bg-brand-700 focus:ring-4 focus:ring-brand-100 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 disabled:opacity-70 cursor-pointer"
          >
            <span>حفظ </span>
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </CustomButton>
        </form>
      </div>
    </>
  );
}

export default ExchangeRateForm;
