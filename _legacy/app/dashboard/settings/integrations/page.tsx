import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChevronRight, ExternalLink, Workflow } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Session } from "src/auth";
import dbConnect from "src/lib/db";
import {
  Icon,
  INTEGRATION_DESCRIPTIONS,
  INTEGRATIONS,
} from "src/lib/integrations";
import User from "src/models/user";
import { getSession } from "~/auth/server";

export const metadata: Metadata = {
  title: "Integrations - Settings",
  description: "Connect your workspace with third-party tools.",
};

export const dynamic = 'force-dynamic';

export default async function IntegrationPage() {
  const session = (await getSession()) as Session;

  await dbConnect();
  const user = await User.findById(session.user.id)
    .select("integrations")
    .exec();

  // Ensure robust fallback if integrations object is missing or malformed
  const userIntegrations = user?.integrations ? JSON.parse(JSON.stringify(user.integrations)) : {};

  return (
    <div className="min-h-screen w-full ">


      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">

        {/* --- Header --- */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Workflow className="w-6 h-6 text-primary" />
              Integrations
            </h1>
            <p className="text-muted-foreground mt-1">
              Supercharge your workflow by connecting your favorite tools.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/docs/integrations" target="_blank">
              Documentation <ExternalLink className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <Separator className="mb-8 opacity-50" />

        <Suspense fallback={<IntegrationSkeleton />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INTEGRATIONS.map((integrationKey) => {
              const isConnected = userIntegrations[integrationKey]?.integrated;

              return (
                <Link
                  href={`/dashboard/settings/integrations/${integrationKey}`}
                  key={integrationKey}
                  className={cn(
                    "group relative flex flex-col p-6 rounded-2xl border transition-all duration-300",
                    "bg-card hover:bg-card/80 hover:shadow-xl hover:-translate-y-1",
                    isConnected
                      ? "border-primary/20 shadow-primary/5"
                      : "border-border/50 shadow-sm"
                  )}
                >
                  {/* Header: Icon & Status */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-14 w-14 rounded-xl bg-muted/30 border border-border/50 flex items-center justify-center p-2.5">
                      <Icon icon={integrationKey} className="w-full h-full object-contain" />
                    </div>

                    <Badge
                      variant={isConnected ? "default" : "outline"}
                      className={cn(
                        "capitalize font-medium transition-colors",
                        isConnected
                          ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20"
                          : "text-muted-foreground bg-background"
                      )}
                    >
                      {isConnected ? (
                        <span className="flex items-center gap-1.5">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          Active
                        </span>
                      ) : (
                        "Connect"
                      )}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-bold capitalize text-foreground group-hover:text-primary transition-colors">
                      {integrationKey}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {INTEGRATION_DESCRIPTIONS[integrationKey]}
                    </p>
                  </div>

                  {/* Footer Action */}
                  <div className="mt-6 flex items-center text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {isConnected ? "Manage Settings" : "Setup Integration"}
                    <ChevronRight className="ml-auto w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Suspense>

      </div>
    </div>
  );
}

function IntegrationSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-[200px] rounded-2xl border border-border/50 bg-card/30 p-6 space-y-6 animate-pulse">
          <div className="flex justify-between">
            <div className="h-14 w-14 rounded-xl bg-muted/50" />
            <div className="h-6 w-20 rounded-full bg-muted/50" />
          </div>
          <div className="space-y-2">
            <div className="h-5 w-1/2 rounded bg-muted/50" />
            <div className="h-4 w-full rounded bg-muted/30" />
            <div className="h-4 w-3/4 rounded bg-muted/30" />
          </div>
        </div>
      ))}
    </div>
  )
}