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
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Loader2, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "src/auth/client";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
});

interface Props {
  registerUser: (data: { name: string; email: string; password: string }) => Promise<{ success: boolean; message: string }>;
}

export function RegisterForm({ registerUser }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams?.get("redirect") || "/dashboard";

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);

    // 1. Register User in DB
    try {
      await registerUser(data);

      // 2. Trigger Auth Sign Up
      await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        username: data.email.split("@")[0], // Simple username derivation
        callbackURL: redirect,
      }, {
        onSuccess: () => {
          setSuccess(true);
          toast.success("Account created!");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setLoading(false);
        }
      });
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
      setLoading(false);
    }
  }

  const handleGoogleSignUp = async () => {
    setLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirect,
      errorCallbackURL: "/auth/sign-up?error=social",
    });
  };

  // --- SUCCESS STATE ---
  if (success) {
    return (
      <div className="flex flex-col items-center text-center space-y-6 py-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="h-16 w-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-500/20">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">Verify your email</h2>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            We{"'"}ve sent a verification link to <span className="font-medium text-foreground">{form.getValues("email")}</span>. Please check your inbox.
          </p>
        </div>
        <Button className="w-full" asChild>
          <Link href={`/auth/sign-in?redirect=${redirect}`}>
            Proceed to Login <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    )
  }

  // --- FORM STATE ---
  return (
    <div className="space-y-6 w-full max-w-sm mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="sr-only">Full Name</FormLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                    <User className="h-4 w-4" />
                  </div>
                  <FormControl>
                    <Input placeholder="John Doe" disabled={loading} className="pl-9 h-10" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    <Input type="email" placeholder="name@example.com" disabled={loading} className="pl-9 h-10" {...field} />
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
                    <Input type="password" placeholder="Create a password" disabled={loading} className="pl-9  h-10" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="w-full h-10 font-semibold shadow-sm">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
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
        type="button"
        size="lg"
        width="full"
        disabled={loading}
        onClick={handleGoogleSignUp}
      >
        {loading ? <Loader2 className="animate-spin" /> : <FcGoogle />}
        Google
      </Button>
    </div>
  );
}