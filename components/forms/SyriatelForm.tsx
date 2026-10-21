"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Receipt, ArrowLeft, ShieldCheck } from "lucide-react";
import CustomField from "./CustomField";
import CustomButton from "../CustomButton";
import { SyriatelSchema } from "@/lib/validation";
import { FormFieldType } from "@/lib/types";
import { toast } from "sonner";
import { verifyAndActivateSubscription } from "@/actions/subscription.action";
import { useRouter } from "next/navigation";

interface SyriatelFormProps {
  planId?: string;
  onSuccess?: () => void;
}

export default function SyriatelForm({ planId, onSuccess }: SyriatelFormProps) {
    const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof SyriatelSchema>>({
    resolver: zodResolver(SyriatelSchema),
    defaultValues: {
      transaction: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SyriatelSchema>) => {
    setLoading(true);
    try {
    } catch {
      toast.error("حدث خطأ غير متوقع في الاتصال بالسيرفر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
      dir="rtl"
    >
      <CustomField
        control={form.control}
        name="transaction"
        fieldtype={FormFieldType.INPUT}
        label="رقم عملية التحويل (Transaction ID)"
        placeholder="مثال: 600100002"
        Icon={Receipt}
      />

      <CustomButton
        isLoading={loading}
        className="w-full mt-4 py-6 px-6 rounded-xl font-bold text-white bg-brand-500 hover:bg-brand-600 active:bg-brand-700 focus:ring-4 focus:ring-brand-100 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 disabled:opacity-70 cursor-pointer"
      >
        <ShieldCheck className="w-5 h-5" />
        <span>تأكيد الدفع وتفعيل الاشتراك فوراً</span>
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      </CustomButton>
    </form>
  );
}
