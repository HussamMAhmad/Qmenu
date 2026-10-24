import Image from "next/image";
import { icon } from "@/public/assets";
import { Mail, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 pb-8 pt-12 sm:px-8 lg:px-12" dir="rtl">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          
          {/* عمود الشعار والنبذة */}
          <div>
            {/* حاوية الشعار المضبوطة بأبعاد صحيحة لتعمل مع next/image */}
            <div className="relative h-10 w-32">
              <Image
                src={icon}
                alt="Q-Menu Logo"
                fill
                priority
                sizes="128px"
                className="object-contain object-right"
              />
            </div>

            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-500 font-medium">
              Q-Menu — طريقة عصرية لإنشاء وإدارة قوائم الطعام الرقمية للمطاعم بسهولة واحترافية.
            </p>

            {/* أيقونات التواصل السريع */}
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href="mailto:hello@q-menu.example"
                aria-label="البريد الإلكتروني"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://wa.me/your-number"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساب"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="tel:+123456789"
                aria-label="اتصال هاتفي"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* عمود المنصة */}
          <div>
            <h3 className="font-black text-slate-900">
              المنصة
            </h3>
            <div className="mt-4 space-y-3">
              {[
                ["المميزات", "#features"],
                ["المعاينة", "#preview"],
                ["الأسعار", "#pricing"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="block text-sm font-medium text-slate-500 transition hover:text-brand-600"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-black text-slate-900">
              المساعدة
            </h3>
            <div className="mt-4 space-y-3">
              {[
                ["الأسئلة الشائعة", "#faq"],
                ["تواصل معنا عبر البريد", "mailto:hello@q-menu.example"],
                ["تسجيل الدخول", "/sign-in"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="block text-sm font-medium text-slate-500 transition hover:text-brand-600"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-black text-slate-900">
              قانوني
            </h3>
            <div className="mt-4 space-y-3">
              <a
                href="/privacy"
                className="block text-sm font-medium text-slate-500 transition hover:text-brand-600"
              >
                سياسة الخصوصية
              </a>
              <a
                href="/terms"
                className="block text-sm font-medium text-slate-500 transition hover:text-brand-600"
              >
                الشروط والأحكام
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs font-semibold text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Q-Menu. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1.5">
            صُممت بعناية للمطاعم الحديثة
            <span className="text-brand-600 font-bold">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
}