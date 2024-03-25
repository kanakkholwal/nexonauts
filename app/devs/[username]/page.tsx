import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { notFound } from "next/navigation";
import { getMetaByUserName, getUserByUserName } from "src/lib/user/actions";
import { sessionType } from "src/types/session";
import { followUnfollowUser, getRepoByUserName } from "./actions";
import { FollowButton } from "./components/follow-btn";
import FollowerFollow from "./components/follower-follow";
import { RepositoryCard } from "./components/github-card";
import { ShareProfile } from "./components/share";
import SocialLinks from "./components/social-links";

import { Metadata } from 'next';



export async function generateMetadata({ params }: {
    params: { username: string }
}): Promise<Metadata> {
    const meta = await getMetaByUserName(params.username);

    if (!meta) return notFound();

    return {
        title: `${meta.name}'s profile on ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
        description: meta.dev_account.bio,
        openGraph: {
            type: 'profile',
            username: meta.username,
            title: `${meta.name}'s profile on ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
            siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/devs/${meta.username}`,
            images: [{ url: meta.profilePicture, alt: meta.name }],
        },
    }
};



export default async function DeveloperPage({ params }: { params: { username: string } }) {


    const developer = await getUserByUserName(params.username);

    if (!developer) return notFound();
    const session = await getServerSession(authOptions) as sessionType | null;

    const isOwner = session?.user?.username === developer.username;
    const isFollowing = developer.followers.some(follower => follower.username === session?.user?.username)


    const {
        integrated: githubIntegrated,
        repos
    } = await getRepoByUserName(params.username);

    console.log(developer)


    return (
        <>
            <div id="basic_info" className="w-full px-4 py-8 space-y-2 flex flex-col lg:flex-row items-start justify-center space-x-6 mb-8">
                <Avatar className="w-40 h-40 shadow-lg">
                    <AvatarImage src={developer.profilePicture} alt={developer.username} width={320} height={320} className="w-40 h-40" />
                    <AvatarFallback className="w-40 h-40 uppercase text-xl">{developer.username[0] + developer.username[1]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start justify-center space-y-2">
                    <h1 className="text-4xl font-bold">{developer.name}</h1>
                    <h3 className="text-gray-500 dark:text-slate-400">@{developer.username}</h3>
                    {/* <div className="flex flex-row items-center justify-start space-x-2 text-xs">
                        <span className="text-gray-500">Joined on </span><span className="text-slate-600 font-semibold">{developer.createdAt.toLocaleDateString("en-US", {year: "numeric",month: "short",day: "numeric"})}</span>
                    </div> */}
                    <FollowerFollow
                        developer={developer}
                        followUnfollowUser={followUnfollowUser}
                        isFollowing={isFollowing}
                    />
                    <p className="text-slate-500 font-medium max-w-xl">{developer.dev_account.bio}</p>
                    <SocialLinks socials={developer.dev_account.socials} />
                    <div className="flex flex-row items-center justify-start space-x-2 w-full">
                        <FollowButton
                            isFollowing={isFollowing}
                            followUser={followUnfollowUser.bind(this, developer.username)}
                        />
                        <ShareProfile profile={{ username: developer.username, name: developer.name, profilePicture: developer.profilePicture, bio: developer.dev_account.bio, }} />
                    </div>
                </div>
            </div>
            <Tabs defaultValue="repos" className="w-full px-4 py-8 space-y-2 relative">
                <TabsList>
                    <TabsTrigger value="repos">repos</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="repos">
                    {!githubIntegrated && <div className="w-full px-4 py-8 space-y-2 relative">
                        <h1 className="text-2xl font-bold">Repositories</h1>
                        <p className="text-slate-500 font-medium">Github integration not found</p>
                    </div>}
                    <div id="repos" className="w-full px-4 py-8 space-y-2 relative">
                        <div className="flex flex-row items-center justify-between">
                            <h1 className="text-2xl font-bold">Repositories</h1>
                            <div className="flex flex-row items-center justify-start space-x-2">
                                {repos.length > 0 && <span className="text-gray-500">{repos.length} repositories</span>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {repos.map(repo => <RepositoryCard key={repo.id} repository={repo} />)}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>

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