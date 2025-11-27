import { Button } from "@/components/ui/button";
import CreateProfile from "app/dashboard/components/create-profile";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getSession } from "~/auth/server";

import { getProfile, updateProfile } from "./actions";
import { ProfileEditor, ProfileView } from "./profile-client";
import StoreInitializer from "./store-intializer";

export default async function ProfilePage() {
  const session = (await getSession()) as Session;

  if (!session.user.profile) {
    return (
      <div className="space-y-6 my-5">
        <div className="flex justify-center items-center w-full">
          <CreateProfile />
        </div>
      </div>
    );
  }
  const profile = await getProfile(session.user.profile);
  if (!profile)
    return (
      <div className="space-y-6 my-5">
        <div className="flex justify-center items-center w-full">
          <CreateProfile />
        </div>
      </div>
    );
  console.log(profile);

  return (
    <div className="space-y-6 my-5 @container">
      <h2 className="text-3xl font-semibold">Your Profile</h2>
      <StoreInitializer profile={profile} />
      <div className="grid grid-cols-1 @5xl:grid-cols-[1fr_38rem] gap-4 w-full">
        <div className="glassmorphism_light p-5 rounded-xl">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-semibold relative bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              @{profile.username}
            </h3>
            <Button size="sm" variant="link" className="group" asChild>
              <Link href={`/devs/${profile.username}`} target="_blank">
                Visit Profile
                <ArrowUpRight
                  size={16}
                  className="ml-2 transition rotate-45 group-hover:rotate-0"
                />
              </Link>
            </Button>
          </div>
          <ProfileEditor updateProfile={updateProfile} />
        </div>
        <div className="glassmorphism_light p-5 rounded-xl">
          <ProfileView />
        </div>
      </div>
    </div>
  );
}
