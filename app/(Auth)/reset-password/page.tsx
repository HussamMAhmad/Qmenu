import ResetPasswordForm from "@/components/forms/ResetPasswrodForm";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";


async function ResetPasswrord() {
  return (
    <div className="max-h-screen bg-slate-50/60 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/40 p-8">
        <div className="text-center mb-8">
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            كيومنيو<span className="text-brand-500">.</span>
          </span>
          <h1 className="text-xl font-bold text-slate-900 mt-4 mb-3">
            تعيين كلمة المرور
          </h1>
          <p className="text-xs text-slate-500">
            أدخل كلمة المرور الجديدة الخاصة بحسابك للتحديث
          </p>
        </div>
        <Suspense
          fallback={
            <div className="text-center py-4 text-xs text-slate-400">
              جاري التحميل...
              <Spinner />
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}

export default ResetPasswrord;
