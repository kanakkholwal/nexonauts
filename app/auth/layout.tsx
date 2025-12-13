import { ApplicationSvgLogo } from "@/components/logo";
import { ButtonLink } from "@/components/utils/link";
import { ArrowLeft, Quote, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import gettingStarted from "./getting-started.png";

export const dynamic = "force-dynamic";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const SITE_NAME = process.env.NEXT_PUBLIC_WEBSITE_NAME || "Nexonauts";

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-background">

      {/* --- LEFT COLUMN: Brand & Hero (Hidden on Mobile) --- */}
      <div className="relative hidden h-full flex-col bg-zinc-950 p-10 text-white lg:flex border-r border-white/10 overflow-hidden">

        {/* Background Effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-40 pointer-events-none" />

        {/* Logo Area */}
        <Link
          className="relative z-20 flex items-center gap-2 text-lg font-semibold tracking-tight hover:opacity-80 transition-opacity w-fit"
          href="/"
        >
          <ApplicationSvgLogo className="size-8" />
          {SITE_NAME}
        </Link>

        {/* Hero Visual */}
        <div className="relative z-10 flex-1 flex items-center justify-center p-8">
          <div className="relative w-full max-w-md aspect-square bg-linear-to-tr from-white/5 to-white/0 rounded-3xl border border-white/10 backdrop-blur-sm p-2 shadow-2xl">
            {/* Inner container to hold image nicely */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/20">
              <Image
                src={gettingStarted}
                alt="Dashboard Preview"
                fill
                className="object-cover opacity-90 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium backdrop-blur-md mb-2">
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                  <span>Join 10,000+ Developers</span>
                </div>
                <h2 className="text-xl font-bold leading-tight">
                  Build your portfolio faster.
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Footer */}
        <div className="relative z-20 mt-auto">
          <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <Quote className="absolute top-4 left-4 w-6 h-6 text-white/20 rotate-180" />
            <blockquote className="space-y-4 pl-2 pt-2">
              <p className="text-lg font-medium leading-relaxed text-white/90">
                &ldquo;The only way to do great work is to love what you do. This platform helps me focus on exactly that.&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-linear-to-br from-purple-500 to-indigo-500" />
                <div className="text-sm">
                  <div className="font-semibold text-white">Kanak</div>
                  <div className="text-white/60">Founder of {SITE_NAME}</div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen h-full flex-col items-center justify-center p-6 lg:p-8 relative">

        {/* Mobile Header / Back Link */}
        <div className="absolute top-6 left-6 lg:top-8 lg:left-8">
          <ButtonLink href="/" variant="ghost" className="pl-0 gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back
          </ButtonLink>
        </div>

        <div className="w-full max-w-[400px] mx-auto space-y-6">
          {children}
        </div>

        <div className="absolute bottom-6 text-center text-xs text-muted-foreground w-full">
          <Link href="/tos" className="hover:underline underline-offset-4">Terms</Link>
          <span className="mx-2">•</span>
          <Link href="/privacy" className="hover:underline underline-offset-4">Privacy</Link>
        </div>
      </div>

    </div>
  );
}


