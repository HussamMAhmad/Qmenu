import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Q-Menu | منصة إدارة قوائم الطعام الرقمية للمطاعم والمقاهي",
    template: "%s | Q-Menu",
  },
  description:
    "أنشئ قائمة طعام تفاعلية (QR Code Menu) لمطعمك أو مقهاك بكل سهولة. إدارة كاملة للأصناف، الأسعار، الفئات، وتكامل مباشر مع واتساب لتلقي الطلبات بسرعة وسلاسة.",
  keywords: [
    "Q-Menu",
    "منيو رقمي",
    "QR Menu",
    "قائمة طعام تفاعلية",
    "إدارة المطاعم",
    "منيو مطعم QR",
    "منصة كيو منيو",
    "منيو كيو ار",
    "إنشاء منيو إلكتروني",
  ],

  authors: [{ name: "Q-Menu Team" }],
  creator: "Q-Menu",
  publisher: "Q-Menu",

  metadataBase: new URL("https://qmenu-six.vercel.app"),

  openGraph: {
    title: "Q-Menu | منصة إدارة قوائم الطعام الرقمية للمطاعم والمقاهي",
    description:
      "طور تجربة عملاء مطعمك مع Q-Menu. قوائم طعام رقمية سريعة، احترافية، ومصممة بأحدث التقنيات مع دعم الـ QR Code.",
    url: "https://qmenu-six.vercel.app",
    siteName: "Q-Menu",
    locale: "ar_SY",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Q-Menu - منصة إدارة قوائم الطعام الرقمية للمطاعم والمقاهي",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Q-Menu | منصة إدارة قوائم الطعام الرقمية",
    description:
      "أنشئ قائمة طعام تفاعلية (QR Code Menu) لمطعمك أو مقهاك بكل سهولة وبأعلى جودة.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      dir="rtl"
      lang="ar"
      className={`${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-cairo selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
