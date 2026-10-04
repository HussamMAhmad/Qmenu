"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Utensils } from "lucide-react";
import { useState } from "react";

const dishes = [
    {
      name: "برغر السلطان الخاص",
      priceUSD: 4.5,
      category: "الوجبات الرئيسية",
      featured: true,
    },
    {
      name: "بيتزا مارغريتا وسط",
      priceUSD: 6,
      category: "البيتزا",
      featured: false,
    },
    {
      name: "بطاطا ويدجز عائلية",
      priceUSD: 2,
      category: "المقبلات",
      featured: false,
    },
  ];
  
function RecentDishes() {
      const [exchangeRate, setExchangeRate] = useState<number>(14000);
    
  return (
    <Card className="rounded-[28px] border-slate-200/70 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base font-black text-slate-950">
              أحدث الوجبات المعروضة
            </CardTitle>
            <CardDescription className="mt-1 text-xs">
              معاينة الأسعار وفق سعر الصرف الحالي
            </CardDescription>
          </div>

          <Link href="/dashboard/menu">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 rounded-xl text-xs font-bold text-brand-700 hover:bg-brand-50 hover:text-brand-700"
            >
              إدارة المنيو الكامل
              <ArrowLeft className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 p-3 sm:p-4">
        {dishes.map((dish) => (
          <div
            key={dish.name}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-transparent px-3 py-3.5 transition-all hover:border-brand-100 hover:bg-brand-50/30 sm:px-4"
          >
            <div className="flex min-w-0 items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-brand-700 group-hover:bg-brand-50">
                <Utensils className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="truncate text-sm font-extrabold text-slate-950">
                    {dish.name}
                  </h4>

                  {dish.featured && (
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[9px] font-bold text-brand-700">
                      الأكثر طلباً
                    </span>
                  )}
                </div>

                <p className="mt-1 text-[11px] text-slate-400">
                  {dish.category}
                </p>
              </div>
            </div>

            <div className="shrink-0 text-left">
              <p className="text-sm font-black text-slate-950">
                ${dish.priceUSD.toFixed(2)}
              </p>
              <p className="mt-1 text-xs font-bold text-brand-700">
                {(dish.priceUSD * exchangeRate).toLocaleString("en-US")} ل.س
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default RecentDishes;
