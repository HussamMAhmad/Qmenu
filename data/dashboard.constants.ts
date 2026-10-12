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

export const DEFAULT_QR_SETTING_COLOR = [
  { name: "أسود فخم", value: "#0f172a" },
  { name: "برتقالي", value: "#f97316" },
  { name: "أحمر داكن", value: "#dc2626" },
  { name: "أخضر زمردي", value: "#059669" },
  { name: "أزرق ملكي", value: "#2563eb" },
  { name: "بني دافئ", value: "#78350f" },
];