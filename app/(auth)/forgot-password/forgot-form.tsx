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
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { authClient } from "src/auth/client";
import * as z from "zod";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function ForgotPasswordForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: "/reset-password",
      });
      setIsSuccess(true);
      toast.success("Reset link sent!");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  // --- Success State ---
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in-95">
        <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
          <Mail className="h-6 w-6" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Check your email</h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            We've sent a password reset link to <span className="font-medium text-foreground">{form.getValues("email")}</span>.
          </p>
        </div>
        <Button variant="outline" className="w-full mt-4" onClick={() => setIsSuccess(false)}>
          Try another email
        </Button>
      </div>
    )
  }

  // --- Form State ---
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

          <Button disabled={isLoading} type="submit" className="w-full h-10 font-semibold shadow-sm">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <Link href="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft className="mr-2 w-3 h-3 transition-transform group-hover:-translate-x-1" />
          Back to Login
        </Link>
      </div>
    </div>
  );
}