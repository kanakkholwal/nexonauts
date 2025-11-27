"use client";

import { AnimatedShinyText } from "@/components/animation/animated-shiny-text";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Check, Layout, ShoppingBag, Sparkles, UserCircle } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

// images
import aiToolsImg from "./assets/more_from_us_ai_tools.png";
import creatorsImg from "./assets/more_from_us_creators.png";
import portfolioImg from "./assets/more_from_us_portfolio.png";


type FeatureType = {
  id: string;
  badge: string;
  badgeIcon: React.ElementType;
  title: string;
  description: string;
  list: string[];
  url: string;
  image: StaticImageData | string;
  color: string; // For the ambient glow
};

const features: FeatureType[] = [
  {
    id: "portfolio",
    badge: "For Developers",
    badgeIcon: UserCircle,
    title: "Unified Developer Identity",
    description:
      "Stop sending ten different links to recruiters. Create a single, automated portfolio that aggregates your GitHub stats, projects, and resume into one stunning page.",
    list: [
      "Auto-syncs GitHub contributions",
      "Showcase projects with rich metadata",
      "Printable Resume generation",
    ],
    url: "/portfolio",
    image: portfolioImg,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "marketplace",
    badge: "Creator Economy",
    badgeIcon: ShoppingBag,
    title: "The Design Marketplace",
    description:
      "A dedicated space for UI designers and frontend engineers to buy and sell high-quality assets. From React templates to Figma UI kits, find the building blocks for your next big idea.",
    list: [
      "Import products from Gumroad",
      "Sell themes, icons, and UI kits",
      "Community-rated resources",
    ],
    url: "/marketplace",
    image: creatorsImg, // Replace with marketplace screenshot
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "ai-tools",
    badge: "Coming Soon",
    badgeIcon: Bot,
    title: "Specialized AI Agents",
    description:
      "Beyond simple chatbots. Access a suite of purpose-built AI tools designed for specific complex workflows, from automated thumbnail generation to intelligent fashion assistants.",
    list: [
      "Workflow automation scripts",
      "Social media auto-publishing",
      "Niche industry assistants",
    ],
    url: "/coming-soon",
    image: aiToolsImg, // Replace with AI tool screenshot
    color: "from-amber-500/20 to-orange-500/20",
  },
];

export default function MoreFromUs({ omit }: { omit?: string[] }) {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* --- Section Header --- */}
      <div className="relative max-w-3xl mx-auto text-center mb-20 z-10">
        <AnimatedShinyText className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card text-xs font-medium mb-6">
          <Layout className="w-3 h-3" />
          The Nexonauts Ecosystem
        </AnimatedShinyText>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
          More than just tools. <br />
          <span className="text-primary">A complete platform.</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          We are building a comprehensive suite of applications to help you
          build, sell, and automate your digital life.
        </p>
      </div>

      {/* --- Features Loop --- */}
      <div className="max-w-7xl mx-auto space-y-24">
        {features.map((feature, index) => {
          if (omit && omit.includes(feature.url)) return null;

          const isEven = index % 2 === 0;

          return (
            <div
              key={feature.id}
              className={`flex flex-col gap-12 items-center ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
            >
              {/* --- Text Content --- */}
              <div className="flex-1 space-y-8 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm tracking-wide uppercase">
                    <feature.badgeIcon className="w-4 h-4" />
                    {feature.badge}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <ul className="space-y-4">
                  {feature.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground/80 font-medium">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button size="lg" className="rounded-full px-8 group" asChild>
                  <Link href={feature.url}>
                    Explore {feature.title}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              {/* --- Image/Visual Content --- */}
              <div className="flex-1 w-full relative group">
                {/* Ambient Glow behind image */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} blur-[80px] rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-500`}
                />

                {/* Glass Container */}
                <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                  <div className="relative rounded-xl overflow-hidden border border-border/50 bg-background/50 aspect-video">
                    {/* Note: Ensure your Image component is configured correctly in next.config.js 
                       if using remote URLs, or use StaticImports.
                    */}
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-6 -right-6">
                    <Sparkles className="w-12 h-12 text-primary/20" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}