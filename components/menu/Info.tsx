import Image from "next/image";
import { Utensils } from "lucide-react";

function Info({ restaurant }: { restaurant: RestaurantMenu }) {
  return (
    <div className="px-4 sm:px-8 -mt-12 relative z-20 flex items-end justify-between gap-3 sm:gap-4 max-w-5xl mx-auto">
      <div className="flex min-w-0 flex-1 items-end gap-3 sm:gap-4">
        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl bg-brand-100 p-2 shadow-xl border-4 border-brand-50 shrink-0 overflow-hidden">
          {/* `            <Image
              src={restaurant.qrSetting.qrLogo}
              alt={restaurant.name}
              width={112}
              height={112}
              className="object-cover w-full h-full rounded-2xl"
              onError={(e: any) => {
                e.currentTarget.src = DEFAULT_HERO_COVER;
              }}
            />` */}
          <div className="w-full h-full bg-brand-50 rounded-2xl flex items-center justify-center text-brand-500">
            <Utensils className="w-10 h-10" />
          </div>
        </div>

        <div className="min-w-0 flex-1 pb-1">
          <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight break-words">
            {restaurant.name}
          </h1>

          {restaurant.description && (
            <div className="mt-1.5 text-xs sm:text-sm text-slate-600 font-medium overflow-hidden relative max-w-full line-clamp-2 break-words">
              <div className="inline-block max-w-full">
                <span className="inline-block px-2">
                  {restaurant.description}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Info;
