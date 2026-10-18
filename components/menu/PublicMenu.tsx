"use client";
import { useState, useEffect } from "react";
import Header from "./Header";
import Info from "./Info";
import CategoriesTitles from "./CtegoriesTitles";
import GridItems from "./GridItems";
import FloatingCart from "./FloatingCart";
import { toast } from "sonner";

export default function PublicMenu({
  restaurant,
}: {
  restaurant: RestaurantMenu;
}) {
  const [lang, setLang] = useState<Lang>("ar");
  const [activeCategory, setActiveCategory] = useState<string>(
    restaurant.categories[0].id,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const ShowUsd = restaurant.showUSD;

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem(`qmenu_cart_${restaurant.id}`);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
  }, [restaurant.id]);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem(`qmenu_cart_${restaurant.id}`, JSON.stringify(cart));
  }, [cart, restaurant.id]);

  const addToCart = (item: Item, qtyToAdd: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + qtyToAdd } : i,
        );
      }
      return [...prev, { ...item, qty: qtyToAdd }];
    });

    toast.success(
      lang === "ar"
        ? `تمت إضافة "${item.nameAr}"`
        : `Added "${item.nameEn || item.nameAr}"`,
    );
  };

  const allItems = restaurant.categories.flatMap((cat) => cat.items);

  const getFilteredItems = () => {
    let items = allItems;

    // if (activeCategory !== "all") {
    items = allItems.filter((i) => i.categoryId === activeCategory);
    // }

    if (searchQuery.trim() !== "") {
      items = items.filter(
        (item) =>
          item.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.nameEn &&
            item.nameEn.toLowerCase().includes(searchQuery.toLowerCase())),
      );
    }

    return items;
  };

  const currentItems = getFilteredItems();

  return (
    <div
      className="relative mx-auto w-full max-w-7xl pb-32 text-slate-900 transition-all"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <Header
        lang={lang}
        restaurant={restaurant}
        setLang={setLang}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Info restaurant={restaurant} />

      <CategoriesTitles
        lang={lang}
        restaurant={restaurant}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <GridItems
        lang={lang}
        currentItems={currentItems}
        addToCart={addToCart}
        ShowUsd={ShowUsd}
      />

      <FloatingCart
        lang={lang}
        cart={cart}
        setCart={setCart}
        restaurant={restaurant}
      />
    </div>
  );
}
