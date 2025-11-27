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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Globe, Mail, Send, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
// import { useSession } from "~/auth/client"; // Uncomment if you have auth

// --- Design Utilities ---
import { cn } from "@/lib/utils";

// Same Schema as before
const FormSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().min(5).max(100),
  message: z.string().min(30).max(5000),
  category: z.string().min(1, { message: "Please select a topic" }),
  companyName: z.string().max(100).optional(),
  website: z.string().max(100).optional(),
});

const CATEGORIES = [
  "Brand Strategy",
  "Marketing / Ads",
  "Development",
  "Design / UI & UX",
  "Partnerships",
  "Other",
];

export function ContactForm() {
  // const { data: session } = useSession(); // Uncomment if needed
  const session = { user: { name: "", email: "" } }; // Mock for demo
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      message: "",
      category: "",
      companyName: "",
      website: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    // Simulate API call
    console.log(data);

    // Replace with your actual fetch
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Message sent successfully!");
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* Row 1: Name & Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold ml-1">Name</FormLabel>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground/50" />
                  <FormControl>
                    <Input placeholder="John Doe" className="pl-10 bg-background/50 border-border/50 focus:bg-background transition-all" {...field} disabled={isLoading} />
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
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold ml-1">Email</FormLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground/50" />
                  <FormControl>
                    <Input placeholder="john@example.com" className="pl-10 bg-background/50 border-border/50 focus:bg-background transition-all" {...field} disabled={isLoading} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Row 2: Company & Website */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold ml-1">Company</FormLabel>
                <div className="relative">
                  <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground/50" />
                  <FormControl>
                    <Input placeholder="Acme Inc." className="pl-10 bg-background/50 border-border/50 focus:bg-background transition-all" {...field} disabled={isLoading} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold ml-1">Website</FormLabel>
                <div className="relative">
                  <Globe className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground/50" />
                  <FormControl>
                    <Input placeholder="https://..." className="pl-10 bg-background/50 border-border/50 focus:bg-background transition-all" {...field} disabled={isLoading} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Category Selection - Visual Tiles */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold ml-1">Topic</FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {CATEGORIES.map((item) => (
                    <label
                      key={item}
                      className={cn(
                        "cursor-pointer text-sm border rounded-xl px-4 py-3 transition-all duration-200 text-center hover:bg-muted/50",
                        field.value === item
                          ? "bg-primary/10 border-primary/50 text-primary font-medium ring-1 ring-primary/20"
                          : "bg-background/50 border-border/50 text-muted-foreground"
                      )}
                    >
                      <input
                        type="radio"
                        value={item}
                        className="sr-only"
                        onChange={field.onChange}
                        checked={field.value === item}
                        disabled={isLoading}
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message Area */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold ml-1">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your project..."
                  className="min-h-[150px] resize-none bg-background/50 border-border/50 focus:bg-background transition-all"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Action */}
        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-12 text-base shadow-lg shadow-primary/20"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Message"}
          {!isLoading && <Send className="ml-2 w-4 h-4" />}
        </Button>
      </form>
    </Form>
  );
}