import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfServicePage() {
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
            حماية قانونية موثوقة
          </div>
        </div>

        {/* العنوان الرئيسي */}
        <div className="space-y-3 text-center sm:text-right">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-sm">
            <FileText className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            شروط الخدمة والاستخدام
          </h1>
          <p className="text-sm text-slate-500">
            آخر تحديث: {new Date().toLocaleDateString('ar-SA')} | يرجى قراءة هذه الشروط بعناية قبل استخدام منصة Q-Menu.
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-8 leading-relaxed text-slate-600 text-sm sm:text-base">
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600 text-xs">1</span>
              المقدمة والقبول
            </h2>
            <p>
              مرحباً بك في منصة <strong className="text-slate-900">Q-Menu</strong>. وصولك إلى منصتنا أو استخدامك لها يعني موافقتك التامة والالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يُرجى عدم استخدام الخدمة فوراً.
            </p>
          </section>

          <hr className="border-slate-100" />

          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600 text-xs">2</span>
              حساب المستخدم وأمن البيانات
            </h2>
            <ul className="list-disc list-inside space-y-2 marker:text-brand-500">
              <li>أنت مسؤول عن الحفاظ على سرية بيانات حسابك وكلمة المرور الخاصة بك.</li>
              <li>يجب أن تكون جميع البيانات المدخلة للمطعم (الاسم، الـ Slug، الأسعار، وأرقام التواصل) دقيقة وصحيحة.</li>
              <li>نحتفظ بحق تعليق أو إغلاق أي حساب يخالف معايير الأمان أو ينشر محتوى غير قانوني أو مضلل.</li>
            </ul>
          </section>

          <hr className="border-slate-100" />

          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600 text-xs">3</span>
              الفترة التجريبية والاشتراكات والمدفوعات
            </h2>
            <p>
              يحصل كل مطعم جديد على فترة تجريبية مجانية لمدة (14) يوماً مع صلاحيات محددة. بعد انتهاء الفترة التجريبية، يتطلب استمرار الخدمة ترقية الحساب إلى الاشتراك المدفوع المعتمد في المنصة. تتم عملية الدفع وتوثيق الاشتراكات عبر الوسائل المعتمدة (مثل الدفع الإلكتروني عبر Sham Cash أو الطرق المتاحة)، وجميع الاشتراكات غير قابلة للاسترداد بعد تفعيلها إلا في حالات استثنائية تقررها إدارة المنصة.
            </p>
          </section>

          <hr className="border-slate-100" />

          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600 text-xs">4</span>
              المحتوى المسؤول عنه المطعم
            </h2>
            <p>
              أنت المالك الوحيد والمسؤول تماماً عن الأطباق، الأسعار، الصور، والوصف المضاف ضمن منيو مطعمك. تلتزم بعدم رفع أي محتوى مخالف للشريعة الإسلامية، أو القوانين المعمول بها، أو حقوق الملكية الفكرية لجهات أخرى.
            </p>
          </section>

          <hr className="border-slate-100" />

          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600 text-xs">5</span>
              إخلاء المسؤولية وتحديد الأضرار
            </h2>
            <p>
              تُقدم منصة Q-Menu على أساس "كما هي" و"حسب التوفر". لا نضمن أن تكون الخدمة خالية تماماً من الأخطاء أو انقطاعات الإنترنت المفاجئة. لا تتحمل المنصة أي مسؤولية عن خسائر تجارية أو أرباح فائتة ناتجة عن استخدام المنصة أو تعطلها المؤقت.
            </p>
          </section>

          <hr className="border-slate-100" />

          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600 text-xs">6</span>
              تعديل الشروط
            </h2>
            <p>
              يحق لإدارة المنصة تعديل هذه الشروط في أي وقت، وسيتم إشعار المستخدمين بالتحديثات الجوهرية. استمرارك في استخدام الخدمة بعد التعديل يُعتبر موافقة ضمنية على الشروط المحدثة.
            </p>
          </section>

        </div>

        <div className="text-center pb-6 text-xs text-slate-400">
          جميع الحقوق محفوظة © {new Date().getFullYear()} Q-Menu.
        </div>

      </div>
    </main>
  );
}