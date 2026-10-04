import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles , ArrowLeft} from "lucide-react";
import { Button } from "../ui/button";

function SubscriptionIsFree({ daysLeft }: { daysLeft: number }) {
  return (
    <Card className="overflow-hidden rounded-[28px] border-amber-200/70 bg-white shadow-sm">
      <CardContent className="relative overflow-hidden p-0">
        <div className="absolute inset-y-0 right-0 w-1.5 bg-brand-500" />
        <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-black text-slate-950">
                  أنت تستخدم الخطة المجانية
                </h3>
                <Badge className="rounded-full border-0 bg-amber-50 text-[10px] font-bold text-amber-700 hover:bg-amber-50">
                  يتبقى {daysLeft} يوم
                </Badge>
              </div>
              <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-500">
                يمكنك الترقية إلى الخطة المدفوعة للحصول على عدد أكبر من الوجبات
                ومزايا إضافية حسب باقتك.
              </p>
            </div>
          </div>
          <Button className="cursor-pointer h-11 gap-2 rounded-xl bg-brand-500 px-5 font-bold text-white hover:bg-brand-600">
            ترقية الاشتراك
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default SubscriptionIsFree;
