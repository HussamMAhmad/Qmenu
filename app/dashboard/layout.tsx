import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardLayoutContent from "@/components/dashboard/DashboardLayoutContent";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: { userId: session.user.id },
    select: { name: true },
  });

  if (!restaurant) {
    redirect("/onboarding");
  }

  return (
    <DashboardLayoutContent
      restaurantName={restaurant.name}
      userName={session.user.name || session.user.email}
    >
      {children}
    </DashboardLayoutContent>
  );
}
