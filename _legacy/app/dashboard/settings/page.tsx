import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  ShieldCheck,
  User,
  Workflow
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Settings - NexoNauts",
  description: "Manage your account and preferences.",
};

export const dynamic = 'force-dynamic';

const SETTINGS_MODULES = [
  {
    label: "Profile",
    description: "Manage your public identity, bio, and social connections.",
    icon: User,
    href: "/dashboard/settings/profile",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    borderColor: "group-hover:border-blue-500/20",
  },
  {
    label: "Account",
    description: "Update email, password, and security preferences.",
    icon: ShieldCheck, // Changed from UserRoundCog for better semantics
    href: "/dashboard/settings/account",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    borderColor: "group-hover:border-orange-500/20",
  },
  {
    label: "Integrations",
    description: "Connect third-party tools like Gumroad and GitHub.",
    icon: Workflow,
    href: "/dashboard/settings/integrations",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    borderColor: "group-hover:border-purple-500/20",
  },
];

export default async function SettingsPage() {
  return (
    <div className="min-h-screen w-full">


      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">

        {/* --- Header --- */}
        <div className="mb-10 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Settings
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Manage your account settings, preferences, and workspace integrations from one central hub.
          </p>
        </div>

        <Separator className="mb-10 opacity-50" />

        {/* --- Modules Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SETTINGS_MODULES.map((module, index) => {
            const Icon = module.icon;

            return (
              <Link
                key={module.href}
                href={module.href}
                className="group relative h-full"
              >
                <div
                  className={cn(
                    "relative h-full flex flex-col p-6 rounded-2xl bg-card border border-border/50 shadow-sm transition-all duration-300",
                    "hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1",
                    module.borderColor
                  )}
                >
                  {/* Header: Icon & Arrow */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center transition-colors",
                      module.bg,
                      module.color
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2 mt-auto">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {module.label}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {module.description}
                    </p>
                  </div>

                  {/* Subtle Glow Overlay */}
                  <div className={cn(
                    "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-transparent to-current pointer-events-none",
                    module.color
                  )} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* --- Optional: Quick Links / Support Footer --- */}
        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>Need help with your account?</p>
          <Link href="/contact" className="hover:text-foreground hover:underline transition-colors">
            Contact Support
          </Link>
        </div>

      </div>
    </div>
  );
}