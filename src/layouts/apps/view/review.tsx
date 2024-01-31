"use client";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import { MdOutlineExpandMore } from "react-icons/md";
import { TbSend } from "react-icons/tb";
import { AppTypeWithId } from "src/models/app";
import { AppTypeWithFormFlow } from "src/types/app";
import { SessionUserType } from "src/types/user";

export function PostReview({ app, user }: {
    app: AppTypeWithId,
    user: SessionUserType
}) {
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(0);

    const handleSubmit = async () => {
        setLoading(true)


        await fetch(`/api/apps/${app._id}/reviews`, {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: user._id,
                rating,
                review,
                appId: app._id
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setReview("")
                setRating(0)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })
    }

    return (<>
        <div>
            <div className="flex justify-between items-center gap-2 p-2">


                <Label htmlFor="review" className="font-semibold mb-0">Review</Label>
                <div className="flex ml-auto gap-1">
                    {STARS.map((star, index) => {
                        return <TooltipProvider key={index}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <AiFillStar
                                        onClick={() => {
                                            !loading && setRating((index + 1))
                                        }}
                                        style={{
                                            fill: index < rating ? 'hsl(var(--primary))' : 'hsl(var(--border))', // Change star color based on rating
                                            width: '24px',
                                            height: '24px',
                                            cursor: 'pointer',
                                        }}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    {star}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                    })}

                </div>
            </div>
            <Textarea variant="ghost" id="review" placeholder="Write your review here" value={review}
                onChange={(e) => setReview(e.target.value)} disabled={loading}
            />
            <div className="flex w-full justify-center items-center p-2">
                <Button onClick={() => handleSubmit()} disabled={loading}>
                    {loading ? "Submitting" : "Submit"}
                    {loading ? <CgSpinner className="animate-spin w-4 h-4 ml-2" /> : <TbSend className="w-4 h-4 ml-2" />}
                </Button>
            </div>
        </div>

    </>)

}

export default function AllReviews({ app }: {
    app: AppTypeWithFormFlow,
}) {

    const [page, setPage] = useState(1);
    const [loading, setloading] = useState(false);
    const [reviews, setReviews] = useState<{
        appId: string,
        userId: any,
        rating: number,
        review: string,
        createdAt: string,
        _id: string,
        __v?: number,
    }[]>([]);

    const fetchReviews = async () => {
        setloading(true)
        await fetch(`/api/apps/${app._id}/reviews?page=${page}&limit=5`)
            .then(res => res.json())
            .then(data => {
                //  check if we already have the review
                const filtered = data.result.filter((review: any) => {
                    return !reviews.find((r) => r._id === review._id)
                })
                setReviews([...reviews, ...filtered])
            })
            .catch(err => console.log(err))
            .finally(() => setloading(false))
    }
    useEffect(() => {
        fetchReviews()
    }, [page])
    return (
        <Card className="w-full max-w-[1024px] m-auto mt-5">
            <CardContent className="flex gap-2 flex-col pt-2">
                {reviews.map((review, index) => {
                    return <div key={index} className="flex flex-col gap-2 p-1  border-1 border-slate-100">
                        <div className="flex justify-between items-center p-2">
                            <div className="flex gap-2 items-center">
                                <Avatar>
                                    <AvatarImage src={review.userId.profileURL} alt={"@" + review.userId.username} />
                                    <AvatarFallback>{review.userId.name.trim().split("")[0]}</AvatarFallback>
                                </Avatar>
                                By <span className="font-semibold">{review.userId.name ? review.userId.name : "A User"}</span>
                            </div>
                            <div className="flex ">
                                <span className="mr-2 text-primary  text-sm font-medium px-2 py-1 rounded-md bg-primary/10 hover:bg-primary/20 capitalize ml-1">
                                    {STARS[review.rating - 1]}
                                </span>
                                {STARS.map((star, index) => {
                                    return <TooltipProvider key={index}>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <AiFillStar
                                                    key={index}
                                                    style={{
                                                        fill: index < review.rating ? 'hsl(var(--primary))' : 'hsl(var(--border))', // Change star color based on rating
                                                        width: '24px',
                                                        height: '24px',
                                                    }}
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {star}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                })}

                            </div>
                        </div>
                        <p className={((review.review === null || review.review.trim() === "") ? "italic font-light" : "") + " p-3 bg-slate-100 rounded-md"}>
                            {review.review === null || review.review.trim() === "" ? "No comment" : review.review}
                        </p>
                    </div>
                })}
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button onClick={() => setPage(page + 1)} disabled={loading}
                    size="icon"
                    className="bg-primary/30 hover:bg-primary/40 text-primary text-sm"
                >
                    {loading ? <CgSpinner className="animate-spin w-4 h-4" /> : <MdOutlineExpandMore className="w-4 h-4" />}
                </Button>
            </CardFooter>
        </Card>
    )
}


const STARS = [
    "Poor",
    "Below Average",
    "Average",
    "Good",
    "Excellent"
];