import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CreateProfile from "app/dashboard/components/create-profile";
import { ArrowUpRight, Settings, UserCircle } from "lucide-react";
import Link from "next/link";
import { Session } from "src/auth";
import { getSession } from "~/auth/server";
import { getProfile, updateProfile } from "./actions";
import { ProfileEditor, ProfileView } from "./profile-client";
import StoreInitializer from "./store-intializer";

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = (await getSession()) as Session;

  // --- Auth Guards ---
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <UserCircle className="w-16 h-16 text-muted-foreground/50" />
        <h2 className="text-xl font-semibold">Authentication Required</h2>
        <p className="text-muted-foreground">Please log in to manage your profile.</p>
        <Button asChild><Link href="/login">Log In</Link></Button>
      </div>
    );
  }

  if (!session.user.profile) {
    return (
      <div className="flex justify-center items-center w-full min-h-[80vh]">
        <CreateProfile />
      </div>
    );
  }

  const profile = await getProfile(session.user.profile);

  if (!profile) {
    return (
      <div className="flex justify-center items-center w-full min-h-[80vh]">
        <CreateProfile />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <StoreInitializer profile={profile} />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">

        {/* --- Header --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your public developer identity and presence.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href={`/devs/${profile.username}`} target="_blank">
                View Public Page
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </header>

        <Separator className="mb-8 opacity-50" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* --- EDITOR COLUMN --- */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 lg:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">General Information</h2>
              </div>
              <ProfileEditor updateProfile={updateProfile} />
            </div>
          </div>

          {/* --- PREVIEW COLUMN (Sticky) --- */}
          <aside className="hidden lg:block lg:col-span-5 xl:col-span-4 sticky top-24">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground ml-1">Live Preview</h3>
              <div className="relative group">
                <div className="relative bg-background rounded-3xl border border-border/50 shadow-2xl overflow-hidden">
                  <ProfileView />
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}