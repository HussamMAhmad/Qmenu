"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, Utensils, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { changeIsAvailable } from "@/actions/dashboard.actions";
import { useOptimistic, useTransition, useState } from "react";
import { toast } from "sonner";
import UpdateItem from "./UpdateItem";
import DeleteItem from "./DeleteIteme";

function CardItem({
  item,
  category,
  categories,
  exchangeRate,
}: {
  item: CreateItem;
  category: Category;
  categories: Category[];
  exchangeRate: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false); // حالة إظهار وإخفاء الوصف
  const [optimisticIsAvailable, setOptimisticIsAvailable] = useOptimistic(
    item.isAvailable,
    (current, newValue: boolean) => newValue,
  );

  async function handleShow() {
    const nextState = !optimisticIsAvailable;
    startTransition(async () => {
      setOptimisticIsAvailable(nextState);
      try {
        const result = await changeIsAvailable(
          nextState,
          item.id || "",
          item.categoryId,
        );
        if (result?.success) {
          toast.success(nextState ? "تم العرض بنجاح" : "تم الإخفاء بنجاح");
        } else {
          toast.error(result?.message || "حدث خطأ يرجى إعادة المحاولة");
        }
      } catch (e) {
        console.log("failed to change isAvailable", e);
        toast.error("حدث خطا يرجى اعادة المحاولة");
      }
    });
  }

  return (
    <Card className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Dish Info */}
          <div className="flex items-start gap-4 min-w-0 flex-1">
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-brand-600 transition-colors group-hover:bg-brand-50/50">
              <Utensils className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <div className="min-w-0 space-y-1 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="truncate text-base font-bold text-slate-900">
                  {item.nameAr}
                </h3>
                <Badge
                  variant="ghost"
                  className={`rounded-md px-2 py-0.5 text-[10px] font-bold border-none ${
                    optimisticIsAvailable
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {optimisticIsAvailable ? "متاح" : "غير متاح"}
                </Badge>
              </div>

              {/* Category & Prep Time */}
              <div className="flex items-center gap-3 flex-wrap">
                {category && (
                  <p className="text-[11px] font-semibold text-brand-600">
                    {category.name}
                  </p>
                )}
                
                {item.prepTime && (
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span>{item.prepTime} دقيقة</span>
                  </div>
                )}
              </div>
              {item.description && (
                <div className="pt-0.5">
                  <p
                    className={`text-xs text-slate-400 leading-relaxed transition-all ${
                      !isExpanded ? "line-clamp-1" : ""
                    }`}
                  >
                    {item.description}
                  </p>
                  {item.description.length > 60 && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="mt-1 cursor-pointer text-[10px] font-bold text-brand-600 hover:text-brand-700 transition-colors"
                    >
                      {isExpanded ? "عرض أقل" : "عرض المزيد"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3 sm:border-t-0 sm:pt-0 sm:border-r sm:pr-4">
            {/* Price Box */}
            <div className="min-w-[130px] rounded-xl bg-slate-50/80 px-3.5 py-2 text-right">
              <span className="text-xs text-slate-400 font-medium block">
                السعر
              </span>
              <div className="text-base font-extrabold text-slate-900">
                ${Number(item.priceUsd || 0).toFixed(2)}
              </div>
              <div className="text-xs font-bold text-brand-700">
                {Number(item.priceSyp || 0).toLocaleString("en-US")} ل.س
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                disabled={isPending}
                className={`cursor-pointer inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-bold transition ${
                  optimisticIsAvailable
                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                } ${isPending ? "opacity-60 cursor-not-allowed" : ""}`}
                title="تغيير حالة التوفر"
                onClick={handleShow}
              >
                {optimisticIsAvailable ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span className="hidden md:inline">متاح</span>
                  </>
                ) : (
                  <>
                    <X className="h-3.5 w-3.5" />
                    <span className="hidden md:inline">متوقف</span>
                  </>
                )}
              </Button>
              <UpdateItem
                categories={categories}
                exchangeRate={exchangeRate}
                item={item}
              />
              <DeleteItem id={item.id} catId={category.id} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default CardItem;