import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, Plus, Utensils } from "lucide-react";
import CreateItems from "../items/CreateItems";

function Header({ categories , exchangeRate}: { categories: Category[] , exchangeRate : number}) {
  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Utensils className="h-4 w-4" />
          </span>
          <span className="text-xs font-bold tracking-wide text-brand-700">
            MENU MANAGEMENT
          </span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
          الأقسام والوجبات
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          أدِر أقسام منيو مطعمك، أضف الوجبات وعدّل الأسعار والتوفر بسهولة، مع
          ظهور الأسعار بالليرة السورية حسب سعر الصرف المعتمد.
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Link href="/m/al-sultan" target="_blank" rel="noreferrer">
          <Button
            variant="outline"
            className="h-11 w-full gap-2 rounded-xl border-slate-200 bg-white font-bold hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 sm:w-auto"
          >
            <Eye className="h-4 w-4" />
            معاينة المنيو
          </Button>
        </Link>
        <CreateItems categories={categories} exchangeRate={exchangeRate}/>
      </div>
    </header>
  );
}

export default Header;
