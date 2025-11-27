import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";
//   import Image from "next/image";
import { User, UserRoundCog, Workflow } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Settings",
  description: "Settings page",
};

export const dynamic = 'force-dynamic';

const list = [
  {
    label: "Profile",
    description: "Manage your profile settings",
    icon: User,
    href: "/dashboard/settings/profile",
  },
  {
    label: "Account",
    description: "Manage your account settings",
    icon: UserRoundCog,
    href: "/dashboard/settings/account",
  },
  {
    label: "Integrations",
    description: "Manage your integrations",
    icon: Workflow,
    href: "/dashboard/settings/integrations",
  },
] as const;

export default async function SettingsPage() {
  return (
    <div className="space-y-6 p-4 md:p-10 pb-16 w-full  rounded-3xl mt-5 @container">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight" data-aos="fade-right">
          Settings
        </h2>
        <p
          className="text-muted-foreground"
          data-aos="fade-right"
          data-aos-delay={100}
        >
          Manage your account settings, site appearance and set e-mail
          preferences.
        </p>
      </div>
      <Separator className="my-6" data-aos="fade-right" data-aos-delay={110} />
      <div className="grid gap-4 grid-cols-1 @5xl:grid-cols-4  @md:grid-cols-2">
        {list.map((link, index) => {
          return (
            <Link
              key={link.href}
              href={link.href}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-offset="200"
            >
              <Card
                variant="glass"
                className="transition transform duration-300 hover:translate-x-1 hover:-translate-y-1 hover:shadow-lg cursor-pointer border p-10 h-full flex content-center flex-wrap"
              >
                <div className="h-fit w-full">
                  <div className="flex justify-center w-full">
                    <link.icon className="h-10 w-10" />
                  </div>
                  <CardTitle className="text-center mt-2">
                    {link.label}
                  </CardTitle>
                  <CardDescription className="text-center mt-4">
                    {link.description}
                  </CardDescription>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
