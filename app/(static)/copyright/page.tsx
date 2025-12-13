import { Copyright, FileText, Info, Mail, Scale, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { projectConfig } from "src/project.config";

export default async function CopyrightPage() {
  return (
    <main className="relative min-h-screen bg-background   selection:text-primary">

      {/* --- Background Texture --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 right-1/2 translate-x-1/2 h-96 w-[90%] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28">

        {/* --- Header --- */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-xl">
            <Copyright className="w-3 h-3" />
            <span>Intellectual Property</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Copyright Disclaimer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Respecting rights, acknowledging sources, and maintaining compliance.
          </p>
        </div>

        {/* --- Main Content Card --- */}
        <div className="space-y-6">

          {/* Intro Statement */}
          <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-sm">
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Info className="w-5 h-5" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Statement of Intent</h3>
                <p className="text-muted-foreground leading-relaxed">
                  At <span className="font-semibold text-foreground">{projectConfig.name}</span>, we value intellectual property rights and strive to uphold copyright laws. The content, including images, graphics, and text, utilized on this platform, is sourced from various free resources such as Freepik, Pexels, and other similar platforms, where the rights belong to their respective owners.
                </p>
              </div>
            </div>
          </div>

          {/* Split Grid for Details */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Fair Use */}
            <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 hover:border-primary/20 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Fair Use Statement</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our platform operates under the principles of fair use. We utilize copyrighted material for educational, informational, or illustrative purposes only, always attributing the content to its original creators or sources where applicable.
              </p>
            </div>

            {/* Acknowledgment */}
            <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 hover:border-primary/20 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Acknowledgment of Ownership</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All copyrighted material used on {projectConfig.name} is acknowledged to its respective owners. We do not claim ownership or rights over any copyrighted material that isn&apos;t developed or created by our team.
              </p>
            </div>
          </div>

          {/* DMCA Compliance Section (Highlighted) */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="bg-muted/30 p-8 border-b border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <ShieldAlert className="w-5 h-5 text-red-500" />
                <h4 className="text-lg font-semibold text-foreground">DMCA Compliance</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {projectConfig.name} complies with the Digital Millennium Copyright Act (DMCA). If you believe that your copyrighted work has been used on our platform in a manner that constitutes copyright infringement, please contact us immediately.
              </p>
            </div>
            <div className="p-6 bg-muted/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Have a copyright concern or takedown request?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                <Mail className="w-4 h-4" />
                Contact Legal Team
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}