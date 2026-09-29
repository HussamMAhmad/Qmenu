import Image from "next/image";
import { icon } from "@/public/assets";
import { FaHeart } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { FaInstagram , FaFacebookF ,FaGlobe ,FaArrowUpRightFromSquare  } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 relative overflow-hidden dir-rtl">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ff5722]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#e63920]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center p-1.5 shadow-sm">
                <Image
                  src={icon}
                  alt="q-menu"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                كيومنيو
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6 font-medium">
              المنصة العربية الأذكى والأسهل لإنشاء قوائم الطعام الرقمية (QR
              Menu)، إدارة الطلبات المباشرة، وتطوير تجربة زبائن المطاعم
              والمقاهي.
            </p>

            <div className="flex items-center gap-3 mb-6">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-[#ff5722] text-slate-400 hover:text-white border border-slate-700/60 hover:border-[#ff5722] transition-all duration-200 flex items-center justify-center group"
              >
                <FaFacebookF className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-[#ff5722] text-slate-400 hover:text-white border border-slate-700/60 hover:border-[#ff5722] transition-all duration-200 flex items-center justify-center group"
              >
                <FaInstagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-400 hover:text-white border border-slate-700/60 hover:border-emerald-600 transition-all duration-200 flex items-center justify-center group"
              >
                <LuMessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>جميع الأنظمة تعمل بكفاءة 100%</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-5 relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:right-0 after:w-8 after:h-0.5 after:bg-[#ff5722] after:rounded-full">
              المنتج والحلول
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <a
                  href="#menu-builder"
                  className="text-slate-400 hover:text-[#ff7043] transition-colors flex items-center justify-between group"
                >
                  <span>صانع المنيو الرقمي</span>
                  <FaArrowUpRightFromSquare className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                </a>
              </li>
              <li>
                <a
                  href="#table-orders"
                  className="text-slate-400 hover:text-[#ff7043] transition-colors flex items-center justify-between group"
                >
                  <span>طلب الطاولات المباشر</span>
                  <FaArrowUpRightFromSquare className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                </a>
              </li>
              <li>
                <a
                  href="#analytics"
                  className="text-slate-400 hover:text-[#ff7043] transition-colors flex items-center justify-between group"
                >
                  <span>تقارير الإيرادات</span>
                  <FaArrowUpRightFromSquare className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                </a>
              </li>
              <li>
                <a
                  href="#integrations"
                  className="text-slate-400 hover:text-[#ff7043] transition-colors flex items-center justify-between group"
                >
                  <span>الربط البرمجي (API)</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-5 relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:right-0 after:w-8 after:h-0.5 after:bg-[#ff5722] after:rounded-full">
              روابط سريعة
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-[#ff7043] transition-colors"
                >
                  الرئيسية
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-slate-400 hover:text-[#ff7043] transition-colors"
                >
                  المميزات
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-slate-400 hover:text-[#ff7043] transition-colors"
                >
                  باقات الأسعار
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-slate-400 hover:text-[#ff7043] transition-colors"
                >
                  الأسئلة الشائعة
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-slate-400 hover:text-[#ff7043] transition-colors"
                >
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-5 relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:right-0 after:w-8 after:h-0.5 after:bg-[#ff5722] after:rounded-full">
              الأمان والدعم
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <a
                  href="#terms"
                  className="text-slate-400 hover:text-[#ff7043] transition-colors"
                >
                  شروط الاستخدام
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-slate-400 hover:text-[#ff7043] transition-colors"
                >
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a
                  href="#help"
                  className="text-slate-400 hover:text-[#ff7043] transition-colors"
                >
                  مركز المساعدة
                </a>
              </li>
              <li>
                <a
                  href="#status"
                  className="text-slate-400 hover:text-[#ff7043] transition-colors"
                >
                  حالة الخدمة (Status)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
          <p>© 2026 جميع الحقوق محفوظة لمنصة منيوك (Q-Menu).</p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span>صُنع بشغف لخدمة المطاعم</span>
              <FaHeart className="w-4 h-4 text-[#ff5722] fill-[#ff5722] animate-pulse" />
            </div>

            <div className="flex items-center gap-1 text-slate-400 hover:text-white cursor-pointer transition-colors">
              <FaGlobe className="w-3.5 h-3.5" />
              <span>العربية</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
