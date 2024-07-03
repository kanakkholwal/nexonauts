import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { getSession } from "src/lib/auth";
import { notFound } from "next/navigation";
import { sessionType } from "src/types/session";
import { followUnFollowProfile, getProfile } from "./actions";
import { FollowButton } from "./components/follow-btn";
import FollowerFollow from "./components/follower-follow";
import { ShareProfile } from "./components/share";
import SocialLinks from "./components/social-links";

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const meta = await getProfile(params.username);

  if (!meta) return notFound();

  return {
    title: `${meta.user.name}'s profile on ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
    description: meta.bio,
    openGraph: {
      type: "profile",
      username: meta.username,
      title: `${meta.user.name}'s profile on ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
      siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/devs/${meta.username}`,
      images: [{ url: meta.profilePicture, alt: meta.name }],
    },
  };
}

export default async function DeveloperPage({
  params,
}: {
  params: { username: string };
}) {
  const developer = await getProfile(params.username);

  if (!developer) return notFound();
<<<<<<< HEAD
  const session = (await getSession()) as sessionType | null;
=======
  const session = (await getServerSession(authOptions)) as sessionType | null;
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0

  const isOwner = session?.user?.username === developer.username;
  const isFollowing =
    developer.followers.includes(session?.user?.profile) || false;

  console.log(developer);

  return (
    <>
      <div
        id="basic_info"
        className="w-full px-4 py-8 space-y-2 flex flex-col lg:flex-row items-start justify-center space-x-6 mb-8"
      >
        <Avatar className="w-40 h-40 shadow-lg">
          <AvatarImage
            src={developer.user.profilePicture}
            alt={developer.username}
            width={320}
            height={320}
            className="w-40 h-40"
          />
          <AvatarFallback className="w-40 h-40 uppercase text-xl">
            {developer.username[0] + developer.username[1]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-center space-y-2">
          <h1 className="text-4xl font-bold">{developer.user.name}</h1>
          <h3 className="text-gray-500 dark:text-slate-400">
            @{developer.username}
          </h3>
          {/* <div className="flex flex-row items-center justify-start space-x-2 text-xs">
                        <span className="text-gray-500">Joined on </span><span className="text-slate-600 font-semibold">{developer.createdAt.toLocaleDateString("en-US", {year: "numeric",month: "short",day: "numeric"})}</span>
                    </div> */}
          <FollowerFollow
            developer={developer}
            followUnfollowUser={followUnFollowProfile}
            isFollowing={isFollowing}
          />
          <p className="text-slate-500 font-medium max-w-xl">{developer.bio}</p>
          <SocialLinks socials={developer.socials} />
          <div className="flex flex-row items-center justify-start space-x-2 w-full">
            <FollowButton
              isFollowing={isFollowing}
              followUser={followUnFollowProfile.bind(this, developer.username)}
            />
            <ShareProfile
              profile={{
                username: developer.username,
                name: developer.user.name,
                profilePicture: developer.user.profilePicture,
                bio: developer.bio,
              }}
            />
          </div>
        </div>
      </div>

      <div id="showcase" className="w-full px-4 py-8 space-y-2 relative">
        <h1 className="text-2xl font-bold">Showcase</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="w-full h-48  rounded-lg" />
          <Skeleton className="w-full h-48  rounded-lg" />
          <Skeleton className="w-full h-48  rounded-lg" />
          <Skeleton className="w-full h-48  rounded-lg" />
          <Skeleton className="w-full h-48  rounded-lg" />
          <Skeleton className="w-full h-48  rounded-lg" />
        </div>
      </div>
    </>
  );
}
