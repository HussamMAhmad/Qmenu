import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PublicMenu from "@/components/menu/PublicMenu";

export default async function MenuPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    include: {
      categories: {
        include: {
          items: {
            where: { isAvailable: true },
            orderBy: { createdAt: "desc" },
          },
        },
      },
      qrSetting: true,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return <PublicMenu restaurant={restaurant} />;
}