import { IoQrCode } from "react-icons/io5";
import { FaDatabase, FaMobileAlt, FaChartPie, FaPalette } from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";

export const LINKS = [
  { name: "المميزات", url: "#features" },
  { name: "كيف نعمل", url: "#how-it-works" },
  { name: "الاسعار", url: "#pricing" },
  { name: "الاسئلة الشائعة", url: "#qustions" },
];

export const FEATURES = [
  {
    title: "مولد باركود (QR) ديناميكي",
    text: "قم بتوليد كود QR خاص بكل طاولة أو كود عام للمطعم. الزبون يمسح الكود ويستعرض المنيو بدون تحميل أي تطبيق.",
    Icon: IoQrCode,
    className: "text-brand-500",
  },
  {
    title: "دعم متعدد العملات",
    text: "أضف أسعارك بالعملة المحلية (ل.س) والدولار ($). يمكن للزبون التبديل بين العملات بضغطة زر واحدة لمعرفة السعر بدقة.",
    Icon: FaDatabase,
    className: "text-blue-500",
  },
  {
    title: "تحديث لحظي للأسعار والأصناف",
    text: "تعديل الأسعار وإخفاء الأصناف المنتهية يتم في ثوانٍ وينعكس مباشرة على هواتف الزبائن دون الحاجة لإعادة طباعة المنيو.",
    Icon: MdElectricBolt,
    className: "text-emerald-500",
  },
  {
    title: "تصميم متجاوب وعصري",
    text: "منيو رقمي مصمم خصيصاً ليناسب جميع الشاشات مع تجربة مستخدم (UX) فائقة السهولة تزيد من شهية الزبائن وتضاعف طلباتهم.",
    Icon: FaMobileAlt,
    className: "text-amber-500 ",
  },
  {
    title: "إحصائيات وتقارير ذكية",
    text: "تعرف على الأصناف الأكثر مبيعاً، وتتبع عدد مرات مسح الكود يومياً، لتحسين قائمتك وزيادة أرباحك بناءً على بيانات حقيقية.",
    Icon: FaChartPie,
    className: "text-purple-500 ",
  },
  {
    title: "الطلب المباشر من الطاولة",
    text: "يمكن للزبائن تجميع طلباتهم وإرسالها مباشرة إلى المطبخ أو نظام الكاشير لتقليل وقت الانتظار وتخفيف الضغط عن الويترز",
    Icon: FaPalette,
    className: "text-rose-500 ",
  },
];
