import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import { getUserByUserName } from "src/lib/user/actions";
import { ShareProfile } from "./components/share";
import SocialLinks from "./components/social-links";


export default async function DeveloperPage({ params }: { params: { username: string } }) {


    const developer = await getUserByUserName(params.username);

    if (!developer) return notFound();
    console.log(`developer:`, developer);


    return (
        <>
            <div id="basic_info" className="w-full px-4 py-8 space-y-2 flex flex-col lg:flex-row items-start justify-center space-x-6 mb-8 bg-slate-200/40 dark:bg-slate-800/80 rounded-lg">
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
                    <div className="flex flex-row items-center justify-start space-x-2">

                        <Dialog key={"followers-modal"}>
                            <DialogTrigger asChild><span className="text-gray-500 hover:text-foreground cursor-pointer">{developer.followers.length} followers</span></DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Followers ({developer.followers.length})
                                    </DialogTitle>
                                    <DialogDescription>
                                        {developer.username}'s followers
                                    </DialogDescription>
                                </DialogHeader>
                                <ul className="flex flex-col gap-2">
                                    {developer.followers.map(follower => <li key={"follower_" + follower.id}>
                                        <div className="flex flex-row items-center justify-start space-x-2">
                                            <Avatar className="w-8 h-8 shadow-lg">
                                                <AvatarImage src={follower.profilePicture} alt={follower.username} width={320} height={320} className="w-8 h-8" />
                                                <AvatarFallback className="w-8 h-8 uppercase text-xl">{follower.username[0] + follower.username[1]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col items-start justify-center space-y-1">
                                                <h5 className="text-slate-600 font-semibold">{follower.name}</h5>
                                                <p className="text-gray-500 dark:text-slate-400">@{follower.username}</p>
                                            </div>
                                        </div>
                                    </li>)}
                                </ul>
                                {developer.followers.length === 0 && <p className="text-slate-500 font-medium text-center">No followers yet</p>}
                            </DialogContent>
                        </Dialog>

                        <span className="text-gray-500">|</span>
                        <Dialog key={"following-modal"}>
                            <DialogTrigger asChild><span className="text-gray-500 hover:text-foreground cursor-pointer">{developer.following.length} following</span></DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Following ({developer.following.length})
                                    </DialogTitle>
                                    <DialogDescription>
                                        {developer.username}'s following
                                    </DialogDescription>
                                </DialogHeader>
                                <ul className="flex flex-col gap-2">
                                    {developer.following.map(following => <li key={"following_" + following._id}>
                                        <div className="flex flex-row items-center justify-start space-x-2">
                                            <Avatar className="w-8 h-8 shadow-lg">
                                                <AvatarImage src={following.profilePicture} alt={following.username} width={320} height={320} className="w-8 h-8" />
                                                <AvatarFallback className="w-8 h-8 uppercase text-xl">{following.username[0] + following.username[1]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col items-start justify-center space-y-1">
                                                <h5 className="text-slate-600 font-semibold">{following.name}</h5>
                                                <p className="text-gray-500 dark:text-slate-400">@{following.username}</p>
                                            </div>
                                        </div>
                                    </li>)}
                                </ul>
                                {developer.following.length === 0 && <p className="text-slate-500 font-medium text-center">No following yet</p>}
                            </DialogContent>
                        </Dialog>
                    </div>
                    <p className="text-slate-500 font-medium max-w-xl">{developer.dev_account.bio}</p>
                    <SocialLinks socials={developer.dev_account.socials} />
                    <div className="flex flex-row items-center justify-start space-x-2 w-full">
                        <Button className="rounded-full px-5 w-full max-w-xs" variant="gradient_blue">Follow</Button>
                        <ShareProfile profile={{username: developer.username,name: developer.name,profilePicture: developer.profilePicture,bio: developer.dev_account.bio,}} />
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