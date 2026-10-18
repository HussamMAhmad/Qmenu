"use client";
import Image from "next/image";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Plus, Minus, PhoneCall } from "lucide-react";
import { Dispatch, SetStateAction, useMemo } from "react";
import { imgError } from "@/public/assets";
interface CartInfoProps {
  lang: Lang;
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  restaurant: RestaurantMenu;
}

function CartInfo({ lang, cart, restaurant, setCart }: CartInfoProps) {
  const { totalPriceSyp, totalPriceUsd } = useMemo(() => {
    return cart.reduce(
      (acc, item) => ({
        totalPriceSyp: acc.totalPriceSyp + item.priceSyp * item.qty,
        totalPriceUsd: acc.totalPriceUsd + (item.priceUsd || 0) * item.qty,
      }),
      { totalPriceSyp: 0, totalPriceUsd: 0 },
    );
  }, [cart]);
  const increaseQty = (id: string) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
    );
  };

  const decreaseQty = (id: string) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    );
  };

  const shareOrderViaWhatsApp = () => {
    if (cart.length === 0 || !restaurant.whatsappNumber) return;

    let message =
      lang === "ar"
        ? `مرحباً، أود طلب الأصناف التالية من ${restaurant.name}:\n\n`
        : `Hello, I would like to order from ${restaurant.name}:\n\n`;

    cart.forEach((item, index) => {
      const itemName = lang === "ar" ? item.nameAr : item.nameEn || item.nameAr;
      message += `${index + 1}. ${itemName} (الكمية: ${item.qty}) - ${(item.priceSyp * item.qty).toLocaleString()} ل.س`;
      if (restaurant.showUSD && item.priceUsd) {
        message += ` / $${(item.priceUsd * item.qty).toFixed(2)}`;
      }
      message += `\n`;
    });

    message += `\n-------------------\n`;
    message += `${lang === "ar" ? "المجموع الكلي" : "Total"}: ${totalPriceSyp.toLocaleString()} ل.س`;
    if (restaurant.showUSD && totalPriceUsd > 0) {
      message += ` / $${totalPriceUsd.toFixed(2)}`;
    }

    window.open(
      `https://wa.me/${restaurant.whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <SheetContent
      side="bottom"
      className="w-full rounded-t-[2rem] sm:max-w-lg sm:mx-auto p-4 sm:p-6 max-h-[calc(100dvh-1rem)] flex flex-col bg-brand-100 border-t border-brand-200 shadow-2xl overflow-hidden"
    >
      <SheetHeader className="text-start pb-3 border-b border-brand-200/60 shrink-0">
        <SheetTitle className="text-lg font-black text-brand-900">
          {lang === "ar" ? "سلة الطلبات" : "Your Cart"}
        </SheetTitle>
      </SheetHeader>
      <div className="flex-1 min-h-0 overflow-y-auto my-3 pe-1 custom-sheet-scrollbar">
        {cart.length === 0 ? (
          <p className="text-center text-xs text-brand-600/70 py-12 font-bold">
            {lang === "ar" ? "السلة فارغة حالياً" : "Your cart is empty"}
          </p>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex min-w-0 items-center gap-2 sm:gap-3 bg-white/70 backdrop-blur-sm p-2 sm:p-3 rounded-2xl border border-brand-200/60 shadow-xs"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden relative bg-brand-200/60 shrink-0">
                  <Image
                    src={item.imageUrl || imgError}
                    alt={item.nameAr}
                    fill
                    loading="eager"
                    sizes="56px"
                    className="object-cover"
                    onError={(e: any) => {
                      e.currentTarget.src = imgError;
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs sm:text-sm text-brand-900 truncate">
                    {lang === "ar" ? item.nameAr : item.nameEn || item.nameAr}
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs font-black text-brand-700 mt-0.5">
                    <span>
                      {(item.priceSyp * item.qty).toLocaleString()}{" "}
                      <span className="text-[10px] font-medium opacity-80">
                        ل.س
                      </span>
                    </span>
                    {restaurant.showUSD && item.priceUsd && (
                      <>
                        <span className="opacity-40 font-normal">/</span>
                        <span className="text-brand-600">
                          ${(item.priceUsd * item.qty).toFixed(2)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1 bg-brand-50 rounded-xl p-1 border border-brand-200">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => decreaseQty(item.id)}
                    className="w-7 h-7 sm:w-6 sm:h-6 rounded-lg text-brand-700 hover:bg-brand-200/50"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="text-xs font-black w-4 text-center text-brand-900">
                    {item.qty}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => increaseQty(item.id)}
                    className="w-7 h-7 sm:w-6 sm:h-6 rounded-lg text-brand-700 hover:bg-brand-200/50"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {cart.length > 0 && (
        <div className="space-y-3 pt-3 border-t border-brand-200/60 shrink-0">
          <div className="flex flex-wrap justify-between items-center gap-2 text-sm sm:text-base font-black text-brand-900">
            <span>{lang === "ar" ? "المجموع الكلي:" : "Total Amount:"}</span>
            <div className="flex items-center gap-1.5 text-sm sm:text-base font-black whitespace-nowrap">
              <span className="text-brand-900">
                {totalPriceSyp.toLocaleString()}{" "}
                <span className="text-xs font-medium text-brand-700">ل.س</span>
              </span>
              {restaurant.showUSD && totalPriceUsd > 0 && (
                <>
                  <span className="opacity-40 font-normal">/</span>
                  <span className="text-brand-700">
                    ${totalPriceUsd.toFixed(2)}
                  </span>
                </>
              )}
            </div>
          </div>
          {restaurant.whatsappNumber && (
            <Button
              onClick={shareOrderViaWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl text-xs sm:text-sm shadow-xl shadow-emerald-900/20 flex justify-center items-center gap-2 transition-all active:scale-98"
            >
              {lang === "ar"
                ? "إرسال الطلب عبر الواتساب"
                : "Send Order via WhatsApp"}{" "}
              <PhoneCall className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </SheetContent>
  );
}

export default CartInfo;
