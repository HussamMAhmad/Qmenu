import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LayoutGrid, Utensils, Sparkles } from "lucide-react";

interface CategoriesTitlesProps {
  restaurant: RestaurantMenu;
  lang: Lang;
  activeCategory: string;
  setActiveCategory: (activeCategory: string) => void;
}

function CategoriesTitles({
  lang,
  activeCategory,
  restaurant,
  setActiveCategory,
}: CategoriesTitlesProps) {
  return (
    <>
      <div className="sticky top-0 z-30 bg-brand-50/90 backdrop-blur-xl py-4 px-4 sm:px-8 border-b border-brand-100/60 shadow-xs mt-6">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex items-center gap-3.5 max-w-5xl mx-auto py-2 px-1">
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex items-center gap-2 shrink-0 active:scale-95 rounded-[0.5em] py-[0.7em] px-[1.7em] text-[15px] font-[800] cursor-pointer transition-all duration-300 border ${
                activeCategory === "all"
                  ? "bg-brand-500 text-white border-brand-500 shadow-[4px_4px_12px_rgba(230,57,32,0.35)]"
                  : "bg-brand-100 text-brand-900 border-brand-100 shadow-[6px_6px_12px_rgba(230,180,165,0.45),-6px_-6px_12px_#ffffff]"
              }`}
            >
              <LayoutGrid
                className={`w-4 h-4 ${activeCategory === "all" ? "text-white" : "text-brand-900"}`}
              />
              <span>{lang === "ar" ? "جميع الأصناف" : "All Items"}</span>
            </button>

            <button
              onClick={() => setActiveCategory("offers")}
              className={`flex items-center gap-2 shrink-0 active:scale-95 rounded-[0.5em] py-[0.7em] px-[1.7em] text-[15px] font-[800] cursor-pointer transition-all duration-300 border ${
                activeCategory === "offers"
                  ? "bg-brand-600 text-white border-brand-600 shadow-[4px_4px_12px_rgba(244,67,54,0.4)]"
                  : "bg-brand-100 text-brand-900 border-brand-100 shadow-[6px_6px_12px_rgba(230,180,165,0.45),-6px_-6px_12px_#ffffff]"
              }`}
            >
              <Sparkles
                className={`w-4 h-4 ${activeCategory === "offers" ? "text-amber-300 animate-pulse" : "text-brand-500"}`}
              />
              <span>
                {lang === "ar" ? "عروض حصرية 🔥" : "Exclusive Offers 🔥"}
              </span>
            </button>

            {restaurant.categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 shrink-0 active:scale-95 rounded-[0.5em] py-[0.7em] px-[1.7em] text-[15px] font-[800] cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? "bg-brand-500 text-white border-brand-500 shadow-[4px_4px_12px_rgba(230,57,32,0.35)]"
                      : "bg-brand-100 text-brand-900 border-brand-100 shadow-[6px_6px_12px_rgba(230,180,165,0.45),-6px_-6px_12px_#ffffff]"
                  }`}
                >
                  <Utensils
                    className={`w-4 h-4 ${isActive ? "text-white" : "text-brand-900"}`}
                  />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      <div className="px-4 sm:px-8 mt-6 mb-4 max-w-5xl mx-auto">
        <h2 className="text-lg sm:text-xl font-black text-slate-900">
          {activeCategory === "all"
            ? lang === "ar"
              ? `جميع الأصناف في ${restaurant.name}`
              : `All Items in ${restaurant.name}`
            : activeCategory === "offers"
              ? lang === "ar"
                ? "العروض الحصرية وعروض العائلات"
                : "Exclusive & Family Offers"
              : restaurant.categories.find((c) => c.id === activeCategory)
                  ?.name}
        </h2>
        <p className="text-xs text-slate-500 mt-3">
          {lang === "ar"
            ? "قائمة شاملة لكافة الأطباق والمأكولات المتاحة حالياً للطلب السريع"
            : "A comprehensive available item list from this store"}
        </p>
      </div>
    </>
  );
}

export default CategoriesTitles;
