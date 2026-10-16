"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search, Share2, Globe } from "lucide-react";
import { toast } from "sonner";

interface HeaderProps {
  restaurant: RestaurantMenu;
  lang: Lang;
  searchQuery: string;
  setLang: (lang: Lang) => void;
  setSearchQuery: (searchQuery: string) => void;
}

function Header({
  restaurant,
  lang,
  searchQuery,
  setLang,
  setSearchQuery,
}: HeaderProps) {
  const DEFAULT_HERO_COVER =
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop&q=80";

  const coverImg = DEFAULT_HERO_COVER;

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: restaurant.name,
          url: window.location.href,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success(
          lang === "ar" ? "تم نسخ الرابط بنجاح" : "Link copied successfully",
        );
      } catch (err) {
        console.error("Failed to copy link: ", err);
      }
    }
  }

  return (
    <header className="relative w-full h-56 sm:h-64 lg:h-72 bg-slate-950 overflow-hidden">
      <Image
        src={coverImg}
        alt={restaurant.name}
        fill
        className="object-cover opacity-85"
        priority
        onError={(e: any) => {
          e.currentTarget.src = DEFAULT_HERO_COVER;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-50 via-slate-950/20 to-black/50"></div>
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center max-w-5xl mx-auto">
        <div className="flex-1 max-w-xs mx-3">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-500 absolute start-3 pointer-events-none" />
            <Input
              type="text"
              placeholder={
                lang === "ar"
                  ? `ابحث في ${restaurant.name}...`
                  : `Search ${restaurant.name}...`
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-9 pe-4 h-10 rounded-full bg-white/95 backdrop-blur-md border-0 text-xs shadow-lg focus-visible:ring-brand-500 text-slate-900 placeholder:text-slate-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="secondary"
            onClick={handleShare}
            className="rounded-full w-10 h-10 bg-white/90 backdrop-blur-md shadow-md text-slate-800 hover:bg-white"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="rounded-full bg-white/90 backdrop-blur-md border-0 text-slate-900 hover:bg-white text-xs px-3 h-10 shadow-md font-bold"
          >
            <Globe className="w-3.5 h-3.5 text-brand-500 me-1" />
            <span>{lang === "ar" ? "EN" : "عربي"}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
