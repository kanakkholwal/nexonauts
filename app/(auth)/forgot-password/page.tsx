import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "~/auth/server";
import { ForgotPasswordForm } from "./forgot-form";

export const metadata: Metadata = {
  title: "Forgot Password - NexoNauts",
  description: "Reset your account password.",
};

export default async function ForgotPasswordPage() {
  const session = await getSession();
  if (session) return redirect("/dashboard");

  return (
    <div className="w-full flex flex-col gap-6">

      {/* Top Navigation */}
      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <Link
          href="/login"
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Remember your password? <span className="font-semibold text-foreground hover:underline">Log in</span>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col space-y-2 text-center mb-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Reset Password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we{"'"}ll send you a link to reset your password.
        </p>
      </div>

      {/* Form */}
      <div className="grid gap-6">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}