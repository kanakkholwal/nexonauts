"use client";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface FollowProps {
  isFollowing: boolean;
  followUser: () => Promise<any>;
}

export function FollowButton({ isFollowing, followUser }: FollowProps) {
  return (
    <Button
      onClick={() => {
        toast.promise(followUser(), {
          loading: "Loading...",
          success: (data: any) => {
            console.log(data);
            return data.message;
          },
          error: (error) => {
            console.log(error);
            return "Something went wrong";
          },
        });
      }}
      variant={isFollowing ? "outline-solid" : "default"}
      className="rounded-full px-6 w-full max-w-xs"
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
export function FollowToggle({ isFollowing, followUser }: FollowProps) {
  return (
    <Button
      onClick={() => {
        toast.promise(followUser(), {
          loading: "Loading...",
          success: (data: any) => {
            console.log(data);
            return data?.message;
          },
          error: (error: any) => {
            console.log(error);
            return error?.message || "Something went wrong";
          },
        });
      }}
      size="sm"
      variant={isFollowing ? "outline-solid" : "default"}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
