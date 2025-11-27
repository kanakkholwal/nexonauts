import SquareGrid from "app/layouts/patterns/square-grid";
import WithoutSession from "app/layouts/without-session";
import { Metadata } from "next";
import { getSession } from "~/auth/server";
import { createProfile } from "./actions";
import AlreadyProfile from "./existing";
import CreateProfileForm from "./form";

export const metadata: Metadata = {
  title: "Create Profile - NexoNauts",
  description: "Create Profile for NexoNauts",
};

export default async function CreateProfile() {
  const session = await getSession();

  if (!(session && session?.user)) return <WithoutSession />;

  if (session.user.profile) {
    return <AlreadyProfile user={session.user} />;
  }

  return (
    <>
      <CreateProfileForm user={session.user} createProfile={createProfile} />
      <SquareGrid className="h-screen" />
    </>
  );
}
