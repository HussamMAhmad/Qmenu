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