"use client";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";


export function FollowButton({ isFollowing, followUser }) {
    return (
        <Button onClick={() =>{
            toast.promise(followUser(), {
                loading: "Loading...",
                success: "Success",
                error: "Error"
            });
        }} variant={isFollowing ? "secondary" : "default"} className="rounded-full px-6">
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
}