interface USER {
  name: string;
  email: string;
  password: string;
}

interface RestaurantOnboarding {
  slug: string;
  name: string;
  description?: string;
  exchangeRate: number;
  whatsappNumber?: string;
  subscriptionEnd?: Date;
}

interface VerifyEmailPageProps {
  searchParams: Promise<{ [key: string]: string }>;
}

type MenuItem = {
  id: string;
  nameAr: string;
  nameEn?: string | null;
  description?: string | null;
  priceSyp: number;
  priceUsd: number;
  prepTime?: string | null;
  isAvailable: boolean;
  imageUrl?: string | null;
};

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

type CreateItem = {
  id?: string;
  categoryId: string;
  nameAr: string;
  nameEn?: string | null;
  description?: string | null;
  priceSyp: number;
  priceUsd: number;
  prepTime?: string | null;
  isAvailable: boolean;
  imageUrl?: string | null;
};

interface QrSetting {
  qrColor: string;
  qrLogo?: string | null;
  qrSubtitle: string;
}

type RestaurantInfo = {
  name: string;
  description?: string | null;
  exchangeRate: number;
  whatsappNumber?: string | null;
  showUSD: boolean;
  imageCoverUrl?: string | null;
  logo?: string | null;
};

type Item = {
  id: string;
  categoryId: string;
  nameAr: string;
  nameEn?: string | null;
  description?: string | null;
  priceSyp: number;
  priceUsd: number;
  prepTime?: string | null;
  isAvailable: boolean;
  imageUrl?: string | null;
};

interface CategoryMenu {
  id: string;
  name: string;
  items: Item[];
}

interface RestaurantMenu {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  whatsappNumber?: string | null;
  showUSD: boolean;
  categories: CategoryMenu[];
  imageCoverUrl?: string | null;
  logo?: string | null;
}

type Lang = "ar" | "en";

interface CartItem extends Item {
  qty: number;
}
