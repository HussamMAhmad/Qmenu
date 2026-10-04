import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: ReactNode;
  valueSuffix?: ReactNode;
  subtext?: ReactNode;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
}

export function OverviewCard({
  title,
  value,
  valueSuffix,
  subtext,
  icon: Icon,
  iconBgColor = "bg-brand-50",
  iconColor = "text-brand-600",
}: StatCardProps) {
  return (
    <Card className="rounded-[24px] border-slate-200/70 bg-white shadow-sm transition-all hover:shadow-md">
      <CardContent className="flex items-center justify-between p-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400">{title}</p>
          
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-950">{value}</span>
            {valueSuffix && (
              <span className="text-xs font-bold text-slate-400">
                {valueSuffix}
              </span>
            )}
          </div>

          {subtext && (
            <div className="text-[11px] font-medium leading-tight">
              {subtext}
            </div>
          )}
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors ${iconBgColor} ${iconColor}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}