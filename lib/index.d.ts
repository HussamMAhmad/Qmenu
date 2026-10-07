interface USER {
  name: string;
  email: string;
  password: string;
}

interface RestaurantOnboarding {
  name: string;
  description?: string;
  exchangeRate: number;
  whatsappNumber?: string;
  subscriptionEnd?: Date;
  showUSD?: boolean;
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
  categoryId: string;
  nameAr: string;
  nameEn?: string;
  description?: string ;
  priceSyp: number;
  priceUsd: number;
  prepTime?: string ;
  isAvailable: boolean;
};