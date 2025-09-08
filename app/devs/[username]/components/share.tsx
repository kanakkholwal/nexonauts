"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Share2 } from "lucide-react";
import { FiMoreHorizontal } from "react-icons/fi";
import { useShare } from "src/hooks/use-share";

export function ShareProfile({
  profile,
}: {
  profile: {
    username: string;
    name: string;
    profilePicture: string;
    bio: string;
  };
}) {
  const { share, socials } = useShare({
    title: `${profile.name}'s profile on ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
    text: `${profile.name}'s profile \n\n ${profile.bio}`,
    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/devs/${profile.username}`,
    image: profile.profilePicture,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full px-6" variant="outline">
          Share <Share2 className="inline-block w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Share <strong>{profile.username}</strong>{"'"}s profile
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-2">
          <Avatar className="w-20 h-20 shadow-lg">
            <AvatarImage
              src={profile.profilePicture}
              alt={profile.username}
              width={320}
              height={320}
              className="w-20 h-20"
            />
            <AvatarFallback className="w-20 h-20 uppercase text-2xl">
              {profile.username[0] + profile.username[1]}
            </AvatarFallback>
          </Avatar>
          <h5 className="text-foreground font-semibold">{profile.name}</h5>
          <p className="text-muted-foreground text-sm">
            @{profile.username}
          </p>
        </div>
        <div className="flex flex-row items-center justify-center flex-wrap gap-2 w-full">
          {socials.map((social) => (
            <Button
              key={social.name}
              className="rounded-full"
              size="icon"
              variant="slate"
              onClick={() => window.open(social.url, "_blank")}
              title={`Share on ${social.name}`}
            >
              <social.icon className="w-4 h-4" />
            </Button>
          ))}
          <Button
            className="rounded-full"
            variant="slate"
            size="icon"
            onClick={() => share()}
            title={`More Options to share`}
          >
            <FiMoreHorizontal  />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
