import { AnimatedShinyText } from "@/components/animation/animated-shiny-text";
import Navbar from "@/components/common/navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ButtonLink } from "@/components/utils/link";
import Footer from "app/layouts/footer";
import {
  ArrowRight,
  Bot,
  Code2,
  Cpu,
  Globe,
  Layout,
  Palette,
  Search,
  Sparkles,
  Wand2,
  Zap
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="group rounded-full border bg-background/50 backdrop-blur-sm p-1">
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <Sparkles className="inline-block size-4 mr-2 text-yellow-500" />
                  <span className="text-sm font-medium">Introducing the Next Gen AI Platform</span>
                </AnimatedShinyText>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 max-w-4xl mx-auto">
              The Ultimate <span className="text-transparent bg-clip-text bg-linear-to-l from-indigo-400 from-10% via-sky-400 via-30% to-emerald-300 to-90%">AI Ecosystem</span> for Creators & Developers
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover specialized AI tools, manage your developer portfolio, and access a vast marketplace of digital assets. All in one unified platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ButtonLink href="/signup" size="lg" rounded="full" className="w-full sm:w-auto px-8 h-12 text-base">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="#features" variant="outline" size="lg" rounded="full" className="w-full sm:w-auto px-8 h-12 text-base">
                Explore Ecosystem
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* Features Grid (Bento Style) */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Build & Grow</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                From showcasing your work to finding the perfect tools, Nexonauts provides the infrastructure for your success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Developer Portfolio */}
              <Card className="md:col-span-2 bg-background/60 backdrop-blur-sm border-muted/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                    <Layout className="h-6 w-6 text-blue-500" />
                  </div>
                  <CardTitle className="text-2xl">Developer Portfolio</CardTitle>
                  <CardDescription className="text-base">
                    Create a stunning, single-page portfolio that automatically syncs with your GitHub and other data sources. Showcase your projects, contributions, and stats without the manual upkeep.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative h-48 md:h-64 rounded-lg overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700">
                    {/* Placeholder for UI preview */}
                    <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                      <span className="font-mono text-sm">Portfolio Preview UI</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Marketplace */}
              <Card className="bg-background/60 backdrop-blur-sm border-muted/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                    <Palette className="h-6 w-6 text-purple-500" />
                  </div>
                  <CardTitle className="text-xl">Creator Marketplace</CardTitle>
                  <CardDescription>
                    Buy and sell UI kits, themes, templates, and design assets. Connect with a community of designers and frontend developers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mt-2">
                    <li className="flex items-center text-sm text-muted-foreground">
                      <Zap className="h-4 w-4 mr-2 text-yellow-500" /> Premium UI Kits
                    </li>
                    <li className="flex items-center text-sm text-muted-foreground">
                      <Code2 className="h-4 w-4 mr-2 text-blue-500" /> React & Vue Templates
                    </li>
                    <li className="flex items-center text-sm text-muted-foreground">
                      <Layout className="h-4 w-4 mr-2 text-green-500" /> Figma Resources
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Tools Directory */}
              <Card className="bg-background/60 backdrop-blur-sm border-muted/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-green-500" />
                  </div>
                  <CardTitle className="text-xl">Tools Directory</CardTitle>
                  <CardDescription>
                    A curated collection of AI and non-AI tools. Find everything from file converters to advanced SEO generators.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">SEO Tools</Badge>
                    <Badge variant="secondary">Converters</Badge>
                    <Badge variant="secondary">Minifiers</Badge>
                    <Badge variant="secondary">Generators</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Integrations */}
              <Card className="md:col-span-2 bg-background/60 backdrop-blur-sm border-muted/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-orange-500" />
                  </div>
                  <CardTitle className="text-2xl">Seamless Integrations</CardTitle>
                  <CardDescription className="text-base">
                    Import your products directly from Gumroad and other platforms. We support seamless data integration to keep your workflow uninterrupted.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-background flex items-center justify-center text-xs font-bold">G</div>
                      <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-background flex items-center justify-center text-xs font-bold">S</div>
                      <div className="w-8 h-8 rounded-full bg-green-200 border-2 border-background flex items-center justify-center text-xs font-bold">N</div>
                    </div>
                    <span className="text-sm font-medium">Connect your favorite platforms in seconds.</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Coming Soon: Specialized AI Tools */}
        <section className="py-24 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]">
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[500px] w-[500px] rounded-full bg-primary/5 opacity-50 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-16">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <Sparkles className="w-3 h-3 mr-2 inline-block" /> Coming Soon
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Specialized AI Assistants
              </h2>
              <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
                We are building the next generation of task-specific AI tools.
                Experience precision and power that goes beyond generic chat interfaces.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* AI Tool 1 */}
              <div className="group relative p-8 rounded-3xl bg-background/40 backdrop-blur-md border border-white/10 dark:border-white/5 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 text-indigo-500 group-hover:scale-110 transition-transform duration-500">
                    <Wand2 className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-500 transition-colors">Fashion Assistant</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Your personal AI stylist. Get outfit recommendations, trend analysis, and wardrobe management powered by advanced vision models.
                  </p>
                </div>
              </div>

              {/* AI Tool 2 */}
              <div className="group relative p-8 rounded-3xl bg-background/40 backdrop-blur-md border border-white/10 dark:border-white/5 hover:border-pink-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-6 text-pink-500 group-hover:scale-110 transition-transform duration-500">
                    <Bot className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-pink-500 transition-colors">Thumbnail Generator</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Automate your content creation. Generate high-CTR thumbnails for YouTube and social media instantly from your video context.
                  </p>
                </div>
              </div>

              {/* AI Tool 3 */}
              <div className="group relative p-8 rounded-3xl bg-background/40 backdrop-blur-md border border-white/10 dark:border-white/5 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 text-cyan-500 group-hover:scale-110 transition-transform duration-500">
                    <Cpu className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-500 transition-colors">Workflow Automation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Connect your scripts and tools. Build complex automation pipelines that execute tasks, publish content, and manage data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content / SEO Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold mb-4">Why Choose Nexonauts?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nexonauts is designed to be the ultimate ecosystem for modern creators and developers.
                  Unlike generic platforms, we focus on providing specialized tools that address specific pain points in your workflow.
                  Whether you are looking to build a professional identity with our Developer Portfolio,
                  monetize your design skills in our Marketplace, or leverage cutting-edge AI for specific tasks,
                  Nexonauts offers a curated, high-quality environment for your growth.
                </p>
              </div>

              <Separator />

              <div>
                <h2 className="text-2xl font-bold mb-4">Empowering the Open Source Community</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We believe in the power of open source. Our Tools Directory features a wide array of open-source utilities
                  that are free to use and modify. From essential web tools like minifiers and converters to complex
                  SEO generators, we aim to provide resources that help you build better web experiences faster.
                  By integrating these tools into a single platform, we reduce context switching and boost your productivity.
                </p>
              </div>

              <Separator />

              <div>
                <h2 className="text-2xl font-bold mb-4">Future-Proof Your Workflow</h2>
                <p className="text-muted-foreground leading-relaxed">
                  As we evolve into a specialized AI platform, Nexonauts will bring you tools that are not just wrappers around
                  generic models, but fine-tuned applications designed for specific industries. Our upcoming Fashion Assistant
                  and Automation tools are just the beginning. We are committed to staying at the forefront of technology
                  to ensure you always have the best tools at your disposal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] border border-white/10 px-6 py-24 text-center shadow-2xl">
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

              {/* Glow Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>

              <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                  Ready to Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Future?</span>
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
                    variant="outline"
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
