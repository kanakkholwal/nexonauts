"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  loggedIn: boolean;
  verifyUser: (token: string) => Promise<{ success: boolean; message: string }>;
}

export function UserAuthForm({
  className,
  loggedIn,
  verifyUser,
  ...props
}: UserAuthFormProps) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your credentials...");

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  useEffect(() => {
    let mounted = true;

    if (!token && !loggedIn) {
      router.push("/signup");
      return;
    }

    if (token) {
      verifyUser(token)
        .then((response) => {
          if (mounted) {
            setStatus("success");
            setMessage(response.message || "Email verified successfully!");
            toast.success("Verified!");

            // Redirect logic
            setTimeout(() => {
              router.push(loggedIn ? "/dashboard" : "/auth/sign-in");
            }, 2000);
          }
        })
        .catch((error) => {
          if (mounted) {
            setStatus("error");
            setMessage(error?.message || "Invalid or expired token.");
            toast.error("Verification failed");
          }
        });
    }

    return () => { mounted = false; };
  }, [token, loggedIn, router, verifyUser]);

  return (
    <div className={cn("w-full max-w-md mx-auto space-y-8 text-center", className)} {...props}>

      {/* --- Visual Indicator --- */}
      <div className="flex justify-center">
        <div className={cn(
          "h-20 w-20 rounded-full flex items-center justify-center border-4 transition-all duration-500",
          status === "loading" && "border-muted text-muted-foreground",
          status === "success" && "border-emerald-100 bg-emerald-50 text-emerald-600",
          status === "error" && "border-red-100 bg-red-50 text-red-600"
        )}>
          {status === "loading" && <Loader2 className="w-8 h-8 animate-spin" />}
          {status === "success" && <CheckCircle2 className="w-10 h-10 animate-in zoom-in duration-300" />}
          {status === "error" && <XCircle className="w-10 h-10 animate-in zoom-in duration-300" />}
        </div>
      </div>

      {/* --- Text Content --- */}
      <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {status === "loading" && "Verifying Email"}
          {status === "success" && "You're all set!"}
          {status === "error" && "Verification Failed"}
        </h1>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          {message}
        </p>
      </div>

      {/* --- Actions --- */}
      <div className="pt-4 animate-in fade-in delay-200 duration-500">
        {status === "success" && (
          <p className="text-xs text-muted-foreground">
            Redirecting you in a moment...
          </p>
        )}

        {status === "error" && (
          <div className="flex flex-col gap-3">
            <Button onClick={() => router.push("/auth/sign-in")} className="w-full">
              Return to Login
            </Button>
            <Button variant="ghost" onClick={() => router.push("/contact")} className="w-full text-xs">
              Contact Support
            </Button>
          </div>
        )}
      </div>

    </div>
  );
}