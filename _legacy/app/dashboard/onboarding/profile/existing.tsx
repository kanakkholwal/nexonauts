import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  ExternalLink,
  LayoutDashboard,
  Settings2,
  ShieldCheck,
  Terminal
} from "lucide-react";
import Link from "next/link";
import { SessionUserType } from "~/auth";

export default function AlreadyProfile({ user }: { user: SessionUserType }) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">


      <div className="relative z-10 w-full max-w-md px-4">

        {/* --- Identity Card --- */}
        <div className="group relative">
          {/* Glow Effect behind card */}
          <div className="absolute -inset-0.5 bg-gradient-to-b from-primary/30 to-primary/0 rounded-2xl blur opacity-30 transition duration-1000 group-hover:opacity-50" />

          <Card className="relative bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl p-1">

            {/* Header / Status Bar */}
            <div className="px-6 py-4 border-b border-border/40 flex justify-between items-center bg-muted/20 rounded-t-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <Terminal className="w-3.5 h-3.5" />
                <span>IDENTITY_ACTIVE</span>
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 gap-1.5 py-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Online
              </Badge>
            </div>

            <div className="p-8 flex flex-col items-center text-center space-y-6">

              {/* Avatar Ring */}
              <div className="relative">
                <div className="absolute -inset-4 border border-dashed border-border rounded-full animate-[spin_10s_linear_infinite]" />
                <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                  <AvatarImage src={user.image || ""} alt={user.username} />
                  <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                    {user.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 bg-background rounded-full p-1 border border-border shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
              </div>

              {/* User Info */}
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">@{user.username}</h1>
                <p className="text-sm text-muted-foreground">
                  Developer Profile • Member since {new Date().getFullYear()}
                </p>
              </div>

              {/* Actions Stack */}
              <div className="w-full space-y-3 pt-4">
                <Button className="w-full h-11 shadow-lg shadow-primary/10" asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 w-4 h-4" />
                    Go to Dashboard
                  </Link>
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-11 border-border/50 hover:bg-muted/50" asChild>
                    <Link href={`/devs/${user.username}`} target="_blank">
                      View Public
                      <ExternalLink className="ml-2 w-3.5 h-3.5 opacity-70" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-11 border-border/50 hover:bg-muted/50" asChild>
                    <Link href="/dashboard/settings/profile">
                      Edit Profile
                      <Settings2 className="ml-2 w-3.5 h-3.5 opacity-70" />
                    </Link>
                  </Button>
                </div>
              </div>

            </div>
          </Card>
        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
          >
            Back to Home <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}