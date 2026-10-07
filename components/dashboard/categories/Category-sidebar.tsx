"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, MoreHorizontal, Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import CreateCategories from "./CreateCategories";
import EditCategories from "./EditCategories";

function CategorySidebar({ categories }: { categories: Category[] }) {
  const [selectedCategory, setSelectedCategory] = useState("الوجبات الرئيسية");

  return (
    <Card className="h-fit rounded-[28px] border-slate-200/70 bg-white shadow-sm">
      <CardHeader className="px-4 pb-2 pt-5">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-black text-slate-950">
              أقسام المنيو
            </CardTitle>
            <p className="mt-1 text-[11px] text-slate-400">
              اسحب لترتيب ظهور الأقسام
            </p>
          </div>

          <CreateCategories />
        </div>
      </CardHeader>

      <CardContent className="space-y-1.5 p-3">
        <button
          onClick={() => setSelectedCategory("الكل")}
          className={`cursor-pointer flex w-full items-center justify-between rounded-2xl px-3.5 py-3 text-right transition ${
            selectedCategory === "الكل"
              ? "bg-brand-500 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span
              className={`h-2 w-2 rounded-full ${
                selectedCategory === "الكل" ? "bg-white" : "bg-brand-400"
              }`}
            />
            <span className="text-sm font-bold">كل الوجبات</span>
          </div>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
              selectedCategory === "الكل"
                ? "bg-white/15 text-white"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {categories.length}
          </span>
        </button>

        {categories.map((category) => {
          const active = selectedCategory === category.name;
          return (
            <div
              key={category.id}
              className={`group flex items-center gap-2 rounded-2xl px-2.5 py-1.5 transition ${
                active ? "bg-brand-50" : "hover:bg-slate-50"
              }`}
            >
              <GripVertical className="h-4 w-4 shrink-0 text-slate-300 opacity-0 transition group-hover:opacity-100" />
              <button
                onClick={() => setSelectedCategory(category.name)}
                className="cursor-pointer flex min-w-0 flex-1 items-center justify-between gap-2 rounded-xl px-1 py-2 text-right"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      active ? "bg-brand-500" : "bg-slate-300"
                    }`}
                  />
                  <span
                    className={`truncate text-sm font-bold ${
                      active ? "text-brand-800" : "text-slate-600"
                    }`}
                  >
                    {category.name}
                  </span>
                </div>
                <span className="shrink-0 text-[10px] font-semibold text-slate-400">
                  {category.items.length}
                </span>
              </button>

              <button
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-300 opacity-0 transition hover:bg-white hover:text-slate-500 group-hover:opacity-100"
                aria-label={`خيارات ${category.name}`}
              >
                <EditCategories name={category.name} id={category.id} />
              </button>
            </div>
          );
        })}

        <div className="mt-3 border-t border-slate-100 pt-3">
          <div className="rounded-2xl bg-slate-50 p-3.5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-600" />
              <span className="text-xs font-extrabold text-slate-800">
                نصيحة سريعة
              </span>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">
              رتّب الأقسام حسب رحلة العميل داخل المنيو ليسهل الوصول إلى الوجبات
              الأكثر طلباً.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CategorySidebar;
