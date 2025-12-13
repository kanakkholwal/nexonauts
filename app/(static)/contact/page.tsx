import { Github, Linkedin, Mail, MapPin, MessageCircle, Twitter } from "lucide-react";
import { ContactForm } from "./form";

export default async function Contact() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden   selection:text-primary">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[128px] opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* Left Column: Context & Info */}
          <div className="flex flex-col gap-10">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Let&apos;s start a <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-violet-500">
                  conversation.
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Whether you have a question about features, pricing, or just want to say hello, our team is ready to answer all your questions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors">
                <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center border border-border/50">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email us</p>
                  <p className="text-sm">support@nexonauts.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors">
                <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center border border-border/50">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Live Support</p>
                  <p className="text-sm">Available Mon-Fri, 9am-5pm</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors">
                <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center border border-border/50">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Headquarters</p>
                  <p className="text-sm">Worlwide</p>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-border/50" />

            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Follow us</p>
              <div className="flex gap-4">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="p-2 rounded-full bg-muted/30 hover:bg-primary/10 hover:text-primary transition-all border border-transparent hover:border-primary/20">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="bg-card/30 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl">
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  );
}