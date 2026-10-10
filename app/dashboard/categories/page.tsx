import {
  Check,
  SlidersHorizontal,
  Utensils,
  DollarSign,
} from "lucide-react";
import { OverviewCard } from "@/components/dashboard/OverviewCard";
import Header from "@/components/dashboard/categories/Header";
import CategorySidebar from "@/components/dashboard/categories/Category-sidebar";
import { getCurrentUser } from "@/lib/auth-helper";
import {
  getCategories,
  getRestaurant,
  getItems,
} from "@/lib/queries/dashboard";
import SortItems from "@/components/dashboard/items/SortItems";

interface PageProps {
  searchParams: Promise<{
    sort?: string;
    category?: string;
    available?: string;
  }>;
}

export default async function CategoriesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sortOption = params.sort || "default";
  const categoryId = params.category;
  const isAvailable =
    params.available === "true"
      ? true
      : params.available === "false"
        ? false
        : undefined;
  const user = await getCurrentUser();
  const restaurant = await getRestaurant(user.id);
  const categories = await getCategories(user.id);
  const items = await getItems(user.id , sortOption , categoryId , isAvailable);
  const exchangeRate = Number(restaurant?.exchangeRate) || 0;
  const itemsAvailable = items.filter((item) => item.isAvailable).length;
  const totalItems = items.length;
  const percentOfItems = totalItems
    ? Math.round((itemsAvailable / totalItems) * 100)
    : 0;
  return (
    <main className="min-h-screen bg-slate-50/60 px-2 py-4 text-slate-800 sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        {/* Header Section */}
        <Header categories={categories} exchangeRate={exchangeRate} />
        {/* Overview KPI Cards */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <OverviewCard
            title="إجمالي الأقسام"
            value={categories.length}
            subtext={<p className="text-slate-500">قسم مضاف حالياً</p>}
            icon={SlidersHorizontal}
          />
          <OverviewCard
            title="إجمالي الوجبات"
            value={items.length}
            subtext={<p className="text-slate-500">وجبة مضافة حالياً</p>}
            icon={Utensils}
          />
          <OverviewCard
            title="الوجبات المتاحة"
            value={itemsAvailable}
            subtext={
              <p className="flex items-center gap-1 font-bold text-emerald-600">
                {percentOfItems}% متاحة للطلب
              </p>
            }
            icon={Check}
            iconBgColor="bg-emerald-50"
            iconColor="text-emerald-600"
          />
          <OverviewCard
            title="سعر الصرف الحالي"
            value={exchangeRate.toLocaleString("en-US")}
            subtext={<p className="mt-1 text-[11px] text-slate-400">ل.س / $</p>}
            icon={DollarSign}
          />
        </section>
        {/* Workspace Grid */}
        <section className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          {/* Categories Sidebar */}
          <aside className="space-y-6">
            <CategorySidebar categories={categories} />
          </aside>
          {/* Dishes List Section */}
          <SortItems items={items} exchangeRate={exchangeRate} categories={categories}/>
        </section>
      </div>
    </main>
  );
}
