"use client";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export function FollowButton({ isFollowing, followUser }) {
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
      variant={isFollowing ? "outline" : "default"}
      className="rounded-full px-6 w-full max-w-xs"
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
export function FollowToggle({ isFollowing, followUser }) {
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
      variant={isFollowing ? "outline" : "default"}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
