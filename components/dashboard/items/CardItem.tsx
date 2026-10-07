import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  Edit3,
  Trash2,
  Utensils,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function CardItem({item , category}) {
  return (
    <Card
      className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
    >
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Dish Info */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-brand-600 transition-colors group-hover:bg-brand-50/50">
              <Utensils className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="truncate text-base font-bold text-slate-900">
                  {item.nameAr}
                </h3>
                <Badge
                  variant="ghost"
                  className={`rounded-md px-2 py-0.5 text-[10px] font-bold border-none ${
                    item.isAvailable
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {item.isAvailable ? "متاح" : "غير متاح"}
                </Badge>
              </div>
              {category && (
                <p className="text-[11px] font-semibold text-brand-600">
                  {category.name}
                </p>
              )}
              {item.description && (
                <p className="line-clamp-1 max-w-xl text-xs text-slate-400">
                  {item.description}
                </p>
              )}
            </div>
          </div>
          {/* Price & Actions */}
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
            {/* Actions Group */}
            <div className="flex items-center gap-1.5">
              <button
                className={`inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-bold transition ${
                  item.isAvailable
                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                title="تغيير حالة التوفر"
              >
                {item.isAvailable ? (
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
              </button>
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-xl border-slate-200 text-slate-600 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                aria-label={`تعديل ${item.nameAr}`}
              >
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-xl border-slate-200 text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                aria-label={`حذف ${item.nameAr}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardItem;
