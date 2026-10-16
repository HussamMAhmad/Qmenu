"use client";
import Image from "next/image";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Plus, Minus, PhoneCall } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface CartInfoProps {
  lang: Lang;
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  restaurant: RestaurantMenu;
}

function CartInfo({
  lang,
  cart,
  restaurant,
  setCart,
}: CartInfoProps) {
  const DISH_IMAGES_POOL = [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80",
  ];
  const getItemImage = (item: CreateItem, index: number) => {
    if (item.imageUrl && item.imageUrl.trim() !== "") {
      return item.imageUrl;
    }
    return DISH_IMAGES_POOL[index % DISH_IMAGES_POOL.length];
  };

  const totalPriceSyp = cart.reduce(
    (sum, item) => sum + item.priceSyp * item.qty,
    0,
  );
  const totalPriceUsd = cart.reduce(
    (sum, item) => sum + item.priceUsd * item.qty,
    0,
  );

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
        className="rounded-t-[2.5rem] sm:max-w-lg sm:mx-auto p-6 max-h-[85vh] flex flex-col bg-brand-100 border-t border-brand-200 shadow-2xl overflow-hidden"
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
              {cart.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-brand-200/60 shadow-xs"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden relative bg-brand-200/60 shrink-0">
                    <Image
                      src={getItemImage(item, idx)}
                      alt={item.nameAr}
                      fill
                      className="object-cover"
                      onError={(e: any) => {
                        e.currentTarget.src = DISH_IMAGES_POOL[0];
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-brand-900 truncate">
                      {lang === "ar" ? item.nameAr : item.nameEn || item.nameAr}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs font-black text-brand-700 mt-0.5">
                      <span>
                        {(item.priceSyp * item.qty).toLocaleString()}{" "}
                        <span className="text-[10px] font-medium opacity-80">
                          ل.س
                        </span>
                      </span>
                      {item.priceUsd && (
                        <>
                          <span className="opacity-40 font-normal">/</span>
                          <span className="text-brand-600">
                            ${(item.priceUsd * item.qty).toFixed(2)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-brand-50 rounded-xl p-1 border border-brand-200">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => decreaseQty(item.id)}
                      className="w-6 h-6 rounded-lg text-brand-700 hover:bg-brand-200/50"
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
                      className="w-6 h-6 rounded-lg text-brand-700 hover:bg-brand-200/50"
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
            <div className="flex justify-between items-center text-sm sm:text-base font-black text-brand-900">
              <span>{lang === "ar" ? "المجموع الكلي:" : "Total Amount:"}</span>
              <div className="flex items-center gap-1.5 text-sm sm:text-base font-black">
                <span className="text-brand-900">
                  {totalPriceSyp.toLocaleString()}{" "}
                  <span className="text-xs font-medium text-brand-700">
                    ل.س
                  </span>
                </span>
                {totalPriceUsd > 0 && (
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
