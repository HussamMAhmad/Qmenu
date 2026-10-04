import {
  LayoutDashboard,
  UtensilsCrossed,
  QrCode,
  Settings,
} from "lucide-react";

export const navItems = [
  {
    title: "نظرة عامة",
    href: "/dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    title: "الأقسام والأصناف",
    href: "/dashboard/categories",
    icon: UtensilsCrossed,
  },
  {
    title: "رمز الـ QR",
    href: "/dashboard/qrcode",
    icon: QrCode,
  },
  {
    title: "الإعدادات",
    href: "/dashboard/setting",
    icon: Settings,
  },
];
