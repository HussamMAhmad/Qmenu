"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownUp } from "lucide-react";
import CardItem from "@/components/dashboard/items/CardItem";
import EmptyCard from "@/components/dashboard/items/EmptyCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

function SortItems({
  items,
  exchangeRate,
  categories,
}: {
  items: CreateItem[];
  exchangeRate: number;
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "default";
  const [value, setValue] = useState(currentSort);

  useEffect(() => {
    setValue(currentSort);
  }, [currentSort]);

  const handleSortChange = (sort: string) => {
    setValue(sort);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    params.set("available", sort);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm border border-slate-100">
        <div className="text-xs text-slate-500">
          عرض <span className="font-bold text-slate-800">{items.length}</span>{" "}
          من الوجبات
        </div>
        <Select dir="rtl" onValueChange={handleSortChange} value={value}>
  <SelectTrigger className="w-[180px] h-10 rounded-xl border-slate-200/80 bg-white px-3.5 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 focus:ring-2 focus:ring-brand-500/20 focus:ring-offset-0 cursor-pointer">
    <div className="flex items-center gap-2">
      <ArrowDownUp className="h-3.5 w-3.5 text-brand-600 shrink-0" />
      <SelectValue placeholder="ترتيب بحسب" />
    </div>
  </SelectTrigger>
  <SelectContent 
    position="popper" 
    className="rounded-2xl border border-slate-100 bg-white/95 p-1.5 shadow-xl backdrop-blur-md min-w-[180px]"
  >
    <SelectGroup className="space-y-0.5">
      <div className="px-2 py-1 text-[10px] font-extrabold text-slate-400">
        الترتيب
      </div>
      <SelectItem 
        value="default" 
        className="cursor-pointer rounded-xl text-xs font-bold text-slate-700 focus:bg-brand-50 focus:text-brand-700"
      >
        الافتراضي
      </SelectItem>
      <SelectItem 
        value="name-asc" 
        className="cursor-pointer rounded-xl text-xs font-bold text-slate-700 focus:bg-brand-50 focus:text-brand-700"
      >
        من أ إلى ي
      </SelectItem>
      <SelectItem 
        value="name-desc" 
        className="cursor-pointer rounded-xl text-xs font-bold text-slate-700 focus:bg-brand-50 focus:text-brand-700"
      >
        من ي إلى أ
      </SelectItem>
      <div className="my-1 border-t border-slate-100" />
      <div className="px-2 py-1 text-[10px] font-extrabold text-slate-400">
        حسب الحالة
      </div>
      <SelectItem 
        value="true" 
        className="cursor-pointer rounded-xl text-xs font-bold text-emerald-700 focus:bg-emerald-50 focus:text-emerald-800"
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>معروض</span>
        </div>
      </SelectItem>
      <SelectItem 
        value="false" 
        className="cursor-pointer rounded-xl text-xs font-bold text-slate-600 focus:bg-slate-100 focus:text-slate-900"
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span>غير معروض</span>
        </div>
      </SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
      </div>
      <div className="grid gap-3">
        {items.length === 0 ? (
          <EmptyCard />
        ) : (
          items.map((item) => {
            const category = categories.find(
              (cat) => item.categoryId === cat.id,
            );
            if (!category) return null;
            return (
              <CardItem
                item={item}
                category={category}
                categories={categories}
                exchangeRate={exchangeRate}
                key={item.id}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default SortItems;
