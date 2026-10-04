"use client";
import React from "react";
import CustomButton from "../CustomButton";
import CustomField from "../forms/CustomField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { exchangeRateOverview } from "@/lib/validation";
import { useState } from "react";
import { FormFieldType } from "@/lib/types";
import { ArrowLeft } from "lucide-react";

function ExchangeRateForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof exchangeRateOverview>>({
    resolver: zodResolver(exchangeRateOverview),
    defaultValues: {
      exchangeRate: 15000,
    },
  });

  const onSubmit = async (values: z.infer<typeof exchangeRateOverview>) => {};
  return (
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
        placeholder="15000"
      />
      <CustomButton
        isLoading={loading}
        className="w-full mt-4 py-6 px-6 rounded-xl font-bold text-white bg-brand-500 hover:bg-brand-600 active:bg-brand-700 focus:ring-4 focus:ring-brand-100 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 disabled:opacity-70 cursor-pointer"
      >
        <span>حفظ </span>
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      </CustomButton>
    </form>
  );
}

export default ExchangeRateForm;
