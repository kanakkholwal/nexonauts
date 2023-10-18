import { useState } from "react";
import { AppType } from "../types";
import { AiFillStar } from "react-icons/ai"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useSession } from "next-auth/react";
import { useFormContext } from "../form-context";

const stars = [
    "Poor",
    "Below Average",
    "Average",
    "Good",
    "Excellent"
];


const avgRating = (ratings: number[]) => {
    let avg_rating = 0;
    let sum_rating = 0;
    ratings.forEach((item, idx) => {
        avg_rating = avg_rating + (item * (idx + 1));
        sum_rating = sum_rating + item;
    });
    avg_rating = avg_rating / sum_rating;
    return {
        avg_rating,
        sum_rating
    }
}

export default function Rating({ app }: {
    app: AppType
}) {



    return (<>
        <div className="flex justify-start items-center mt-1">

            {stars.map((star, index) => {
                return <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <AiFillStar
                                key={index}

                                style={{
                                    fill: index < avgRating(app.ratings ?? [4, 2, 1, 3, 5]).avg_rating ? 'hsl(var(--primary))' : 'hsl(var(--border))', // Change star color based on rating
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
            (Avg. Rating : {avgRating(app.ratings || []).avg_rating.toFixed(1)})
        </div>
    </>)
}