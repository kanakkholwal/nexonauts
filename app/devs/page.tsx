import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProfileType } from "./[username]/actions";
import { getProfiles } from "./actions";

type PageProps = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    offset?: string;
  }>
};
export const metadata: Metadata = {
  title: "Explore Developers",
  description: "Find developers on the platform",
  openGraph: {
    type: "profile",
    title: "Explore Developers",
    description: "Find developers on the platform",
  },
};

export default async function ExploreDevelopers(props: PageProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const offset = Number(searchParams?.offset) || 0;

  const profiles = (await getProfiles(
    query,
    currentPage,
    offset,
    {}
  )) as ProfileType[];
  console.log(profiles);

  return (
    <div className="@container">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-2 gap-3 @3xl:grid-cols-3">
          {profiles?.map((profile) => {
            return (
              <div key={profile._id}>
                <Link href={`/devs/${profile.username}`} className="p-1">
                  <Card
                    className="rounded-2xl backdrop-blur backdrop-saturate bg-opacity-75 bg-white border relative p-4"
                    variant="glass"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-20 h-20 border">
                          <AvatarImage
                            src={profile.user.profilePicture}
                            alt={profile.username}
                            width={320}
                            height={320}
                          />
                          <AvatarFallback className="uppercase text-xl">
                            {profile.username[0] + profile.username[1]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-lg font-semibold">
                            {profile.user.name}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            @{profile.user.username}
                          </p>
                          <div className="flex flex-row items-center justify-start space-x-2 text-sm text-muted-foreground mt-1">
                            <span>{profile.followers.length} followers</span>
                            <span>|</span>
                            <span>{profile.following.length} following</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Follow
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>
      </Suspense>
    </div>
  );
}
