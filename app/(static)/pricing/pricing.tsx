"use client";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/utils/link";
import { cn } from "@/lib/utils";
import { Check, Shield, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

const pricing_plans = [
  {
    title: "Hobby",
    price: "0",
    description: "For individuals just getting started.",
    is_popular: false,
    icon: Sparkles,
    features: [
      "Basic search engine access",
      "Browse marketplace",
      "Submit 1 tool to platform",
      "Community support",
    ],
  },
  {
    title: "Pro",
    price: "4.99",
    description: "For creators shipping daily.",
    is_popular: true,
    icon: Zap,
    features: [
      "Advanced search filters",
      "Sell on marketplace",
      "Submit up to 5 tools",
      " Analytics dashboard",
      "Priority support",
    ],
  },
  {
    title: "Premium",
    price: "9.99",
    description: "For power users and teams.",
    is_popular: false,
    icon: Shield,
    features: [
      "Everything in Pro",
      "Featured marketplace spots",
      "Submit up to 15 tools",
      "API access (Beta)",
      "Dedicated account manager",
    ],
  },
];

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="w-full">

      {/* Optional: Billing Toggle (Visual only for now) */}
      <div className="flex justify-center mb-12">
        <div className="bg-muted/50 p-1 rounded-full inline-flex items-center relative">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
              billingCycle === "monthly" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
              billingCycle === "yearly" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Yearly
            <span className="text-[10px] bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
              -20%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {pricing_plans.map((plan, index) => {
          const Icon = plan.icon;

          return (
            <div
              key={index}
              className={cn(
                "relative flex flex-col p-8 rounded-3xl transition-all duration-300",
                plan.is_popular
                  ? "bg-card border-2 border-primary/50 shadow-2xl shadow-primary/10 z-10 scale-105"
                  : "bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-card/60"
              )}
            >
              {plan.is_popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <Badge variant="default" className="bg-primary hover:bg-primary text-primary-foreground px-4 py-1 rounded-full shadow-lg shadow-primary/20">
                    Most Popular
                  </Badge>
                </div>
              )}

              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center",
                    plan.is_popular ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground">{plan.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 min-h-[40px]">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-lg text-muted-foreground font-medium">$</span>
                <span className="text-5xl font-bold text-foreground tracking-tight">{plan.price}</span>
                <span className="text-muted-foreground">/mo</span>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className="mt-1 shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <ButtonLink
                href={`/signup?plan=${plan.title.toLowerCase()}`}
                variant={plan.is_popular ? "default" : "outline"}
                className={cn(
                  "w-full rounded-xl h-12 font-semibold",
                  plan.is_popular
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
                    : "bg-transparent border-border hover:bg-muted"
                )}
              >
                {plan.price === "0" ? "Start for free" : "Subscribe Now"}
              </ButtonLink>

              {plan.price === "0" && (
                <p className="text-xs text-center mt-4 text-muted-foreground">
                  No credit card required
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* --- Trust / Enterprise Footer --- */}
      <div className="mt-20 border-t border-border/50 pt-10 text-center">
        <p className="text-muted-foreground">
          Building something bigger?{" "}
          <a href="/contact" className="text-primary font-medium hover:underline">
            Contact our Enterprise team
          </a>
          {" "}for custom limits and volume pricing.
        </p>
      </div>

    </section>
  );
}