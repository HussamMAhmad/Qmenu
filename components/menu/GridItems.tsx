"use client";
import Image from "next/image";
import { Plus, Clock } from "lucide-react";
import CardItemDes from "./CardItemDes";
import { useState } from "react";

interface GridItemsProps {
  lang: Lang;
  currentItems: Item[];
  addToCart: (item: Item, qtyToAdd?: number) => void;
}

function GridItems({ currentItems, lang, addToCart }: GridItemsProps) {
  const [open, setOpen] = useState(false);
  const [selectedItemDetail, setSelectedItemDetail] =
    useState<Item | null>(null);

  const DISH_IMAGES_POOL = [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80",
  ];
  const getItemImage = (item: Item, index: number) => {
    if (item.imageUrl && item.imageUrl.trim() !== "") {
      return item.imageUrl;
    }
    return DISH_IMAGES_POOL[index % DISH_IMAGES_POOL.length];
  };

  return (
    <div className="px-4 sm:px-8 max-w-5xl mx-auto min-h-[300px]">
      {currentItems.length === 0 ? (
        <div className="text-center py-20 text-slate-400 text-xs sm:text-sm bg-brand-100/50 rounded-[30px] border border-dashed border-brand-400 p-8 shadow-xs">
          {lang === "ar"
            ? "لا توجد وجبات متاحة في هذا القسم حالياً."
            : "No items available in this category."}
        </div>
      ) : (
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {currentItems.map((item, idx) => {
            const itemImg = getItemImage(item, idx);
            return (
              <div
                key={item.id}
                onClick={() => {
                  setOpen(true);
                  setSelectedItemDetail(item);
                }}
                className={`min-w-0 bg-brand-100 p-3 sm:p-4 rounded-[30px] shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all duration-300 ease-out flex flex-col justify-between relative group cursor-pointer border border-white/50`}
              >
                <div className="relative w-full h-40 sm:h-44 rounded-[18px] overflow-hidden bg-white/60 mb-3">
                  <Image
                    src={itemImg}
                    alt={item.nameAr}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    onError={(e: any) => {
                      e.currentTarget.src = DISH_IMAGES_POOL[0];
                    }}
                  />
                  {item.prepTime && item.isAvailable && (
                    <div className="absolute bottom-2.5 start-2.5 bg-slate-900/85 backdrop-blur-md text-white px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 shadow-sm">
                      <Clock className="w-3 h-3 text-brand-400" />
                      <span>{item.prepTime}</span>
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1 flex flex-col justify-between space-y-2 px-0.5">
                  <div>
                    <h3 className="font-black text-xs sm:text-sm text-slate-900 line-clamp-2 break-words">
                      {lang === "ar" ? item.nameAr : item.nameEn || item.nameAr}
                    </h3>
                    {item.description && (
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 font-normal">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="pt-2.5 border-t border-brand-200/60 flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="font-black text-xs sm:text-sm text-slate-900">
                        {item.priceSyp.toLocaleString()}{" "}
                        <span className="text-[10px] font-medium text-slate-600">
                          ل.س
                        </span>
                      </span>
                      {item.priceUsd && (
                        <span className="text-[11px] font-bold text-brand-600">
                          ${item.priceUsd.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item, 1);
                      }}
                      className={`size-8 shrink-0 rounded-full flex items-center justify-center transition-all ${
                        item.isAvailable
                          ? "bg-brand-500 text-white hover:bg-brand-600 shadow-sm shadow-brand-500/30 active:scale-90"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <CardItemDes
        open={open}
        setOpen={setOpen}
        item={selectedItemDetail}
        lang={lang}
        addToCart={addToCart}
      />
    </div>
  );
}

export default GridItems;
