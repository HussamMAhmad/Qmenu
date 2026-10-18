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
  const baseButtonClasses =
    "flex items-center gap-1.5 sm:gap-2 shrink-0 active:scale-95 rounded-[0.5em] py-2 px-3.5 sm:py-[0.7em] sm:px-[1.7em] text-xs sm:text-[15px] font-[800] cursor-pointer transition-all duration-300 border";

  const inactiveButtonClasses =
    "bg-brand-100 text-brand-900 border-brand-100 shadow-[4px_4px_10px_rgba(230,180,165,0.4),-4px_-4px_10px_#ffffff] sm:shadow-[6px_6px_12px_rgba(230,180,165,0.45),-6px_-6px_12px_#ffffff]";

  return (
    <>
      <div className="sticky top-0 z-30 bg-brand-50/90 backdrop-blur-xl py-3 sm:py-4 px-3 sm:px-8 border-b border-brand-100/60 shadow-xs mt-6">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex items-center gap-2.5 sm:gap-3.5 max-w-5xl mx-auto py-1 px-1">
            {/* <button
              onClick={() => setActiveCategory("all")}
              aria-pressed={activeCategory === "all"}
              className={`${baseButtonClasses} ${
                activeCategory === "all"
                  ? "bg-brand-500 text-white border-brand-500 shadow-[4px_4px_12px_rgba(230,57,32,0.35)]"
                  : inactiveButtonClasses
              }`}
            >
              <LayoutGrid
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                  activeCategory === "all" ? "text-white" : "text-brand-900"
                }`}
              />
              <span>{lang === "ar" ? "جميع الأصناف" : "All Items"}</span>
            </button> */}
            {restaurant.categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={isActive}
                  className={`${baseButtonClasses} ${
                    isActive
                      ? "bg-brand-500 text-white border-brand-500 shadow-[4px_4px_12px_rgba(230,57,32,0.35)]"
                      : inactiveButtonClasses
                  }`}
                >
                  <Utensils
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? "text-white" : "text-brand-900"}`}
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
        <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight break-words">
          {activeCategory === "all"
            ? lang === "ar"
              ? `جميع الأصناف في ${restaurant.name}`
              : `All Items in ${restaurant.name}`
            : activeCategory === "offers"
            ? lang === "ar"
              ? "العروض الحصرية وعروض العائلات"
              : "Exclusive & Family Offers"
            : restaurant.categories.find((c) => c.id === activeCategory)?.name}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed break-words">
          {lang === "ar"
            ? "قائمة شاملة لكافة الأطباق والمأكولات المتاحة حالياً للطلب السريع"
            : "A comprehensive available item list from this store"}
        </p>
      </div>
    </>
  );
}

export default CategoriesTitles;