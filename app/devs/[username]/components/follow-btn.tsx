"use client";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";


export function FollowButton({ isFollowing, followUser }) {
    return (
        <Button onClick={() =>{
            toast.promise(followUser(), {
                loading: "Loading...",
                success: (data:any) => {
                    return data.message;
                },
                error: "Error"
            });
        }} variant={isFollowing ? "outline" : "default"} className="rounded-full px-6 w-full max-w-xs">
            {isFollowing ? "Following" : "Follow"}
        </Button>
    )
}
export function FollowToggle({ isFollowing, followUser }) {
    return (
        <Button onClick={() =>{
            toast.promise(followUser(), {
                loading: "Loading...",
                success: (data:any) => {
                    return data.message;
                },
                error: "Error"
            });
        }} size="sm" variant={isFollowing ? "outline" : "default"} >
            {isFollowing ? "Following" : "Follow"}
        </Button>
    )
}