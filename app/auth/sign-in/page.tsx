import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "~/auth/server";
import { UserAuthForm } from "./sign-in-form";

export const metadata: Metadata = {
  title: "Sign In - NexoNauts",
  description: "Access your developer dashboard.",
};

interface PageProps {
  searchParams: Promise<{
    redirect?: string;
  }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const session = await getSession();
  if (session) return redirect("/dashboard");

  const params = await searchParams;
  const redirect_path = params?.redirect;

  return (
    <div className="w-full flex flex-col gap-6">

      {/* Top Navigation (Absolute relative to the right column container) */}
      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <Link
          href={`/signup${redirect_path ? `?redirect=${redirect_path}` : ""}`}
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Don{"'"}t have an account? <span className="font-semibold text-foreground hover:underline">Sign Up</span>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col space-y-2 text-center mb-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your workspace.
        </p>
      </div>

      {/* Form */}
      <div className="grid gap-6">
        <UserAuthForm />
      </div>

      {/* Footer / Legal (Optional context) */}
      <p className="px-8 text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}