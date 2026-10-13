import Link from "next/link";
import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";

export default function SecuritySection() {
  return (
   <div className="space-y-4">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
    {/* الجزء الأيسر: الأيقونة والنصوص */}
    <div className="flex items-start sm:items-center gap-3">
      <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl shrink-0">
        <KeyRound className="h-5 w-5" />
      </div>
      <div className="space-y-0.5">
        <h4 className="text-xs font-bold text-slate-800">كلمة المرور والأمان</h4>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          حماية حسابك وتغيير كلمة المرور عبر رمز التحقق (OTP)
        </p>
      </div>
    </div>
    <Button
      asChild
      variant="outline"
      className="w-full sm:w-auto rounded-xl text-xs font-bold border-slate-200 bg-white hover:bg-slate-100 hover:text-brand-600 cursor-pointer h-10 shadow-sm transition-all"
    >
      <Link href="/forget-password">
        تغيير كلمة المرور
      </Link>
    </Button>
  </div>
</div>
  );
}