import {
  AlertTriangle,
  ArrowRight,
  Ban,
  Gavel,
  ScrollText,
  Shield
} from "lucide-react";
import Link from "next/link";
import { projectConfig } from "src/project.config";

// Navigation Sections
const SECTIONS = [
  { id: "terms", title: "General Terms" },
  { id: "definitions", title: "Definitions" },
  { id: "cookies", title: "Cookies" },
  { id: "license", title: "License & Restrictions" },
  { id: "hyperlinking", title: "Hyperlinking Policy" },
  { id: "liability", title: "Content Liability" },
  { id: "disclaimer", title: "Disclaimer" },
  { id: "contact", title: "Contact Us" },
];

export default async function TermsPage() {
  return (
    <main className="relative min-h-screen bg-background selection:bg-primary/10 selection:text-primary">

      {/* --- Background Texture --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/4 -translate-x-1/2 h-96 w-[90%] bg-violet-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28">

        {/* --- Header --- */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-xl mb-6">
            <Gavel className="w-3 h-3" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Please read these terms carefully before using our platform. They outline the rules and regulations for the use of <span className="text-foreground font-semibold">{projectConfig.name}</span>.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 relative">

          {/* --- Sticky Table of Contents (Desktop) --- */}
          <aside className="hidden lg:block col-span-3">
            <div className="sticky top-24 space-y-2">
              <p className="font-semibold text-foreground mb-4 pl-3 text-sm uppercase tracking-wider">Table of Contents</p>
              <nav className="border-l border-border/50">
                {SECTIONS.map((section) => (
                  <Link
                    key={section.id}
                    href={`#${section.id}`}
                    className="block py-2 pl-4 text-sm text-muted-foreground hover:text-primary hover:border-l-2 hover:border-primary -ml-px transition-all"
                  >
                    {section.title}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* --- Main Legal Text --- */}
          <div className="col-span-12 lg:col-span-9">
            <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:scroll-mt-28 prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline">

              <section id="terms">
                <p className="lead">
                  By accessing this website, we assume you accept these terms and conditions. Do not continue to use {projectConfig.name} if you do not agree to all the terms and conditions stated on this page.
                </p>
              </section>

              <hr className="border-border/50 my-10" />

              <section id="definitions">
                <div className="flex items-center gap-2 text-foreground mb-4">
                  <ScrollText className="w-5 h-5 text-primary" />
                  <h3 className="m-0">Terminology</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  The following terminology applies to these Terms and Conditions, Privacy Statement, and Disclaimer Notice and all Agreements:
                </p>
                <ul className="grid gap-4 list-none pl-0">
                  <li className="bg-card/50 border border-border/50 p-4 rounded-lg">
                    <span className="font-semibold text-foreground">"Client", "You", and "Your"</span>
                    <br />
                    Refers to you, the person accessing this website and accepting the Company's terms and conditions.
                  </li>
                  <li className="bg-card/50 border border-border/50 p-4 rounded-lg">
                    <span className="font-semibold text-foreground">"The Company", "Ourselves", "We", "Our", and "Us"</span>
                    <br />
                    Refers to {projectConfig.name}.
                  </li>
                  <li className="bg-card/50 border border-border/50 p-4 rounded-lg">
                    <span className="font-semibold text-foreground">"Party", "Parties", or "Us"</span>
                    <br />
                    Refers to both the Client and ourselves.
                  </li>
                </ul>
              </section>

              <section id="cookies">
                <h3>Cookies</h3>
                <p>
                  We employ the use of cookies. By accessing {projectConfig.name}, you agreed to use cookies in agreement with the {projectConfig.name}'s <Link href="/privacy">Privacy Policy</Link>.
                </p>
              </section>

              <section id="license">
                <h3>License & Restrictions</h3>
                <p>
                  Unless otherwise stated, {projectConfig.name} and/or its licensors own the intellectual property rights for all material on {projectConfig.name}. All intellectual property rights are reserved. You may access this from {projectConfig.name} for your own personal use subjected to restrictions set in these terms and conditions.
                </p>

                {/* Prohibited Actions Card */}
                <div className="not-prose mt-6 bg-red-500/5 border border-red-500/20 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4 text-red-600 dark:text-red-400 font-semibold">
                    <Ban className="w-5 h-5" />
                    <span>Strictly Prohibited Actions</span>
                  </div>
                  <ul className="space-y-3">
                    {["Republish material from our website", "Sell, rent, or sub-license material", "Reproduce, duplicate, or copy material", "Redistribute content from our platform"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section id="hyperlinking">
                <h3>Reservation of Rights & Links</h3>
                <p>
                  We reserve the right to request that you remove all links or any particular link to our website. You approve to immediately remove all links to our website upon request. We also reserve the right to amend these terms and conditions and it's linking policy at any time. By continuously linking to our website, you agree to be bound to and follow these linking terms and conditions.
                </p>
                <h4>Removal of links from our website</h4>
                <p>
                  If you find any link on our website that is offensive for any reason, you are free to contact and inform us at any moment. We will consider requests to remove links but we are not obligated to do so or to respond to you directly.
                </p>
              </section>

              <section id="liability">
                <h3>Content Liability</h3>
                <div className="flex gap-4 items-start">
                  <Shield className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <p className="mt-0">
                    We shall not be held responsible for any content that appears on your website. You agree to protect and defend us against all claims that arise on your website. No link(s) should appear on any website that may be interpreted as libelous, obscene, or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
                  </p>
                </div>
              </section>

              <section id="disclaimer">
                <h3>Disclaimer</h3>
                <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
                  <div className="flex items-center gap-2 mb-2 text-orange-500">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-semibold">Legal Disclaimer</span>
                  </div>
                  <p className="text-sm mt-2 mb-4">
                    To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
                  </p>
                  <ul className="text-sm space-y-1 mb-0">
                    <li>Limit or exclude our or your liability for death or personal harm</li>
                    <li>Limit or exclude our or your liability for fraud or fraudulent misrepresentation</li>
                    <li>Limit any of our or your liabilities in any way that is not permitted under applicable law</li>
                    <li>Exclude any of our or your liabilities that may not be excluded under applicable law</li>
                  </ul>
                </div>
              </section>

              <section id="contact" className="not-prose mt-12">
                <div className="bg-muted/30 border border-border rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Questions about the Terms?</h3>
                    <p className="text-muted-foreground">
                      If you have any inquiries regarding our Terms of Service, please contact our support team.
                    </p>
                  </div>
                  <Link href="/contact" className="shrink-0 inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                    Contact Support <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}