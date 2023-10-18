import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { AppType } from "src/types/app";
import { SessionUserType } from "src/types/user";

export function PostReview({ app, user }: {
    app: AppType,
    user: SessionUserType
}) {
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(0);

    const handleSubmit = async () => {
        setLoading(true)


        await fetch(`/apps/${app._id}/review`, {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "user-id": user?.id
            },
            body: JSON.stringify({
                "comment": review,
                "rating": rating > 0 ? rating : 1
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
                        return <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <AiFillStar
                                        key={index}
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
                </Button>
            </div>
        </div>

    </>)

}

export default function AllReviews({ app, user }: {
    app: AppType,
    user: SessionUserType
}) {

    const [page, setPage] = useState(1);
    const [loading, setloading] = useState(false);
    const [reviews, setReviews] = useState<{
        comment: string | null,
        rating: number,
        app_id: string,
        user_id: string,
        user_name: string,
        created_at: string
    }[]>([]);

    const fetchReviews = async () => {
        setloading(true)
        await fetch(`/apps/${app._id}/reviews/all/paged?page=${page}&limit=5`)
            .then(res => res.json())
            .then(data => {
                const newArr = data.filter((item: any) => item.user_id != user?.id);
                console.log(newArr);
                setReviews([...reviews, ...newArr])
            })
            .catch(err => console.log(err))
            .finally(() => setloading(false))
    }
    useEffect(() => {
        fetchReviews()
    }, [page])
    return (
        <Card className="w-full max-w-[1024px] m-auto mt-5">
            <CardHeader className="flex justify-center border-b-2 border-slate-200	">
                <CardTitle className="text-2xl font-semibold">Reviews</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2 flex-col pt-3">
                {reviews.map((review, index) => {
                    return <div key={index} className="flex flex-col gap-2 p-1  border-1 border-slate-100">
                        <div className="flex justify-between items-center p-2">
                            <div>
                            By <span className="font-semibold">{review.user_name ? review.user_name : "Textify User"}</span>
                            </div>
                            <div>
                                <span className="mr-2">
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
                        <p className={((review.comment === null || review.comment.trim() === "") ? "italic font-light" : "") + " p-3 bg-slate-100 rounded-md"}>
                            {review.comment === null || review.comment.trim() === "" ? "No comment" : review.comment}
                        </p>
                    </div>
                })}
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button onClick={() => setPage(page + 1)} disabled={loading}
                    size="lg"
                    variant="ghost"
                    className="flex justify-center items-center gap-1 text-primary text-lg"
                >
                    {loading ? <CgSpinner className="animate-spin w-4 h-4" /> : <BsFillArrowDownCircleFill className="w-4 h-4" />}
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