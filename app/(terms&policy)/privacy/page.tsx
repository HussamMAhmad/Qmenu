import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fa] py-10 px-4 sm:px-6 lg:px-8 text-slate-800 dir-rtl">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* الهيدر وزر الرجوع */}
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button
              variant="ghost"
              className="gap-2 rounded-2xl text-slate-600 hover:text-brand-600 hover:bg-brand-50"
            >
              <ArrowRight className="h-4 w-4" />
              العودة للرئيسية
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1.5 rounded-xl">
            <ShieldCheck className="h-4 w-4" />
            بياناتك ومطبخك في أمان
          </div>
        </div>

        {/* العنوان الرئيسي */}
        <div className="space-y-3 text-center sm:text-right">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-sm">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            سياسة الخصوصية
          </h1>
          <p className="text-sm text-slate-500">
            آخر تحديث: {new Date().toLocaleDateString('ar-SA')} | نلتزم بحماية خصوصيتك وبيانات مطعمك بأعلى معايير الأمان.
          </p>
        </div>

        {/* محتوى السياسة (بطاقة رئيسية) */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-8 leading-relaxed text-slate-600 text-sm sm:text-base">
          
          {/* البند الأول */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600 text-xs">1</span>
              البيانات التي نجمعها
            </h2>
            <p>
              عند تسجيلك واستخدامك لمنصة <strong className="text-slate-900">Q-Menu</strong>، نقوم بجمع بعض البيانات الضرورية لتقديم الخدمة بأفضل شكل ممكن:
            </p>
            <ul className="list-disc list-inside space-y-2 marker:text-brand-500">
              <li><strong className="text-slate-800">بيانات الحساب:</strong> الاسم، البريد الإلكتروني، والصورة الشخصية (في حال التسجيل عبر Google).</li>
              <li><strong className="text-slate-800">بيانات المطعم:</strong> اسم المطعم، رابط المعرف (Slug)، الوصف، رقم الواتساب، وسعر الصرف المعتمد.</li>
              <li><strong className="text-slate-800">محتوى القائمة:</strong> أسماء الأصناف، الصور، الأسعار، والأقسام المضافة.</li>
            </ul>
          </section>

          <hr className="border-slate-100" />

          {/* البند الثاني */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600 text-xs">2</span>
              كيف نستخدم بياناتك؟
            </h2>
            <p>
              نستخدم البيانات التي نجمعها للأغراض التالية فقط:
            </p>
            <ul className="list-disc list-inside space-y-2 marker:text-brand-500">
              <li>إنشاء وإدارة حسابك ولوحة التحكم الخاصة بمطعمك.</li>
              <li>عرض قائمة الطعام الخاصة بك (Q-Menu) لزبائنك عند مسح كود الـ QR.</li>
              <li>إرسال الإشعارات والتنبيهات الهامة المتعلقة بحالة اشتراكك أو تفعيل حسابك عبر البريد الإلكتروني.</li>
              <li>تحسين أداء المنصة وتطوير تجربة المستخدم.</li>
            </ul>
          </section>

          <hr className="border-slate-100" />

          {/* البند الثالث */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600 text-xs">3</span>
              مشاركة البيانات مع أطراف خارجية
            </h2>
            <p>
              <strong className="text-slate-900">نحن لا نبيع ولا نؤجر بياناتك الشخصية أو بيانات مطعمك لأي طرف ثالث نهائياً.</strong> يتم مشاركة بعض البيانات المشفرة فقط مع خدمات سحابية موثوقة ونشطة لضمان عمل المنصة (مثل خوادم قاعدة البيانات ونظام إرسال البريد الإلكتروني وخوادم استضافة الصور).
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* البند الرابع */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600 text-xs">4</span>
              أمان وحماية البيانات
            </h2>
            <p>
              نحن نطبق معايير برمجية وأمنية صارمة للحفاظ على سلامة بياناتك، بما في ذلك تشفير الاتصالات عبر بروتوكول HTTPS، واستخدام قواعد بيانات سحابية آمنة ومحمية بقواعد وصول صارمة لتأمين جلسات تسجيل الدخول والبيانات الحساسة.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* البند الخامس */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600 text-xs">5</span>
              حقوقك والتحكم في بياناتك
            </h2>
            <p>
              يحق لك في أي وقت تعديل بيانات مطعمك أو حذف المنيو أو طلب تعديل بيانات حسابك مباشرة من خلال لوحة التحكم الخاصة بك، كما يمكنك التواصل مع الدعم الفني لحذف حسابك كلياً من المنصة متى أردت.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* البند السادس */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600 text-xs">6</span>
              التواصل معنا
            </h2>
            <p>
              إذا كان لديك أي استفسار أو سؤال حول سياسة الخصوصية وكيفية التعامل مع بياناتك، يمكنك التواصل معنا عبر البريد الإلكتروني الخاص بالدعم أو عبر وسائل التواصل المتاحة في المنصة.
            </p>
          </section>

        </div>

        {/* تذييل الصفحة */}
        <div className="text-center pb-6 text-xs text-slate-400">
          جميع الحقوق محفوظة © {new Date().getFullYear()} Q-Menu.
        </div>

      </div>
    </main>
  );
}