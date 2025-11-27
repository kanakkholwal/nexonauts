import { Pricing } from "./pricing";

export default async function Page() {
  return (
    <main className="relative min-h-screen bg-background selection:bg-primary/10 selection:text-primary overflow-hidden">

      {/* --- Consistent Background --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-[90%] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 xl:px-6 pt-32 pb-20">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Simple pricing for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">
              serious developers.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Start for free, upgrade when you ship. No hidden fees, cancel anytime.
          </p>
        </div>

        <Pricing />
      </div>
    </main>
  );
}