import {
  ArrowDownUp,
  Check,
  ChevronDown,
  SlidersHorizontal,
  Utensils,
  DollarSign,
} from "lucide-react";
import { OverviewCard } from "@/components/dashboard/OverviewCard";
import { Button } from "@/components/ui/button";
import Header from "@/components/dashboard/categories/Header";
import CategorySidebar from "@/components/dashboard/categories/Category-sidebar";
import { getCurrentUser } from "@/lib/auth-helper";
import {
  getCategories,
  getRestaurant,
  getItems,
} from "@/lib/queries/dashboard";
import CardItem from "@/components/dashboard/items/CardItem";
import EmptyCard from "@/components/dashboard/items/EmptyCard";

export default async function CategoriesPage() {
  const user = await getCurrentUser();
  const restaurant = await getRestaurant(user.id);
  const categories = await getCategories(user.id);
  const items = await getItems(user.id);
  const exchangeRate = Number(restaurant?.exchangeRate) || 0;
  const itemsAvailable = items.filter((item) => item.isAvailable).length;
  const totalItems = items.length;
  const percentOfItems = totalItems
    ? Math.round((itemsAvailable / totalItems) * 100)
    : 0;
  return (
    <main className="min-h-screen bg-slate-50/60 px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px] space-y-8">
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
          <div className="space-y-4">
            {/* Control Bar */}
            <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm border border-slate-100">
              <div className="text-xs text-slate-500">
                عرض{" "}
                <span className="font-bold text-slate-800">{items.length}</span>{" "}
                من الوجبات
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                <ArrowDownUp className="h-3.5 w-3.5" />
                ترتيب
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>
            {/* List or Empty State */}
            <div className="grid gap-3">
              {items.length === 0 ? (
                <EmptyCard />
              ) : (
                items.map((item) => {
                  const category = categories.find(
                    (cat) => item.categoryId === cat.id,
                  );
                  if (!category) return null;
                  return (
                    <CardItem item={item} category={category} key={item.id} />
                  );
                })
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
