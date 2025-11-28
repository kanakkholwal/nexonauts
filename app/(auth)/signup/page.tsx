import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "~/auth/server";
import { registerUser } from "./action";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Sign Up - NexoNauts",
  description: "Join the developer ecosystem.",
};

interface PageProps {
  searchParams: Promise<{
    redirect?: string;
  }>;
}

export default async function SignupPage({ searchParams }: PageProps) {
  const session = await getSession();
  if (session) return redirect("/dashboard");

  const params = await searchParams;
  const redirect_path = params?.redirect;

  // Toggle this for waitlist mode
  const IS_WAITLIST_MODE = false;

  return (
    <div className="w-full flex flex-col gap-6">

      {/* Top Navigation */}
      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <Link
          href={`/login${redirect_path ? `?redirect=${redirect_path}` : ""}`}
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Already have an account? <span className="font-semibold text-foreground hover:underline">Log in</span>
        </Link>
      </div>

      {IS_WAITLIST_MODE ? (
        // --- WAITLIST MODE ---
        <div className="flex flex-col items-center text-center space-y-6 max-w-sm mx-auto py-10">
          <div className="h-14 w-14 bg-muted/50 rounded-full flex items-center justify-center border border-white/10">
            <Lock className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Private Beta</h1>
            <p className="text-muted-foreground">
              We are currently onboarding users by invitation only. Join the waitlist to secure your spot.
            </p>
          </div>

          <div className="w-full space-y-3">
            <Button className="w-full h-11" asChild>
              <Link href="/waitlist">
                Join Waitlist <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button variant="ghost" className="w-full" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      ) : (
        // --- STANDARD SIGNUP ---
        <>
          <div className="flex flex-col space-y-2 text-center mb-4">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Start building your developer identity today.
            </p>
          </div>

          <div className="grid gap-6">
            <RegisterForm registerUser={registerUser} />
          </div>

          <p className="px-8 text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </>
      )}
    </div>
  );
}