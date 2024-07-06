"use client";
import { signIn } from "next-auth/react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { BiLockOpenAlt } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { LuMail } from "react-icons/lu";

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
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "sonner";
import * as z from "zod";

const FormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(5, { message: "Email must be at least 5 characters long" })
    .max(100, { message: "Email cannot exceed 100 characters" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password cannot exceed 50 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect") || "/feed";
  const callbackUrl = searchParams?.get("callbackUrl") || "/feed";

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    setIsLoading(true);

    toast.promise(signInPromise(data), {
      loading: "Logging in...",
      success: (data) => {
        console.log(data);
        setIsLoading(false);
        if (redirect) {
          router.push(redirect);
          return `Logged in successfully to ${redirect}`;
        } else if (callbackUrl) {
          router.push(callbackUrl);
          return `Logged in successfully to ${callbackUrl}`;
        }
        router.push("/feed");
        return `Logged in successfully to dashboard`;
      },
      error: (err) => {
        console.log(err);
        setIsLoading(false);
        return err.message || "An error occurred while logging in";
      },
    });
  }
  const signInPromise = async (data: { email: string; password: string }) =>
    new Promise(async (resolve, reject) => {
      try {
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        })
          .then((data) => {
            console.log(data);
            if (data && data.ok === false) {
              reject(data.error);
              return;
            } else if (data && data.ok === true) {
              resolve(data);
              return;
            }
            resolve(data);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      } catch (error: any) {
        reject(error);
      }
    });

  // <div className="grid w-full max-w-lg items-center gap-1.5">

  return (
    <div
      className={cn("grid gap-6 lg:max-w-lg text-left", className)}
      {...props}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="relative group">
                  <FormLabel className="absolute top-1/2 -translate-y-1/2 left-4 z-50">
                    <LuMail className="w-4 h-4" />
                  </FormLabel>
                  <FormControl className="relative">
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      disabled={isLoading}
                      autoCorrect="off"
                      className="pl-10 pr-5"
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
              <FormItem>
                <div className="relative group">
                  <FormLabel className="absolute top-1/2 -translate-y-1/2 left-4 z-50">
                    <BiLockOpenAlt className="w-4 h-4" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*********"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="password"
                      autoCorrect="off"
                      disabled={isLoading}
                      className="pl-10 pr-5 !mt-0"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-right mt-2 text-sm font-medium">
            <Link
              href="/forgot-password"
              className="text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </p>

          <Button
            disabled={isLoading}
            type="submit"
            className="mt-2 tracking-wide"
            variant="default"
          >
            {isLoading && (
              <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid  grid-cols-1">
        <Button
          variant="light"
          type="button"
          disabled={isLoading}
          width={"full"}
          onClick={async () => {
            setIsLoading(true);
            await signIn("google", { callbackUrl: redirect });
            setIsLoading(false);
          }}
        >
          {isLoading ? (
            <AiOutlineLoading className="h-6 w-6 animate-spin" />
          ) : (
            <FcGoogle className=" h-6 w-6" />
          )}
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </Button>
      </div>
    </div>
  );
}
