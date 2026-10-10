"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, Store, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navItems } from "@/data/dashboard.constants";
import CustomButton from "../CustomButton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SignOut } from "@/actions/auth.actions";

interface DashboardLayoutContentProps {
  children: React.ReactNode;
  restaurantName: string;
  userName: string;
}

export default function DashboardLayoutContent({
  children,
  restaurantName,
  userName,
}: DashboardLayoutContentProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isActive = (itemHref: string, exact?: boolean) => {
    if (exact) return pathname === itemHref;
    return pathname.startsWith(itemHref);
  };

  async function handleSignOut() {
    setIsLoading(true);
    try {
      await SignOut();
    } catch (e) {
      console.log("failed to sign out somthing wrong",e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900">
      <aside className="fixed inset-y-0 right-0 z-30 hidden w-64 border-l border-slate-200/80 bg-white shadow-xs lg:flex lg:flex-col">
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white shadow-xs shadow-brand-500/30">
              <Store className="h-5 w-5" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-bold text-slate-900">
                {restaurantName}
              </span>
              <span className="text-xs font-medium text-brand-600">
                Q-Menu SaaS
              </span>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1.5 px-4 py-6">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-brand-50 text-brand-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    active
                      ? "text-brand-500"
                      : "text-slate-400 group-hover:text-slate-600",
                  )}
                />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-4 space-y-3">
          <div className="rounded-xl bg-slate-50 p-3 text-xs border border-slate-100">
            <p className="font-semibold text-slate-700">المستخدم الحالي</p>
            <p className="truncate text-slate-500 mt-0.5">{userName}</p>
          </div>
          <CustomButton
              onClick={handleSignOut}
              isLoading={isLoading}
              className="w-full bg-slate-50/50 justify-start gap-3 rounded-xl text-xs font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              تسجيل الخروج
            </CustomButton>
        </div>
      </aside>

      <div className="flex flex-col lg:pr-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-slate-600 hover:bg-slate-100"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>

            <h1 className="text-lg font-bold text-slate-800">لوحة التحكم</h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2 rounded-xl border-brand-100 bg-brand-50/50 text-brand-700 hover:bg-brand-100/60 hover:text-brand-900"
            >
              <Link href={`/m/${restaurantName}`} target="_blank">
                <span className="hidden sm:inline">معاينة المنيو</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </header>
        <div className="mx-auto w-full">{children}</div>
      </div>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side="right"
          className="w-72 p-6 flex flex-col justify-between"
        >
          <div>
            <SheetHeader className="border-b border-slate-100 pb-4 text-right">
              <SheetTitle className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white">
                  <Store className="h-5 w-5" />
                </div>
                <span className="font-bold text-slate-900">
                  {restaurantName}
                </span>
              </SheetTitle>
            </SheetHeader>

            <nav className="mt-6 space-y-2">
              {navItems.map((item) => {
                const active = isActive(item.href, item.exact);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all",
                      active
                        ? "bg-brand-50 text-brand-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-100",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        active ? "text-brand-500" : "text-slate-400",
                      )}
                    />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <CustomButton
              onClick={handleSignOut}
              isLoading={isLoading}
              className="w-full bg-slate-50/50 justify-start gap-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              تسجيل الخروج
            </CustomButton>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
