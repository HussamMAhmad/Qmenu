"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Search, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Clock, 
  PhoneCall, 
  Utensils, 
  Globe, 
  Check, 
  Sparkles, 
  Heart, 
  Star, 
  Share2, 
  ArrowLeft, 
  LayoutGrid
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Item {
  id: string;
  nameAr: string;
  nameEn?: string | null;
  description?: string | null;
  priceSyp: number;
  priceUsd: number;
  prepTime?: string | null;
  imageUrl?: string | null;
  isAvailable: boolean;
  isFeatured?: boolean;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  items: Item[];
}

interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  whatsappNumber?: string | null;
  phone?: string | null;
  mapUrl?: string | null;
  showUSD: boolean;
  categories: Category[];
  coverImage?: string | null;
  qrSetting?: {
    qrLogo?: string | null;
    coverImage?: string | null;
  } | null;
}

interface CartItem extends Item {
  qty: number;
  notes?: string;
}

const DEFAULT_HERO_COVER = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop&q=80";

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

export default function PublicMenu({ restaurant }: { restaurant: Restaurant }) {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [currentCurrency, setCurrentCurrency] = useState<"syp" | "usd">("syp");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedItemDetail, setSelectedItemDetail] = useState<Item | null>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [itemNote, setItemNote] = useState<string>("");
  const [detailQty, setDetailQty] = useState<number>(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem(`qmenu_cart_${restaurant.id}`);
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { console.error(e); }
    }
  }, [restaurant.id]);

  useEffect(() => {
    localStorage.setItem(`qmenu_cart_${restaurant.id}`, JSON.stringify(cart));
  }, [cart, restaurant.id]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const addToCart = (item: Item, qtyToAdd: number = 1, notes: string = "") => {
    if (!item.isAvailable) return;
    
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + qtyToAdd, notes: notes || i.notes } : i
        );
      }
      return [...prev, { ...item, qty: qtyToAdd, notes }];
    });

    showToast(lang === "ar" ? `تمت إضافة "${item.nameAr}"` : `Added "${item.nameEn || item.nameAr}"`);
  };

  const increaseQty = (id: string) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  };

  const decreaseQty = (id: string) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const allItems = restaurant.categories.flatMap((cat) => cat.items);

  const getFilteredItems = () => {
    let items = allItems;

    if (activeCategory === "offers") {
      items = allItems.filter((i) => i.isFeatured);
    } else if (activeCategory !== "all") {
      items = allItems.filter((i) => i.categoryId === activeCategory);
    }

    if (searchQuery.trim() !== "") {
      items = items.filter((item) =>
        item.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.nameEn && item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return items;
  };

  const currentItems = getFilteredItems();

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPriceSyp = cart.reduce((sum, item) => sum + item.priceSyp * item.qty, 0);
  const totalPriceUsd = cart.reduce((sum, item) => sum + item.priceUsd * item.qty, 0);

  const shareOrderViaWhatsApp = () => {
    if (cart.length === 0 || !restaurant.whatsappNumber) return;

    let message = lang === "ar" 
      ? `مرحباً، أود طلب الأصناف التالية من ${restaurant.name}:\n\n`
      : `Hello, I would like to order from ${restaurant.name}:\n\n`;

    cart.forEach((item, index) => {
      const name = lang === "ar" ? item.nameAr : (item.nameEn || item.nameAr);
      const noteStr = item.notes ? ` (${lang === "ar" ? "ملاحظة" : "Note"}: ${item.notes})` : "";
      message += `${index + 1}. ${name} × ${item.qty}${noteStr}\n`;
    });

    message += `\n${lang === "ar" ? "المجموع الكلي" : "Total"}: ${totalPriceSyp.toLocaleString()} SYP`;
    if (restaurant.showUSD) {
      message += ` / $${totalPriceUsd.toFixed(2)}`;
    }

    window.open(`https://wa.me/${restaurant.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const coverImg = restaurant.coverImage || restaurant.qrSetting?.coverImage || DEFAULT_HERO_COVER;

  return (
    <div 
      className="min-h-screen bg-[var(--color-brand-50)] text-slate-900 font-cairo pb-32 max-w-md sm:max-w-xl md:max-w-4xl lg:max-w-6xl mx-auto relative shadow-2xl border-x border-brand-100 transition-all" 
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* 1. الترويسة الرئيسية */}
      <header className="relative w-full h-56 sm:h-64 lg:h-72 bg-slate-950 overflow-hidden">
        <Image 
          src={coverImg} 
          alt={restaurant.name} 
          fill 
          className="object-cover opacity-85"
          priority
          onError={(e: any) => { e.currentTarget.src = DEFAULT_HERO_COVER; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-50)] via-slate-950/20 to-black/50"></div>

        {/* أزرار التحكم العلوية */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center max-w-5xl mx-auto">
          <Button 
            size="icon" 
            variant="secondary" 
            onClick={() => window.history.back()}
            className="rounded-full w-10 h-10 bg-white/90 backdrop-blur-md shadow-md text-slate-800 hover:bg-white"
          >
            <ArrowLeft className={`w-4 h-4 ${lang === "en" ? "rotate-180" : ""}`} />
          </Button>

          <div className="flex-1 max-w-xs mx-3">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-500 absolute start-3 pointer-events-none" />
              <Input 
                type="text"
                placeholder={lang === "ar" ? `ابحث في ${restaurant.name}...` : `Search ${restaurant.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-9 pe-4 h-10 rounded-full bg-white/95 backdrop-blur-md border-0 text-xs shadow-lg focus-visible:ring-brand-500 text-slate-900 placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              size="icon" 
              variant="secondary" 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: restaurant.name, url: window.location.href }).catch(() => {});
                } else {
                  showToast(lang === "ar" ? "تم نسخ الرابط" : "Link copied");
                }
              }}
              className="rounded-full w-10 h-10 bg-white/90 backdrop-blur-md shadow-md text-slate-800 hover:bg-white"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="rounded-full bg-white/90 backdrop-blur-md border-0 text-slate-900 hover:bg-white text-xs px-3 h-10 shadow-md font-bold"
            >
              <Globe className="w-3.5 h-3.5 text-brand-500 me-1" />
              <span>{lang === "ar" ? "EN" : "عربي"}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* 2. بطاقة معلومات المطعم والشعار */}
      <div className="px-4 sm:px-8 -mt-12 relative z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 max-w-5xl mx-auto">
        <div className="flex items-end gap-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[var(--color-brand-100)] p-2 shadow-xl border-4 border-[var(--color-brand-50)] shrink-0 overflow-hidden">
            {restaurant.qrSetting?.qrLogo ? (
              <Image src={restaurant.qrSetting.qrLogo} alt={restaurant.name} width={112} height={112} className="object-cover w-full h-full rounded-2xl" onError={(e: any) => { e.currentTarget.src = DEFAULT_HERO_COVER; }} />
            ) : (
              <div className="w-full h-full bg-brand-50 rounded-2xl flex items-center justify-center text-brand-500">
                <Utensils className="w-10 h-10" />
              </div>
            )}
          </div>

          <div className="pb-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {restaurant.name}
            </h1>
            <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm">
              <div className="flex items-center gap-1 font-bold text-slate-900">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>4.8</span>
                <span className="text-slate-500 font-normal">(335+)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {restaurant.showUSD && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setCurrentCurrency(currentCurrency === "syp" ? "usd" : "syp")}
              className="rounded-full bg-[var(--color-brand-100)]/80 border-brand-100 text-slate-800 hover:bg-brand-100 text-xs px-4 py-2 font-bold shadow-xs"
            >
              {currentCurrency === "syp" ? "الدولار ($)" : "الليرة (ل.س)"}
            </Button>
          )}
          <Button 
            size="sm"
            className="rounded-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xs shadow-xs"
            onClick={() => showToast(lang === "ar" ? "جميع التقييمات ممتازة ⭐" : "All reviews are great ⭐")}
          >
            {lang === "ar" ? "التقييمات" : "See reviews"}
          </Button>
        </div>
      </div>

      {/* 3. شريط الأقسام السريع (تطبيق ألوان النيومورفيزم المناسبة لمجموعة البراند) */}
      <div className="sticky top-0 z-30 bg-[var(--color-brand-50)]/90 backdrop-blur-xl py-4 px-4 sm:px-8 border-b border-brand-100/60 shadow-xs mt-6">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex items-center gap-3.5 max-w-5xl mx-auto py-2 px-1">
            {/* زر جميع الأصناف */}
            <button
              onClick={() => setActiveCategory("all")}
              style={{
                borderRadius: "0.5em",
                backgroundColor: activeCategory === "all" ? "var(--color-brand-500)" : "var(--color-brand-100)",
                color: activeCategory === "all" ? "#ffffff" : "var(--color-brand-900)",
                border: activeCategory === "all" ? "1px solid var(--color-brand-500)" : "1px solid var(--color-brand-100)",
                boxShadow: activeCategory === "all" 
                  ? "4px 4px 12px rgba(230, 57, 32, 0.35)" 
                  : "6px 6px 12px rgba(230, 180, 165, 0.45), -6px -6px 12px #ffffff",
                padding: "0.7em 1.7em",
                fontSize: "15px",
                fontWeight: "800",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              className="flex items-center gap-2 shrink-0 active:scale-95"
            >
              <LayoutGrid className={`w-4 h-4 ${activeCategory === "all" ? "text-white" : "text-brand-900"}`} />
              <span>{lang === "ar" ? "جميع الأصناف" : "All Items"}</span>
            </button>

            {/* زر العروض الحصرية */}
            <button
              onClick={() => setActiveCategory("offers")}
              style={{
                borderRadius: "0.5em",
                backgroundColor: activeCategory === "offers" ? "var(--color-brand-600)" : "var(--color-brand-100)",
                color: activeCategory === "offers" ? "#ffffff" : "var(--color-brand-900)",
                border: activeCategory === "offers" ? "1px solid var(--color-brand-600)" : "1px solid var(--color-brand-100)",
                boxShadow: activeCategory === "offers" 
                  ? "4px 4px 12px rgba(244, 67, 54, 0.4)" 
                  : "6px 6px 12px rgba(230, 180, 165, 0.45), -6px -6px 12px #ffffff",
                padding: "0.7em 1.7em",
                fontSize: "15px",
                fontWeight: "800",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              className="flex items-center gap-2 shrink-0 active:scale-95"
            >
              <Sparkles className={`w-4 h-4 ${activeCategory === "offers" ? "text-amber-300 animate-pulse" : "text-brand-500"}`} />
              <span>{lang === "ar" ? "عروض حصرية 🔥" : "Exclusive Offers 🔥"}</span>
            </button>

            {/* أزرار الأقسام الديناميكية */}
            {restaurant.categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    borderRadius: "0.5em",
                    backgroundColor: isActive ? "var(--color-brand-500)" : "var(--color-brand-100)",
                    color: isActive ? "#ffffff" : "var(--color-brand-900)",
                    border: isActive ? "1px solid var(--color-brand-500)" : "1px solid var(--color-brand-100)",
                    boxShadow: isActive 
                      ? "4px 4px 12px rgba(230, 57, 32, 0.35)" 
                      : "6px 6px 12px rgba(230, 180, 165, 0.45), -6px -6px 12px #ffffff",
                    padding: "0.7em 1.7em",
                    fontSize: "15px",
                    fontWeight: "800",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  className="flex items-center gap-2 shrink-0 active:scale-95"
                >
                  <Utensils className={`w-4 h-4 ${isActive ? "text-white" : "text-brand-900"}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      {/* 4. عنوان القسم */}
      <div className="px-4 sm:px-8 mt-6 mb-4 max-w-5xl mx-auto">
        <h2 className="text-lg sm:text-xl font-black text-slate-900">
          {activeCategory === "all" 
            ? (lang === "ar" ? `جميع الأصناف في ${restaurant.name}` : `All Items in ${restaurant.name}`)
            : activeCategory === "offers"
            ? (lang === "ar" ? "العروض الحصرية وعروض العائلات" : "Exclusive & Family Offers")
            : restaurant.categories.find(c => c.id === activeCategory)?.name}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {lang === "ar" ? "قائمة شاملة لكافة الأطباق والمأكولات المتاحة حالياً للطلب السريع" : "A comprehensive available item list from this store"}
        </p>
      </div>

      {/* 5. شبكة الوجبات */}
      <div className="px-4 sm:px-8 max-w-5xl mx-auto">
        {currentItems.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-xs sm:text-sm bg-[var(--color-brand-100)]/50 rounded-[30px] border border-dashed border-brand-100 p-8 shadow-xs">
            {lang === "ar" ? "لا توجد وجبات متاحة في هذا القسم حالياً." : "No items available in this category."}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {currentItems.map((item, idx) => {
              const isFav = favorites.includes(item.id);
              const itemImg = getItemImage(item, idx);

              return (
                <div 
                  key={item.id}
                  onClick={() => {
                    setSelectedItemDetail(item);
                    setSelectedItemIndex(idx);
                    setDetailQty(1);
                    setItemNote("");
                  }}
                  style={{
                    borderRadius: "30px",
                    backgroundColor: "var(--color-brand-100)",
                    boxShadow: "15px 15px 30px rgba(215, 150, 135, 0.4), -15px -15px 30px #ffffff",
                  }}
                  className={`p-3.5 sm:p-4 hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 ease-out flex flex-col justify-between relative group cursor-pointer border border-white/50 ${
                    !item.isAvailable ? "opacity-60 bg-gray-100" : ""
                  }`}
                >
                  {/* صورة الصنف */}
                  <div className="relative w-full h-36 sm:h-44 rounded-[22px] overflow-hidden bg-white/60 mb-3 shadow-inner">
                    <Image 
                      src={itemImg} 
                      alt={item.nameAr} 
                      fill 
                      className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                      onError={(e: any) => { e.currentTarget.src = DISH_IMAGES_POOL[0]; }}
                    />

                    {/* زر المفضلة */}
                    <button 
                      onClick={(e) => toggleFavorite(e, item.id)}
                      className="absolute top-2.5 start-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-md hover:bg-white transition-all active:scale-90"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? "fill-red-500 text-red-500" : ""}`} />
                    </button>

                    {/* وقت التحضير */}
                    {item.prepTime && item.isAvailable && (
                      <div className="absolute bottom-2.5 start-2.5 bg-slate-900/85 backdrop-blur-md text-white px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 shadow-md">
                        <Clock className="w-3 h-3 text-brand-400" />
                        <span>{item.prepTime}</span>
                      </div>
                    )}

                    {item.isFeatured && (
                      <div className="absolute top-2.5 end-2.5 bg-brand-500 text-white px-2.5 py-0.5 rounded-lg text-[9px] font-black shadow-md">
                        عرض خاص
                      </div>
                    )}

                    {!item.isAvailable && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 text-center">
                        <span className="text-white text-[10px] font-bold bg-red-600/90 px-2.5 py-1 rounded-full">
                          {lang === "ar" ? "غير متوفر" : "Out of Stock"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* التفاصيل والأسعار */}
                  <div className="flex-1 flex flex-col justify-between space-y-2 px-1">
                    <div>
                      <h3 className="font-black text-xs sm:text-sm text-slate-900 truncate">
                        {lang === "ar" ? item.nameAr : (item.nameEn || item.nameAr)}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-amber-700 font-bold mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>4.8</span>
                        <span className="text-slate-500 font-normal">(22+)</span>
                      </div>
                      <p className="text-[10px] text-brand-700 font-semibold mt-1">
                        {lang === "ar" ? "توصيل مجاني فوق 26$" : "$0 Delivery fee over $26"}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-brand-200/60 flex items-center justify-between">
                      <div className="font-black text-sm sm:text-base text-slate-900">
                        {currentCurrency === "syp" ? (
                          <>{item.priceSyp.toLocaleString()} <span className="text-[10px] font-normal text-slate-600">ل.س</span></>
                        ) : (
                          <>${item.priceUsd.toFixed(2)}</>
                        )}
                      </div>

                      <button 
                        disabled={!item.isAvailable}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item, 1);
                        }}
                        className={`w-8.5 h-8.5 rounded-full flex items-center justify-center transition-all ${
                          item.isAvailable 
                            ? "bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/40 active:scale-90" 
                            : "bg-slate-300 text-slate-500 cursor-not-allowed"
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
      </div>

      {/* 6. شريط السلة العائم */}
      {totalQty > 0 && (
        <div 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-lg bg-brand-500 text-white py-4 px-6 rounded-full shadow-2xl flex items-center justify-between cursor-pointer z-40 hover:scale-[1.02] active:scale-98 transition-transform border border-brand-400/30"
        >
          <div className="flex items-center gap-3">
            <span className="text-base sm:text-lg font-black tracking-tight">
              {lang === "ar" ? "عرض السلة" : "View your cart"}
            </span>
            <span className="bg-black/20 text-white text-xs font-black px-2.5 py-0.5 rounded-full">
              {totalQty}x
            </span>
          </div>

          <div className="text-lg sm:text-xl font-black">
            {currentCurrency === "syp" ? `${totalPriceSyp.toLocaleString()} SYP` : `$${totalPriceUsd.toFixed(2)}`}
          </div>
        </div>
      )}

      {/* 7. نافذة تفاصيل الوجبة */}
      <Dialog open={!!selectedItemDetail} onOpenChange={(open) => !open && setSelectedItemDetail(null)}>
        <DialogContent className="sm:max-w-lg rounded-t-[2.5rem] sm:rounded-[30px] p-6 gap-4 bg-[var(--color-brand-50)] border border-brand-100">
          {selectedItemDetail && (
            <>
              <DialogHeader className="p-0">
                <DialogTitle className="text-lg font-black text-start text-slate-900">
                  {lang === "ar" ? selectedItemDetail.nameAr : (selectedItemDetail.nameEn || selectedItemDetail.nameAr)}
                </DialogTitle>
              </DialogHeader>

              <div className="relative w-full h-56 rounded-[22px] overflow-hidden bg-slate-100">
                <Image 
                  src={getItemImage(selectedItemDetail, selectedItemIndex)} 
                  alt={selectedItemDetail.nameAr} 
                  fill 
                  className="object-cover"
                  onError={(e: any) => { e.currentTarget.src = DISH_IMAGES_POOL[0]; }}
                />
              </div>

              {selectedItemDetail.description && (
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedItemDetail.description}
                </p>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 block">
                  {lang === "ar" ? "ملاحظات إضافية:" : "Special Instructions:"}
                </label>
                <Input
                  value={itemNote}
                  onChange={(e) => setItemNote(e.target.value)}
                  placeholder={lang === "ar" ? "مثال: بدون بصل، زيادة صوص..." : "e.g. No onions, extra sauce..."}
                  className="text-xs h-11 rounded-2xl bg-white border-brand-100"
                />
              </div>

              <div className="flex items-center justify-between pt-3 gap-4 border-t border-brand-100">
                <div className="flex items-center gap-2 bg-brand-100/70 rounded-2xl p-1.5">
                  <Button size="icon" variant="ghost" onClick={() => setDetailQty((q) => Math.max(1, q - 1))} className="w-8 h-8 rounded-xl bg-white shadow-xs">
                    <Minus className="w-3.5 h-3.5" />
                  </Button>
                  <span className="text-sm font-black w-5 text-center">{detailQty}</span>
                  <Button size="icon" variant="ghost" onClick={() => setDetailQty((q) => q + 1)} className="w-8 h-8 rounded-xl bg-white shadow-xs">
                    <Plus className="w-3.5 h-3.5" />
                  </Button>
                </div>

                <Button
                  disabled={!selectedItemDetail.isAvailable}
                  onClick={() => {
                    addToCart(selectedItemDetail, detailQty, itemNote);
                    setSelectedItemDetail(null);
                  }}
                  className="flex-1 bg-brand-500 hover:bg-brand-600 text-white font-bold h-12 rounded-2xl text-xs sm:text-sm flex justify-between items-center px-5 shadow-lg shadow-brand-500/30"
                >
                  <span>{lang === "ar" ? "إضافة للسلة" : "Add to Cart"}</span>
                  <span className="font-black text-sm sm:text-base">
                    {currentCurrency === "syp" 
                      ? `${(selectedItemDetail.priceSyp * detailQty).toLocaleString()} SYP` 
                      : `$${(selectedItemDetail.priceUsd * detailQty).toFixed(2)}`}
                  </span>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* 8. نافذة السلة التفصيلية */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent side="bottom" className="rounded-t-[2.5rem] sm:max-w-lg sm:mx-auto p-6 max-h-[85vh] flex flex-col bg-[var(--color-brand-50)] border-t border-brand-100">
          <SheetHeader className="text-start pb-3 border-b border-brand-100">
            <SheetTitle className="text-lg font-black text-slate-900">
              {lang === "ar" ? "سلة الطلبات" : "Your Cart"}
            </SheetTitle>
          </SheetHeader>

          <ScrollArea className="flex-1 my-3 pe-1">
            {cart.length === 0 ? (
              <p className="text-center text-xs text-slate-400 py-12">
                {lang === "ar" ? "السلة فارغة حالياً" : "Your cart is empty"}
              </p>
            ) : (
              <div className="space-y-3">
                {cart.map((item, idx) => (
                  <div key={item.id} className="flex items-center gap-3 bg-[var(--color-brand-100)]/70 p-3 rounded-2xl border border-brand-100">
                    <div className="w-14 h-14 rounded-xl overflow-hidden relative bg-slate-200 shrink-0">
                      <Image 
                        src={getItemImage(item, idx)} 
                        alt={item.nameAr} 
                        fill 
                        className="object-cover" 
                        onError={(e: any) => { e.currentTarget.src = DISH_IMAGES_POOL[0]; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {lang === "ar" ? item.nameAr : (item.nameEn || item.nameAr)}
                      </h4>
                      {item.notes && <p className="text-[10px] text-brand-600 font-medium truncate">📝 {item.notes}</p>}
                      <div className="text-xs font-black text-brand-600 mt-0.5">
                        {currentCurrency === "syp" ? `${(item.priceSyp * item.qty).toLocaleString()} SYP` : `$${(item.priceUsd * item.qty).toFixed(2)}`}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white rounded-xl p-1 border border-brand-100">
                      <Button size="icon" variant="ghost" onClick={() => decreaseQty(item.id)} className="w-6 h-6 rounded-lg text-slate-500">
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                      <Button size="icon" variant="ghost" onClick={() => increaseQty(item.id)} className="w-6 h-6 rounded-lg text-brand-500">
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {cart.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-brand-100">
              <div className="flex justify-between items-center text-sm sm:text-base font-black text-slate-900">
                <span>{lang === "ar" ? "المجموع الكلي:" : "Total Amount:"}</span>
                <span className="text-brand-600 text-lg">
                  {currentCurrency === "syp" ? `${totalPriceSyp.toLocaleString()} SYP` : `$${totalPriceUsd.toFixed(2)}`}
                </span>
              </div>

              {restaurant.whatsappNumber && (
                <Button 
                  onClick={shareOrderViaWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl text-xs sm:text-sm shadow-xl shadow-emerald-900/20 flex justify-center items-center gap-2"
                >
                  {lang === "ar" ? "إرسال الطلب عبر الواتساب" : "Send Order via WhatsApp"} <PhoneCall className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

    </div>
  );
}