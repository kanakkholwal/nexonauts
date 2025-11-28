import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDistance } from "date-fns";
import { ArrowLeft, CheckCircle2, ShieldAlert, ShieldCheck } from "lucide-react";
import Link from "next/link";
import {
  Icon,
  Integration,
  INTEGRATION_CONFIG,
  INTEGRATION_DESCRIPTIONS,
} from "src/lib/integrations";
import { revokeToken, saveAccessToken } from "./actions";
import { Authorisor, RevokeTokenButton } from "./platform-client";

interface Props {
  searchParams: Promise<{
    code?: string;
  }>;
  params: Promise<{
    platform: string;
  }>;
}

export default async function PlatformPage(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  if (!INTEGRATION_CONFIG[params.platform]) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <ShieldAlert className="w-12 h-12 text-destructive" />
        <h2 className="text-xl font-semibold">Integration Not Found</h2>
        <Button asChild variant="outline"><Link href="/dashboard/settings/integrations">Go Back</Link></Button>
      </div>
    );
  }

  const integration = new Integration(params.platform);
  const isRedirected = !!searchParams?.code;
  const code = searchParams?.code as string;
  const integrationData = await integration.getIntegrationData();

  return (
    <div className="min-h-screen w-full">
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">

        {/* --- Navigation --- */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="pl-0 text-muted-foreground hover:text-foreground">
            <Link href="/dashboard/settings/integrations">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Integrations
            </Link>
          </Button>
        </div>

        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
          <div className="h-20 w-20 rounded-2xl bg-muted/30 border border-border/50 flex items-center justify-center p-4 shadow-sm">
            <Icon icon={params.platform} className="w-full h-full object-contain" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight capitalize flex items-center gap-3">
              {params.platform}
              {integrationData.integrated && (
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 gap-1.5 py-0.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Active
                </Badge>
              )}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {INTEGRATION_DESCRIPTIONS[params.platform]}
            </p>
          </div>
        </div>

        <Separator className="mb-10 opacity-50" />

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* Left Column: Context & Usage */}
          <div className="lg:col-span-2 space-y-10">

            {/* Auth Handler Area (Only shows if processing) */}
            {isRedirected && !integrationData.integrated && (
              <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                <Authorisor
                  options={{ code }}
                  saveAccessToken={saveAccessToken}
                  platform={params.platform}
                />
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Capabilities
              </h3>
              <div className="grid gap-4">
                {integration.usage_cases.map((useCase, index) => (
                  <div key={index} className="p-4 rounded-xl border border-border/50 bg-card/30">
                    <h4 className="font-medium text-foreground mb-1">{useCase.name}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Status & Actions */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-6">
                Connection Status
              </h3>

              {integrationData.integrated ? (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Connected since</p>
                    <p className="font-medium">
                      {formatDistance(new Date(integrationData.lastAuthorized), new Date(), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Permissions</p>
                    <p className="font-medium capitalize">{params.platform} Access</p>
                  </div>

                  <Separator />

                  <RevokeTokenButton
                    revokeToken={revokeToken}
                    platform={params.platform}
                  />
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Icon icon={params.platform} className="w-6 h-6 opacity-50 grayscale" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Not Connected</p>
                    <p className="text-sm text-muted-foreground">
                      Link your account to enable features.
                    </p>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={integration.getAuthUrl()}>
                      Connect {params.platform}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}