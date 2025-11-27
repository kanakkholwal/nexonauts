import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, CheckCircle2, Quote, Settings, Terminal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-background selection:bg-primary/10 selection:text-primary overflow-hidden">

      {/* Global Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-8 max-w-4xl mx-auto z-10 relative">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-xl">
            <span>Our Philosophy</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance">
            Empowering Developers, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">
              One Innovation at a Time.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Building the ecosystem that fuels creativity, collaboration, and growth for the next generation of builders.
          </p>
        </div>
      </section>

      {/* --- MISSION SECTION (Split View) --- */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-primary uppercase tracking-widest">Our Mission</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                Built by a developer, <br />for developers.
              </h3>
              <div className="prose prose-lg text-muted-foreground">
                <p>
                  Welcome to Nexonauts.com. This isn't just a platform; it's the brainchild of a passionate developer driven by a singular mission: to simplify the development journey for fellow creators.
                </p>
                <p>
                  As the sole visionary behind this platform, I'm committed to building a vibrant ecosystem that fuels creativity. We aren't a faceless corporation; we are a toolset crafted with empathy for the coding process.
                </p>
              </div>
            </div>

            {/* Quote decoration */}
            <div className="relative p-6 border-l-4 border-primary/30 bg-muted/20 rounded-r-xl">
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              <p className="italic text-foreground font-medium">
                "I keep you informed at every step, holding myself accountable for the results delivered."
              </p>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative order-1 lg:order-2 group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-75 transition duration-500" />
            <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl rotate-2 group-hover:rotate-0 transition duration-500">
              <Image
                src="/assets/images/about_1.png"
                alt="Developer working"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- VALUES SECTION (Bento Grid) --- */}
      <section className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-widest">Our Values</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">The principles guiding NexoNauts</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value Card 1 */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-3xl hover:border-primary/50 transition-colors duration-300 group">
              <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Settings className="w-7 h-7 text-indigo-500" />
              </div>
              <h4 className="text-xl font-bold mb-3">Execution</h4>
              <p className="text-muted-foreground leading-relaxed">
                We're dedicated to making your development goals a reality. From ideation to implementation, we ensure effective execution that drives your online success.
              </p>
            </div>

            {/* Value Card 2 */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-3xl hover:border-teal-500/50 transition-colors duration-300 group relative overflow-hidden">
              {/* Subtle highlight for the center card */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 blur-2xl rounded-full -mr-10 -mt-10" />

              <div className="h-14 w-14 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-7 h-7 text-teal-500" />
              </div>
              <h4 className="text-xl font-bold mb-3">Accountability</h4>
              <p className="text-muted-foreground leading-relaxed">
                As a solo founder, I take personal ownership of every aspect. I keep you informed at every step, holding myself accountable for every strategy implemented.
              </p>
            </div>

            {/* Value Card 3 */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-3xl hover:border-sky-500/50 transition-colors duration-300 group">
              <div className="h-14 w-14 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7 text-sky-500" />
              </div>
              <h4 className="text-xl font-bold mb-3">Result</h4>
              <p className="text-muted-foreground leading-relaxed">
                Our ultimate goal isn't just rankings; it's about bolstering your online presence and driving tangible, measurable outcomes for your projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-4 sm:px-6">
        <div className="relative max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden bg-[#0A0A0A] border border-white/10 shadow-2xl">

          {/* --- Background Effects --- */}

          {/* 1. The Grid Floor */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* 2. The Horizon Glow (Top Center) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

          {/* 3. The Subtle Noise Texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />

          {/* --- Content --- */}
          <div className="relative z-10 flex flex-col items-center text-center py-24 px-6 md:px-12">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary-foreground/80 mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Open for Builders
            </div>

            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-3xl mb-6">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50">ship your dream?</span>
            </h2>

            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
              Whether you're a seasoned engineer or just committed your first line of code, Nexonauts provides the ecosystem you need to accelerate your growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
              {/* Primary Action */}
              <Link href="/signup">
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-full bg-white text-black hover:bg-zinc-200 transition-all text-base font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>

              {/* Secondary Action (Social Proof or Doc link) */}
              <Link href="/docs">
                <Button
                  variant="ghost"
                  size="lg"
                  className="h-14 px-8 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-all text-base"
                >
                  <Terminal className="mr-2 w-4 h-4" />
                  Read the Manifest
                </Button>
              </Link>
            </div>

          </div>

          {/* --- Bottom Decoration (Code fade) --- */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent z-0 pointer-events-none" />
        </div>
      </section>
    </main>
  );
}