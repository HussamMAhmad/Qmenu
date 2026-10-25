"use client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Plus, Minus, Clock, Utensils } from "lucide-react";
import { useState, useEffect } from "react";
import { imgError } from "@/public/assets";

interface CarditemDes {
  open: boolean;
  setOpen: (open: boolean) => void;
  item: Item | null;
  lang: Lang;
  ShowUsd: boolean;
  addToCart: (item: Item, qtyToAdd?: number) => void;
}

function CardItemDes({
  open,
  setOpen,
  item,
  lang,
  addToCart,
  ShowUsd,
}: CarditemDes) {
  const [detailQty, setDetailQty] = useState<number>(1);
  useEffect(() => {
    if (open) {
      setDetailQty(1);
    }
  }, [open, item]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[calc(100%-1rem)] sm:max-w-lg max-h-[calc(100dvh-1rem)] overflow-y-auto rounded-2xl sm:rounded-[30px] p-4 sm:p-6 pt-8 sm:pt-9 gap-4 bg-brand-100 border border-brand-100 mx-auto">
        {item && (
          <>
            <DialogHeader className="pt-2">
              <DialogTitle className="text-base sm:text-lg font-black text-start text-slate-900 break-words">
                {lang === "ar" ? item.nameAr : item.nameEn || item.nameAr}
              </DialogTitle>
            </DialogHeader>
            <div className="relative w-full h-48 sm:h-72 rounded-[22px] overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.nameAr}
                  fill
                  sizes="(max-width: 360px) 100vw, (max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
                  className="object-contain"
                  unoptimized
                  loading="lazy"
                  quality={75}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 gap-1.5 select-none">
                  <Utensils className="h-8 w-8 opacity-60 stroke-[1.5]" />
                  <span className="text-xs font-medium tracking-wide">
                    بدون صورة
                  </span>
                </div>
              )}
              {item.prepTime && (
                <div className="absolute bottom-2.5 start-2.5 z-10 flex max-w-[calc(100%-1.25rem)] items-center gap-1.5 rounded-xl bg-slate-900/85 px-2.5 py-1.5 text-xs font-bold text-white shadow-sm backdrop-blur-md">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-brand-400" />
                  <span className="truncate">{item.prepTime}</span>
                </div>
              )}
            </div>
            {item.description && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-words">
                {item.description}
              </p>
            )}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-3 gap-3 sm:gap-4 border-t border-brand-100">
              <div className="flex items-center gap-2 bg-brand-100/70 rounded-2xl p-1.5 self-start sm:self-auto">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setDetailQty((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-xl bg-white shadow-xs"
                >
                  <Minus className="w-3.5 h-3.5" />
                </Button>
                <span className="text-sm font-black w-5 text-center">
                  {detailQty}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setDetailQty((q) => q + 1)}
                  className="w-8 h-8 rounded-xl bg-white shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
              <Button
                disabled={!item.isAvailable}
                onClick={() => {
                  addToCart(item, detailQty);
                  setOpen(false);
                }}
                className="w-full sm:flex-1 min-w-0 bg-brand-500 hover:bg-brand-600 text-white font-bold h-12 rounded-2xl text-xs sm:text-sm flex justify-between items-center px-3 sm:px-5 shadow-lg shadow-brand-500/30"
              >
                <span>{lang === "ar" ? "إضافة للسلة" : "Add to Cart"}</span>
                <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm whitespace-nowrap">
                  <span>
                    {(item.priceSyp * detailQty).toLocaleString()} ل.س
                  </span>
                  {ShowUsd && item.priceUsd && (
                    <>
                      <span className="opacity-50 font-normal">/</span>
                      <span className="text-brand-100 font-semibold">
                        ${(item.priceUsd * detailQty).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CardItemDes;
