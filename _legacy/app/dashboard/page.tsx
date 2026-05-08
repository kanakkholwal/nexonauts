import { Separator } from "@/components/ui/separator";

import { RouterCard } from "@/components/extended/router-card";
import { Settings2, ShoppingCart, UserRound } from "lucide-react";
import { Metadata } from "next";
import { RiApps2Line } from "react-icons/ri";
import { getSession } from "~/auth/server";

export const metadata: Metadata = {
  title: "Dashboard | " + process.env.NEXT_PUBLIC_WEBSITE_NAME,
  description: "Dashboard page",
};

export const dynamic = 'force-dynamic';

const ROUTES = [
  {
    href: "/dashboard/products",
    title: "Products",
    description: "Manage your products",
    Icon: ShoppingCart,
  },
  {
    href: "/dashboard/tools",
    title: "Tools",
    description: "Manage your tools",
    Icon: RiApps2Line,
  },
  {
    href: "/dashboard/settings/profile",
    title: "Profile",
    description: "Manage your profile",
    Icon: UserRound,
  },
  {
    href: "/dashboard/settings",
    title: "Settings",
    description: "Manage your settings",
    Icon: Settings2,
  },
];

export default async function DashboardPage() {
  const session = await getSession();

  return (
    <div className="space-y-6 p-4 md:p-10 pb-16 w-full @container">
      <div>

        <h1 className="text-lg font-semibold">Dashboard</h1>
        <p className="text-sm font-medium text-muted-foreground">
          Welcome back, {session?.user?.name}
        </p>
      </div>
      <Separator />
      <div className="grid gap-4 grid-cols-1 @4xl:grid-cols-4 @2xl:grid-cols-3 @sm:grid-cols-2">
        {ROUTES.map((route, index) => (
          <RouterCard key={index} {...route} />
        ))}
      </div>
    </div>
  );
}
