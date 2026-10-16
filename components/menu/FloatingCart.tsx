"use client";
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import CartInfo from "./CartInfo";
import { Sheet } from "@/components/ui/sheet";

interface FloatingCart {
  lang: Lang;
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  restaurant: RestaurantMenu;
}

function FloatingCart({ lang, cart, setCart, restaurant }: FloatingCart) {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPriceSyp = cart.reduce(
    (sum, item) => sum + item.priceSyp * item.qty,
    0,
  );
  const totalPriceUsd = cart.reduce(
    (sum, item) => sum + item.priceUsd * item.qty,
    0,
  );
  
  if (totalQty === 0) return null;
  
  return (
    <>
      <div
        onClick={() => setIsCartOpen(true)}
        className={`fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-lg bg-brand-500 text-white py-3 px-4 sm:py-3.5 sm:px-6 rounded-full shadow-2xl shadow-brand-500/40 flex items-center justify-between gap-2 cursor-pointer z-40 hover:scale-[1.02] active:scale-98 transition-all duration-300 border border-brand-400/30 backdrop-blur-md animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out`}
      >
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <span className="text-xs sm:text-base font-black tracking-tight whitespace-nowrap">
            {lang === "ar" ? "عرض السلة" : "View your cart"}
          </span>
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow-xs">
            {totalQty}x
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1 font-black text-xs sm:gap-1.5 sm:text-base whitespace-nowrap">
          <span>
            {totalPriceSyp.toLocaleString()}{" "}
            <span className="text-[10px] sm:text-xs font-medium opacity-90">
              {lang === "ar" ? "ل.س" : "SYP"}
            </span>
          </span>
          {totalPriceUsd > 0 && (
            <>
              <span className="opacity-50 font-normal">/</span>
              <span className="text-brand-100 font-semibold text-xs sm:text-sm">
                ${totalPriceUsd.toFixed(2)}
              </span>
            </>
          )}
        </div>
      </div>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <CartInfo
          lang={lang}
          cart={cart}
          setCart={setCart}
          restaurant={restaurant}
        />
      </Sheet>
    </>
  );
}

export default FloatingCart;
