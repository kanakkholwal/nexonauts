import SquareGrid from "app/layouts/patterns/square-grid";
import WithoutSession from "app/layouts/without-session";
import { Metadata } from "next";
import { getSession } from "~/auth/server";
import { createProfile } from "./actions";
import AlreadyProfile from "./existing";
import CreateProfileForm from "./form";

export const metadata: Metadata = {
  title: "Create Profile - NexoNauts",
  description: "Set up your developer identity.",
};

export default async function CreateProfile() {
  const session = await getSession();

  if (!(session && session?.user)) return <WithoutSession />;

  if (session.user.profile) {
    return <AlreadyProfile user={session.user} />;
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-background selection:bg-primary/20 selection:text-primary overflow-hidden">

      {/* Background Ambience */}
      <SquareGrid className="absolute inset-0 h-full w-full opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg px-4">
        <CreateProfileForm user={session.user} createProfile={createProfile} />
      </div>
    </div>
  );
}