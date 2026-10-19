"use client";
import Image from "next/image";
import { Plus, Clock, Utensils } from "lucide-react";
import CardItemDes from "./CardItemDes";
import { useState } from "react";

interface GridItemsProps {
  lang: Lang;
  currentItems: Item[];
  ShowUsd: boolean;
  addToCart: (item: Item, qtyToAdd?: number) => void;
}

function GridItems({
  currentItems,
  lang,
  addToCart,
  ShowUsd,
}: GridItemsProps) {
  const [open, setOpen] = useState(false);
  const [selectedItemDetail, setSelectedItemDetail] = useState<Item | null>(
    null,
  );

  return (
    <div className="px-4 sm:px-8 max-w-5xl mx-auto min-h-[300px]">
      {currentItems.length === 0 ? (
        <div className="text-center py-20 text-slate-400 text-xs sm:text-sm bg-brand-100/50 rounded-[30px] border border-dashed border-brand-400 p-8">
          {lang === "ar"
            ? "لا توجد وجبات متاحة في هذا القسم حالياً."
            : "No items available in this category."}
        </div>
      ) : (
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {currentItems.map((item, index) => {
            return (
              <div
                key={item.id}
                onClick={() => {
                  setOpen(true);
                  setSelectedItemDetail(item);
                }}
                /* تم إزالة hover:-translate-y-1 و hover:shadow-lg الثقيلة وحصر الانتقال باللون والحدود فقط */
                className="min-w-0 bg-brand-100 p-3 sm:p-4 rounded-[30px] shadow-sm hover:border-brand-500/50 transition-colors duration-200 flex flex-col justify-between relative cursor-pointer border border-white/50 [contain:content]"
              >
                <div className="relative w-full h-40 sm:h-44 rounded-[18px] overflow-hidden bg-slate-100 dark:bg-slate-800/60 mb-3 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.nameAr}
                      fill
                      loading={index < 4 ? "eager" : "lazy"}
                      priority={index === 0}
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 300px"
                      /* تم إزالة group-hover:scale-105 لمنع إعادة الرسم الثقيل للصورة */
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 gap-1.5 select-none">
                      <Utensils className="w-8 h-8 opacity-60 stroke-[1.5]" />
                      <span className="text-[11px] font-medium tracking-wide">
                        بدون صورة
                      </span>
                    </div>
                  )}
                  {item.prepTime && item.isAvailable && (
                    <div className="absolute bottom-2.5 start-2.5 bg-slate-900/85 text-white px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 z-10">
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
                      {ShowUsd && item.priceUsd && (
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
                      /* تم تبسيط تأثير الزر ليقتصر على active:scale فقط */
                      className={`size-8 shrink-0 rounded-full flex items-center justify-center transition-transform ${
                        item.isAvailable
                          ? "bg-brand-500 text-white hover:bg-brand-600 active:scale-95"
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
        ShowUsd={ShowUsd}
      />
    </div>
  );
}

export default GridItems;