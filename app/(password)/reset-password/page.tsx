import ResetPasswordForm from "@/components/forms/ResetPasswrodForm";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

async function ResetPasswrord() {
  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/50 to-slate-100 font-cairo flex items-center justify-center p-4 sm:p-6" dir="rtl">
  <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-2xl shadow-slate-200/50 p-8 sm:p-10 transition-all">
    
    <div className="text-center mb-8 space-y-2">
      <div className="inline-block mb-2">
        <span className="text-2xl font-black text-slate-900 tracking-tight">
          كيومنيو<span className="text-brand-500">.</span>
        </span>
      </div>
      
      <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
        تعيين كلمة المرور الجديدة
      </h1>
      
      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
        أدخل كلمة مرور قوية وآمنة لحسابك حتى تتمكن من تسجيل الدخول من جديد
      </p>
    </div>
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center py-10 space-y-3">
          <Spinner className="h-6 w-6 text-brand-500 animate-spin" />
          <p className="text-xs font-medium text-slate-400">جاري التحميل...</p>
        </div>
      }
    >
      <div className="space-y-4">
        <ResetPasswordForm />
      </div>
    </Suspense>
  </div>
</div>
  );
}

export default ResetPasswrord;
