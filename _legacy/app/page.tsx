import Navbar from "@/components/common/navbar";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/utils/link";
import Footer from "app/layouts/footer";
import {
  ArrowRight,
  Bot,
  Cpu,
  ExternalLink,
  FileText,
  Globe,
  Layout,
  Palette,
  Search,
  Sparkles,
  Wand2,
} from "lucide-react";

const features = [
  {
    icon: Layout,
    title: "Developer Portfolio",
    description:
      "Auto-synced with GitHub. Showcase projects, contributions, and stats — zero manual upkeep.",
  },
  {
    icon: Palette,
    title: "Creator Marketplace",
    description:
      "Buy and sell UI kits, themes, and templates. Built for designers and frontend developers.",
  },
  {
    icon: Search,
    title: "Tools Directory",
    description:
      "Curated collection of AI and dev tools — from converters and minifiers to SEO generators.",
  },
  {
    icon: Globe,
    title: "Seamless Integrations",
    description:
      "Import products from Gumroad and other platforms. Keep your workflow uninterrupted.",
  },
];

const aiTools = [
  {
    icon: Wand2,
    title: "Fashion Assistant",
    description:
      "AI stylist powered by advanced vision models. Outfit recommendations, trend analysis, wardrobe management.",
  },
  {
    icon: Bot,
    title: "Thumbnail Generator",
    description:
      "Generate high-CTR thumbnails for YouTube and social media instantly from your video context.",
  },
  {
    icon: Cpu,
    title: "Workflow Automation",
    description:
      "Build complex automation pipelines. Execute tasks, publish content, manage data — all connected.",
  },
];

const products = [
  {
    icon: FileText,
    title: "Orbit PDF",
    description:
      "High-performance PDF toolkit that runs entirely in your browser. Merge, split, compress — 100% private, zero server uploads.",
    href: "https://github.com/kanakkholwal/orbit",
    tags: ["Open Source", "WASM", "Privacy-first"],
  },
];

export default function HomePage() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="flex min-h-screen flex-col">
        <section
          id="hero"
          className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-24 pb-20"
        >
          <div className="absolute inset-0 -z-10 bg-background">
            <div className="absolute top-1/2 left-1/2 -z-10 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
          </div>

          <div className="mx-auto w-full max-w-3xl px-6 text-center">
            <Badge
              variant="secondary"
              className="mb-8 inline-flex items-center gap-1.5 rounded-full border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              <Sparkles className="size-3" />
              Now in Beta
            </Badge>

            <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Build, create, and grow
              <br />
              <span className="text-muted-foreground">with the right tools.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A unified platform for developer portfolios, digital marketplaces,
              and AI-powered tools. Everything you need, nothing you don{`'`}t.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink
                href="/auth/signup"
                size="lg"
                rounded="full"
                className="h-11 px-8 text-sm font-medium"
              >
                Get Started
                <ArrowRight className="ml-2 size-4" />
              </ButtonLink>
              <ButtonLink
                href="#features"
                variant="ghost"
                size="lg"
                rounded="full"
                className="h-11 px-8 text-sm font-medium text-muted-foreground"
              >
                Learn More
              </ButtonLink>
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-border bg-background py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-16">
              <p className="mb-2 text-sm font-medium tracking-wide text-primary uppercase">
                Platform
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Everything you need
              </h2>
              <p className="mt-3 max-w-lg text-base text-muted-foreground">
                From showcasing your work to finding the perfect tools — the
                infrastructure for your success.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group bg-card p-8 transition-colors hover:bg-muted/50"
                  >
                    <Icon className="mb-4 size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                    <h3 className="mb-2 text-base font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-muted/30 py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-16 text-center">
              <Badge
                variant="secondary"
                className="mb-4 inline-flex items-center gap-1.5 rounded-full border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                <Sparkles className="size-3" />
                Coming Soon
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Specialized AI Assistants
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-base text-muted-foreground">
                Task-specific AI tools built for precision — not generic chat
                wrappers.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {aiTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.title}
                    className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-sm"
                  >
                    <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
                      <Icon className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
                    </div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">
                      {tool.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-background py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12">
              <p className="mb-2 text-sm font-medium tracking-wide text-primary uppercase">
                Ecosystem
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                From our ecosystem
              </h2>
              <p className="mt-3 max-w-lg text-base text-muted-foreground">
                Standalone products built with the same principles — performance,
                privacy, and great design.
              </p>
            </div>

            <div className="grid gap-6">
              {products.map((product) => {
                const Icon = product.icon;
                return (
                  <a
                    key={product.title}
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-4 sm:items-center">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
                        <Icon className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">
                          {product.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {product.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {product.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="hidden size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground sm:block" />
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] border border-white/10 px-6 py-24 text-center shadow-2xl">
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

              {/* Glow Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>

              <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                  Ready to Build the <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">Future?</span>
                </h2>
                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                  Join the ecosystem where innovation meets execution. Start your journey with Nexonauts today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  <ButtonLink
                    href="/signup"
                    size="lg"
                    className="bg-white text-black hover:bg-zinc-200 font-semibold px-8 h-12 rounded-full text-base transition-all"
                  >
                    Get Started Now
                  </ButtonLink>
                  <ButtonLink
                    href="/contact"
                    size="lg"
                    variant="ghost"
                    className="border-zinc-800 text-white hover:bg-zinc-900 hover:text-white font-medium px-8 h-12 rounded-full text-base transition-all"
                  >
                    Contact Sales
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
