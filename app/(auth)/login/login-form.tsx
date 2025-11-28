"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { authClient } from "src/auth/client";
import * as z from "zod";

const FormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(5)
    .max(100),
  password: z
    .string()
    .min(1, { message: "Password is required." }),
  rememberMe: z.boolean().optional(),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || searchParams?.get("redirect") || "/dashboard";
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: callbackUrl,
        rememberMe: data.rememberMe,
      },
      {
        onRequest: () => setIsLoading(true),
        onResponse: () => setIsLoading(false),
        onSuccess: () => {
          toast.success("Welcome back!");
          router.push(callbackUrl);
        },
        onError: (ctx) => {
          if (ctx.error.status === 403) {
            toast.error("Please verify your email address first.");
          } else {
            toast.error(ctx.error.message || "Invalid credentials.");
          }
        },
      }
    );
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
      errorCallbackURL: "/auth/sign-in?error=social",
    });
    // Loading state persists until redirect happens
  };

  return (
    <div className={cn("grid gap-6 w-full max-w-sm mx-auto", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="sr-only">Email</FormLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                    <Mail className="h-4 w-4" />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      className="pl-9 h-10"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="sr-only">Password</FormLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                    <Lock className="h-4 w-4" />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="current-password"
                      disabled={isLoading}
                      className="pl-9 h-10"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              </FormItem>
            )}
          />

          <Button disabled={isLoading} type="submit" className="w-full h-10 font-semibold shadow-sm">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Sign In with Email"
            )}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <Button
        variant="outline"
        size="lg"
        type="button"
        disabled={isLoading}
        onClick={handleGoogleSignIn}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <FcGoogle />
        )}
        Google
      </Button>
    </div>
  );
}