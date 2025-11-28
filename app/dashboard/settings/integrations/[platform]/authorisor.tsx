"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightLeft, CheckCircle2, Command, Loader2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// Assuming you have access to the Icon component here to render platform logos
import { Icon } from "src/lib/integrations";

// --- AUTHORISOR COMPONENT ---
export function Authorisor({
  options,
  saveAccessToken,
  platform,
}: {
  options: Record<string, any>;
  platform: string;
  saveAccessToken: (options: Record<string, any>, platform: string) => Promise<any>;
}) {
  const router = useRouter();
  // States: 'initiating' -> 'loading' -> 'success' | 'error'
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    const authorize = async () => {
      try {
        // Artificial delay for visual continuity if the backend is too fast
        await new Promise(resolve => setTimeout(resolve, 800));

        await saveAccessToken({ ...options }, platform);

        if (mounted) {
          setStatus("success");
          toast.success(`Connected to ${platform}`);
          // Delay before redirect to let user see the success state
          setTimeout(() => {
            router.refresh();
            router.push("?", { scroll: false });
          }, 2000);
        }
      } catch (e: any) {
        if (mounted) {
          setStatus("error");
          setErrorMessage(e?.message || "Authorization failed. Please try again.");
          toast.error("Connection failed");
        }
      }
    };

    authorize();

    return () => { mounted = false; };
  }, [options, platform, router, saveAccessToken]);

  return (
    <div className="bg-card border border-border/50 rounded-2xl p-8 max-w-md mx-auto shadow-sm">

      {/* --- Visual Connection Flow --- */}
      <div className="flex items-center justify-between mb-8 px-4">
        {/* Left Icon (Our App) */}
        <div className="relative z-10 h-16 w-16 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center p-3">
          <Command className="w-8 h-8 text-muted-foreground" />
        </div>

        {/* Central Connector Animation */}
        <div className="flex-1 flex justify-center relative px-4">
          {/* Connector Line Background */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border/50 -translate-y-1/2 z-0" />

          {/* Status Indicator */}
          <div className={cn(
            "relative z-10 h-12 w-12 rounded-full border-4 flex items-center justify-center bg-background transition-all duration-500",
            status === "loading" && "border-primary/20",
            status === "success" && "border-emerald-500/20 bg-emerald-500/10",
            status === "error" && "border-destructive/20 bg-destructive/10"
          )}>
            {status === "loading" && (
              <ArrowRightLeft className="w-5 h-5 text-primary animate-pulse" />
            )}
            {status === "success" && (
              <CheckCircle2 className="w-6 h-6 text-emerald-500 animate-in zoom-in duration-300" />
            )}
            {status === "error" && (
              <XCircle className="w-6 h-6 text-destructive animate-in zoom-in duration-300" />
            )}
          </div>
        </div>

        {/* Right Icon (Target Platform) */}
        <div className="relative z-10 h-16 w-16 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center p-3">
          <Icon icon={platform} className="w-full h-full object-contain" />
        </div>
      </div>

      {/* --- Text Status --- */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold tracking-tight capitalize">
          {status === "loading" && `Connecting to ${platform}...`}
          {status === "success" && "Connection Successful!"}
          {status === "error" && "Connection Failed"}
        </h3>

        <p className={cn("text-sm transition-colors duration-300",
          status === "error" ? "text-destructive" : "text-muted-foreground"
        )}>
          {status === "loading" && "Verifying credentials and establishing secure link."}
          {status === "success" && "Redirecting you back to settings..."}
          {status === "error" && errorMessage}
        </p>
      </div>

      {/* --- Error Action --- */}
      {status === "error" && (
        <div className="mt-6 flex justify-center">
          <Button variant="outline" onClick={() => router.push("?")}>
            Return to Settings
          </Button>
        </div>
      )}
    </div>
  );
}

// --- REVOKE BUTTON (Unchanged but included for context) ---
export function RevokeTokenButton({
  revokeToken,
  platform,
}: {
  revokeToken: (platform: string) => Promise<boolean>;
  platform: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full bg-red-500/10 text-red-600 hover:bg-red-500/20 border border-red-500/20 shadow-none">
          Disconnect Integration
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Disconnect {platform}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove the access token and stop any active syncs. You can always reconnect later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={async (e) => {
              e.preventDefault();
              setLoading(true);
              try {
                await revokeToken(platform);
                toast.success("Disconnected successfully");
                router.refresh();
              } catch (error) {
                toast.error("Failed to disconnect");
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {loading ? "Disconnecting..." : "Confirm Disconnect"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}