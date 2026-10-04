"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownUp,
  ArrowLeft,
  Check,
  ChevronDown,
  Copy,
  Edit3,
  Eye,
  GripVertical,
  MoreHorizontal,
  Plus,
  QrCode,
  Search,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Utensils,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type Dish = {
  id: number;
  name: string;
  category: string;
  description: string;
  priceUSD: number;
  available: boolean;
  featured?: boolean;
};

type Category = {
  id: number;
  name: string;
  count: number;
  color?: "brand" | "neutral" | "warm";
};

const initialCategories: Category[] = [
  { id: 1, name: "الوجبات الرئيسية", count: 6, color: "brand" },
  { id: 2, name: "البيتزا", count: 4, color: "neutral" },
  { id: 3, name: "المقبلات", count: 3, color: "neutral" },
  { id: 4, name: "المشروبات", count: 5, color: "neutral" },
  { id: 5, name: "الحلويات", count: 2, color: "neutral" },
];

const initialDishes: Dish[] = [
  {
    id: 1,
    name: "برغر السلطان الخاص",
    category: "الوجبات الرئيسية",
    description: "برغر لحم مشوي مع الجبن والخضار وصوص السلطان الخاص.",
    priceUSD: 4.5,
    available: true,
    featured: true,
  },
  {
    id: 2,
    name: "برغر تشيكن كرسبي",
    category: "الوجبات الرئيسية",
    description: "دجاج مقرمش، خس، جبنة وصوص خاص.",
    priceUSD: 4,
    available: true,
  },
  {
    id: 3,
    name: "بيتزا مارغريتا وسط",
    category: "البيتزا",
    description: "صلصة طماطم، موزاريلا، ريحان وزيت زيتون.",
    priceUSD: 6,
    available: true,
  },
  {
    id: 4,
    name: "بيتزا بيبروني وسط",
    category: "البيتزا",
    description: "موزاريلا وشرائح بيبروني مع صلصة البيتزا.",
    priceUSD: 7,
    available: true,
    featured: true,
  },
  {
    id: 5,
    name: "بطاطا ويدجز عائلية",
    category: "المقبلات",
    description: "بطاطا متبلة ومقرمشة مع صوص جانبي.",
    priceUSD: 2,
    available: true,
  },
  {
    id: 6,
    name: "كوكاكولا",
    category: "المشروبات",
    description: "علبة مشروب غازي باردة.",
    priceUSD: 1,
    available: false,
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [dishes, setDishes] = useState(initialDishes);
  const [selectedCategory, setSelectedCategory] = useState("الوجبات الرئيسية");
  const [search, setSearch] = useState("");
  const [exchangeRate] = useState(14800);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [menuLive] = useState(true);

  const visibleDishes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return dishes.filter((dish) => {
      const matchesCategory =
        selectedCategory === "الكل" || dish.category === selectedCategory;

      const matchesSearch =
        !query ||
        dish.name.toLowerCase().includes(query) ||
        dish.category.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query);

      const matchesAvailability = !showOnlyAvailable || dish.available;

      return matchesCategory && matchesSearch && matchesAvailability;
    });
  }, [dishes, search, selectedCategory, showOnlyAvailable]);

  const totalDishes = dishes.length;
  const availableDishes = dishes.filter((dish) => dish.available).length;
  const selectedCount =
    selectedCategory === "الكل"
      ? totalDishes
      : dishes.filter((dish) => dish.category === selectedCategory).length;

  const addCategory = () => {
    const name = newCategory.trim();
    if (!name) return;

    const exists = categories.some((category) => category.name === name);
    if (exists) return;

    setCategories((current) => [
      ...current,
      { id: Date.now(), name, count: 0, color: "neutral" },
    ]);
    setNewCategory("");
    setShowCategoryDialog(false);
    setSelectedCategory(name);
  };

  const toggleAvailability = (dishId: number) => {
    setDishes((current) =>
      current.map((dish) =>
        dish.id === dishId ? { ...dish, available: !dish.available } : dish
      )
    );
  };

  return (
    <main
      dir="rtl"
      className="font-cairo min-h-screen bg-[#f7f8fa] px-4 py-5 text-slate-800 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1440px] space-y-6">
        {/* Page header */}
        <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Utensils className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold tracking-wide text-brand-700">
                MENU MANAGEMENT
              </span>
            </div>

            <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              الأقسام والوجبات
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              أدِر أقسام منيو مطعمك، أضف الوجبات وعدّل الأسعار والتوفر بسهولة،
              مع ظهور الأسعار بالليرة السورية حسب سعر الصرف المعتمد.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link href="/m/al-sultan" target="_blank" rel="noreferrer">
              <Button
                variant="outline"
                className="h-11 w-full gap-2 rounded-xl border-slate-200 bg-white font-bold hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 sm:w-auto"
              >
                <Eye className="h-4 w-4" />
                معاينة المنيو
              </Button>
            </Link>

            <Button
              className="h-11 gap-2 rounded-xl bg-brand-500 px-5 font-bold text-white shadow-sm hover:bg-brand-600"
              onClick={() => setSelectedCategory("الكل")}
            >
              <Plus className="h-4 w-4" />
              إضافة وجبة
            </Button>
          </div>
        </header>

        {/* Top stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card className="rounded-3xl border-slate-200/70 bg-white shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  إجمالي الأقسام
                </p>
                <p className="mt-2 text-3xl font-black text-slate-950">
                  {categories.length}
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  أقسام في المنيو
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <SlidersHorizontal className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200/70 bg-white shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  إجمالي الوجبات
                </p>
                <p className="mt-2 text-3xl font-black text-slate-950">
                  {totalDishes}
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  وجبة مضافة حالياً
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <Utensils className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200/70 bg-white shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  الوجبات المتاحة
                </p>
                <p className="mt-2 text-3xl font-black text-slate-950">
                  {availableDishes}
                </p>
                <p className="mt-1 text-[11px] font-bold text-emerald-700">
                  {totalDishes ? Math.round((availableDishes / totalDishes) * 100) : 0}%
                  متاحة للطلب
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Check className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200/70 bg-white shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  سعر الصرف الحالي
                </p>
                <p className="mt-2 text-2xl font-black text-slate-950">
                  {exchangeRate.toLocaleString("en-US")}
                </p>
                <p className="mt-1 text-[11px] text-slate-400">ل.س / $</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                $
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Workspace */}
        <section className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
          {/* Categories sidebar */}
          <Card className="h-fit rounded-[28px] border-slate-200/70 bg-white shadow-sm">
            <CardHeader className="px-4 pb-2 pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-black text-slate-950">
                    أقسام المنيو
                  </CardTitle>
                  <p className="mt-1 text-[11px] text-slate-400">
                    اسحب لترتيب ظهور الأقسام
                  </p>
                </div>

                <Button
                  size="icon"
                  variant="outline"
                  className="h-9 w-9 rounded-xl border-slate-200 hover:border-brand-200 hover:bg-brand-50"
                  onClick={() => setShowCategoryDialog(true)}
                  aria-label="إضافة قسم"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-1.5 p-3">
              <button
                onClick={() => setSelectedCategory("الكل")}
                className={`flex w-full items-center justify-between rounded-2xl px-3.5 py-3 text-right transition ${
                  selectedCategory === "الكل"
                    ? "bg-brand-500 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      selectedCategory === "الكل" ? "bg-white" : "bg-brand-400"
                    }`}
                  />
                  <span className="text-sm font-bold">كل الوجبات</span>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    selectedCategory === "الكل"
                      ? "bg-white/15 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {totalDishes}
                </span>
              </button>

              {categories.map((category) => {
                const active = selectedCategory === category.name;
                return (
                  <div
                    key={category.id}
                    className={`group flex items-center gap-2 rounded-2xl px-2.5 py-1.5 transition ${
                      active ? "bg-brand-50" : "hover:bg-slate-50"
                    }`}
                  >
                    <GripVertical className="h-4 w-4 shrink-0 text-slate-300 opacity-0 transition group-hover:opacity-100" />

                    <button
                      onClick={() => setSelectedCategory(category.name)}
                      className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded-xl px-1 py-2 text-right"
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span
                          className={`h-2 w-2 shrink-0 rounded-full ${
                            active ? "bg-brand-500" : "bg-slate-300"
                          }`}
                        />
                        <span
                          className={`truncate text-sm font-bold ${
                            active ? "text-brand-800" : "text-slate-600"
                          }`}
                        >
                          {category.name}
                        </span>
                      </div>
                      <span className="shrink-0 text-[10px] font-semibold text-slate-400">
                        {category.count}
                      </span>
                    </button>

                    <button
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-300 opacity-0 transition hover:bg-white hover:text-slate-500 group-hover:opacity-100"
                      aria-label={`خيارات ${category.name}`}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}

              <div className="mt-3 border-t border-slate-100 pt-3">
                <div className="rounded-2xl bg-slate-50 p-3.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-brand-600" />
                    <span className="text-xs font-extrabold text-slate-800">
                      نصيحة سريعة
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] leading-5 text-slate-500">
                    رتّب الأقسام حسب رحلة العميل داخل المنيو ليسهل الوصول إلى
                    الوجبات الأكثر طلباً.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dishes workspace */}
          <div className="space-y-5">
            <Card className="rounded-[28px] border-slate-200/70 bg-white shadow-sm">
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-black text-slate-950">
                        {selectedCategory}
                      </h2>
                      <Badge className="rounded-full border-0 bg-brand-50 px-2.5 text-[10px] font-bold text-brand-700 hover:bg-brand-50">
                        {selectedCount} وجبة
                      </Badge>
                      {menuLive && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          المنيو مفعّل
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      إدارة الوجبات والتوفر والأسعار من هذه الصفحة
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="relative min-w-0 sm:w-[290px]">
                      <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ابحث عن وجبة أو قسم..."
                        className="h-10 rounded-xl border-slate-200 pr-9 text-xs font-medium focus-visible:ring-brand-500"
                      />
                      {search && (
                        <button
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                          onClick={() => setSearch("")}
                          aria-label="مسح البحث"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      className={`h-10 gap-2 rounded-xl border-slate-200 text-xs font-bold ${
                        showOnlyAvailable
                          ? "border-brand-200 bg-brand-50 text-brand-700"
                          : ""
                      }`}
                      onClick={() => setShowOnlyAvailable((value) => !value)}
                    >
                      <SlidersHorizontal className="h-3.5 w-3.5" />
                      المتاح فقط
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between px-1">
              <div className="text-xs text-slate-400">
                عرض <span className="font-bold text-slate-700">{visibleDishes.length}</span>{" "}
                من الوجبات
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="gap-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-white"
              >
                <ArrowDownUp className="h-3.5 w-3.5" />
                ترتيب
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>

            {/* Dish list */}
            <div className="grid gap-3">
              {visibleDishes.length === 0 ? (
                <Card className="rounded-[28px] border-dashed border-slate-200 bg-white shadow-none">
                  <CardContent className="flex flex-col items-center justify-center px-5 py-14 text-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                      <Search className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 text-sm font-black text-slate-800">
                      لا توجد وجبات مطابقة
                    </h3>
                    <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                      جرّب تغيير كلمة البحث أو اختيار قسم آخر.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                visibleDishes.map((dish) => (
                  <Card
                    key={dish.id}
                    className="group rounded-[24px] border-slate-200/70 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-md"
                  >
                    <CardContent className="p-3.5 sm:p-4">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        <div className="flex min-w-0 flex-1 items-center gap-3.5">
                          <div className="relative flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-slate-100 text-brand-700">
                            <Utensils className="h-7 w-7" strokeWidth={1.6} />
                            {dish.featured && (
                              <span className="absolute -right-1.5 -top-1.5 rounded-full bg-brand-500 px-2 py-1 text-[8px] font-black text-white shadow-sm">
                                مميز
                              </span>
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="truncate text-sm font-black text-slate-950 sm:text-base">
                                {dish.name}
                              </h3>
                              <span
                                className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                                  dish.available
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-slate-100 text-slate-400"
                                }`}
                              >
                                {dish.available ? "متاح" : "غير متاح"}
                              </span>
                            </div>

                            <p className="mt-1 text-[11px] font-semibold text-brand-700">
                              {dish.category}
                            </p>

                            <p className="mt-2 line-clamp-1 max-w-2xl text-[11px] leading-5 text-slate-400">
                              {dish.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:border-r md:border-slate-100 md:pr-4">
                          <div className="min-w-[150px] rounded-2xl bg-slate-50 px-4 py-3 text-right sm:text-left">
                            <p className="text-[10px] font-semibold text-slate-400">
                              السعر
                            </p>
                            <div className="mt-1 flex items-baseline gap-2 sm:justify-end">
                              <span className="text-lg font-black text-slate-950">
                                ${dish.priceUSD.toFixed(2)}
                              </span>
                            </div>
                            <p className="mt-1 text-xs font-black text-brand-700">
                              {(dish.priceUSD * exchangeRate).toLocaleString("en-US")}{" "}
                              ل.س
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-2 sm:justify-end">
                            <button
                              onClick={() => toggleAvailability(dish.id)}
                              className={`inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-[10px] font-bold transition ${
                                dish.available
                                  ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                              }`}
                              title="تغيير حالة التوفر"
                            >
                              {dish.available ? (
                                <>
                                  <Check className="h-3.5 w-3.5" />
                                  متاح
                                </>
                              ) : (
                                <>
                                  <X className="h-3.5 w-3.5" />
                                  متوقف
                                </>
                              )}
                            </button>

                            <Button
                              size="icon"
                              variant="outline"
                              className="h-9 w-9 rounded-xl border-slate-200 text-slate-500 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                              aria-label={`تعديل ${dish.name}`}
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </Button>

                            <Button
                              size="icon"
                              variant="outline"
                              className="h-9 w-9 rounded-xl border-slate-200 text-slate-500 hover:border-red-100 hover:bg-red-50 hover:text-red-600"
                              aria-label={`حذف ${dish.name}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Bottom action bar */}
            <Card className="rounded-[24px] border-slate-200/70 bg-white shadow-sm">
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <QrCode className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      جاهز لمشاركة المنيو؟
                    </p>
                    <p className="text-[10px] text-slate-400">
                      افتح النسخة المنشورة مباشرة كما يراها العميل.
                    </p>
                  </div>
                </div>

                <Link href="/m/al-sultan" target="_blank" rel="noreferrer">
                  <Button
                    variant="outline"
                    className="h-10 gap-2 rounded-xl border-slate-200 px-4 text-xs font-bold hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                  >
                    فتح المنيو المنشور
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Add category dialog */}
        {showCategoryDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm">
            <Card className="w-full max-w-md rounded-[28px] border-slate-200 bg-white shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-black">
                    إضافة قسم جديد
                  </CardTitle>
                  <p className="mt-1 text-xs text-slate-400">
                    أضف قسماً جديداً لتنظيم الوجبات.
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9 rounded-xl"
                  onClick={() => setShowCategoryDialog(false)}
                  aria-label="إغلاق"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-600">
                    اسم القسم
                  </label>
                  <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addCategory();
                    }}
                    autoFocus
                    placeholder="مثال: الساندويتشات"
                    className="h-11 rounded-xl border-slate-200 focus-visible:ring-brand-500"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <Button
                    onClick={addCategory}
                    className="h-11 flex-1 rounded-xl bg-brand-500 font-bold text-white hover:bg-brand-600"
                  >
                    إضافة القسم
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowCategoryDialog(false)}
                    className="h-11 rounded-xl border-slate-200 font-bold"
                  >
                    إلغاء
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
