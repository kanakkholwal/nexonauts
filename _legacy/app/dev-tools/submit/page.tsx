import { CheckCircle2, Rocket, ShieldCheck } from "lucide-react";
import { Metadata } from "next";
import SubmitForm from "./form";

export const metadata: Metadata = {
  title: "Submit Your Tool to the Nexonauts Ecosystem",
  description:
    "Join the Nexonauts directory. Submit your open-source tool, AI agent, or UI kit to gain visibility across our developer and designer community.",
};

const benefits = [
  {
    icon: Rocket,
    title: "Instant Visibility",
    description:
      "Get your tool in front of thousands of developers, designers, and creators looking for solutions.",
  },
  {
    icon: ShieldCheck,
    title: "Vetted & Trusted",
    description:
      "All submissions are manually reviewed, adding a layer of trust and credibility to your project.",
  },
  {
    icon: CheckCircle2,
    title: "Community Feedback",
    description:
      "Receive valuable insights, bug reports, and feature requests from an engaged user base.",
  },
];

export default function SubmitPage() {
  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">


      <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* --- Left Column: The Pitch --- */}
        <section className="space-y-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase border border-primary/20">
              <Rocket className="w-3 h-3" />
              Join the Ecosystem
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Showcase your tool <br /> to the world.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Whether you&apos;ve built a handy open-source utility, a powerful AI agent,
              or a beautiful UI kit, Nexonauts is the place to share it. Fill out
              the form to get started.
            </p>
          </div>

          <ul className="space-y-6">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                  <benefit.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="p-4 bg-muted/50 rounded-lg border border-border/50 text-sm text-muted-foreground flex gap-3 items-center max-w-md">
            <ShieldCheck className="w-5 h-5 text-muted-foreground shrink-0" />
            <p>
              Please note: To ensure quality, all submissions are reviewed by our team
              before going live. This usually takes 24-48 hours.
            </p>
          </div>
        </section>

        {/* --- Right Column: The Form --- */}
        <div className="bg-background/60 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-border/60 shadow-2xl relative">
          {/* Subtle gradient border effect */}
          <div className="absolute inset-0 z-[-1] rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-violet-500/20 blur-xl opacity-70" />
          <h2 className="text-2xl font-bold mb-6">Submission Details</h2>
          <SubmitForm />
        </div>
      </div>
    </main>
  );
}