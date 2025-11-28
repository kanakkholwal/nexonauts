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
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    const authorize = async () => {
      try {
        await saveAccessToken({ ...options }, platform);
        if (mounted) {
          setStatus("success");
          toast.success("Connected successfully");
          // Small delay before refresh to let user see success state
          setTimeout(() => {
            router.refresh();
            router.push("?", { scroll: false }); // Clear params
          }, 1500);
        }
      } catch (e: any) {
        if (mounted) {
          setStatus("error");
          setErrorMessage(e?.message || "Authorization failed");
          toast.error("Failed to connect");
        }
      }
    };

    authorize();

    return () => { mounted = false; };
  }, [options, platform, router, saveAccessToken]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-4 space-y-3">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <div className="text-center">
          <h3 className="font-semibold">Connecting to {platform}...</h3>
          <p className="text-sm text-muted-foreground">Please wait while we verify your credentials.</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center py-4 space-y-3 text-destructive">
        <AlertCircle className="h-8 w-8" />
        <div className="text-center">
          <h3 className="font-semibold">Connection Failed</h3>
          <p className="text-sm opacity-80">{errorMessage}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => router.push("?")}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-4 space-y-3 text-emerald-600">
      <CheckCircle2 className="h-8 w-8" />
      <div className="text-center">
        <h3 className="font-semibold">Successfully Connected</h3>
        <p className="text-sm opacity-80">Redirecting you back...</p>
      </div>
    </div>
  );
}

// --- REVOKE BUTTON ---
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