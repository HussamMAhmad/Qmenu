import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

function EmptyCard() {
  return (
    <Card className="rounded-[24px] border-dashed border-slate-200 bg-white/80 shadow-none">
      <CardContent className="flex flex-col items-center justify-center px-5 py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100/80 text-slate-400">
          <Search className="h-7 w-7" />
        </span>
        <h3 className="mt-4 text-base font-bold text-slate-800">
          لا توجد وجبات مطابقة
        </h3>
        <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
          جرّب اختيار قسم آخر من القائمة الجانبية.
        </p>
      </CardContent>
    </Card>
  );
}

export default EmptyCard;
