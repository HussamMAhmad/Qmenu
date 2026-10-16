"use client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";

interface CarditemDes {
  open: boolean;
  setOpen: (open: boolean) => void;
  item: CreateItem | null;
  lang: Lang;
  addToCart: (item: CreateItem, qtyToAdd?: number) => void;
}

function CardItemDes({ open, setOpen, item, lang, addToCart }: CarditemDes) {
  const [detailQty, setDetailQty] = useState<number>(1);
  const DISH_IMAGES_POOL = [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80",
  ];
  const getItemImage = () => {
    if (item?.imageUrl && item.imageUrl.trim() !== "") {
      return item.imageUrl;
    }
    return DISH_IMAGES_POOL[0];
  };
  useEffect(() => {
    if (open) {
      setDetailQty(1);
    }
  }, [open, item]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg rounded-t-[2.5rem] sm:rounded-[30px] p-6 pt-9 gap-4 bg-brand-100 border border-brand-100">
        {item && (
          <>
            <DialogHeader className="p-0">
              <DialogTitle className="text-lg font-black text-start text-slate-900">
                {lang === "ar" ? item.nameAr : item.nameEn || item.nameAr}
              </DialogTitle>
            </DialogHeader>
            <div className="relative w-full h-56 rounded-[22px] overflow-hidden bg-slate-100">
              <Image
                src={getItemImage()}
                alt={item.nameAr}
                fill
                className="object-cover"
                onError={(e: any) => {
                  e.currentTarget.src = DISH_IMAGES_POOL[0];
                }}
              />
            </div>
            {item.description && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            )}
            <div className="flex items-center justify-between pt-3 gap-4 border-t border-brand-100">
              <div className="flex items-center gap-2 bg-brand-100/70 rounded-2xl p-1.5">
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
                className="flex-1 bg-brand-500 hover:bg-brand-600 text-white font-bold h-12 rounded-2xl text-xs sm:text-sm flex justify-between items-center px-5 shadow-lg shadow-brand-500/30"
              >
                <span>{lang === "ar" ? "إضافة للسلة" : "Add to Cart"}</span>
                <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm">
                  <span>
                    {(item.priceSyp * detailQty).toLocaleString()} ل.س
                  </span>
                  {item.priceUsd && (
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
