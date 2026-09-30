import Link from "next/link";
import Image from "next/image";
import { google } from "@/public/assets";
import SignInForm from "@/components/forms/SignInForm";

function SignIn() {
  return (
    <div className="max-w-md w-full mx-auto my-auto">
      <div className="mb-8 text-right">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">
          مرحباً بعودتك مجدداً
        </h2>
        <p className="text-slate-500 text-sm font-medium">
          سجّل دخولك للوصول إلى لوحة تحكم مطعمك ومتابعة الطلبات.
        </p>
      </div>

      <button
        type="button"
        className="w-full py-3 px-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-sm transition-all flex items-center justify-center gap-3 mb-6 cursor-pointer"
      >
        <Image src={google} alt="google" width={20} height={20} />
        <span>المتابعة باستخدام Google</span>
      </button>

      <div className="relative flex items-center justify-center mb-6">
        <div className="border-t border-slate-200 w-full" />
        <span className="bg-white px-4 text-xs font-semibold text-slate-400 uppercase shrink-0">
          أو عبر البريد الإلكتروني
        </span>
        <div className="border-t border-slate-200 w-full" />
      </div>

      <SignInForm />
      <Link
        href="/sign-up"
        className="block text-center mt-5 max-w-md w-full mx-auto text-xs sm:text-sm font-bold text-brand-500 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-100 px-4 py-2 rounded-xl transition-all cursor-pointer"
      >
        ليس لديك حساب؟ أنشئ حسابك
      </Link>
    </div>
  );
}

export default SignIn;
