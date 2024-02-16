"use client";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { TbStar, TbStarFilled } from "react-icons/tb";

import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";


type iconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
export type colors =
    | "gray"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "teal"
    | "cyan"
    | "blue"
    | "indigo"
    | "purple"
    | "pink"
    | "red"

export interface RatingProps extends Omit<React.ComponentProps<"div">, "onChange"> {
    count?: number;
    value?: number;
    ratedIcon?: iconType;
    unratedIcon?: iconType;
    ratedColor?: "white" | colors;
    unratedColor?: "white" | colors;
    className?: string;
    onChange?: (value: number) => void;
    readonly?: boolean;
    size?: "sm" | "md" | "lg";
}
const unratedColorVariants = cva(
    "text-gray-500 dark:text-gray-400",
    {
        variants: {
            variant: {
                gray: "text-gray-500 dark:text-gray-400",
                orange: "text-orange-500 dark:text-orange-400",
                amber: "text-amber-500 dark:text-amber-400",
                yellow: "text-yellow-500 dark:text-yellow-400",
                lime: "text-lime-500 dark:text-lime-400",
                green: "text-green-500 dark:text-green-400",
                teal: "text-teal-500 dark:text-teal-400",
                cyan: "text-cyan-500 dark:text-cyan-400",
                blue: "text-blue-500 dark:text-blue-400",
                indigo: "text-indigo-500 dark:text-indigo-400",
                purple: "text-purple-500 dark:text-purple-400",
                pink: "text-pink-500 dark:text-pink-400",
                red: "text-red-500 dark:text-red-400",
                white: "text-white dark:text-white",
            },
            size: {
                sm: "w-4 h-4",
                md: "w-6 h-6",
                lg: "w-8 h-8",
            }
        },
        defaultVariants: {
            variant: "gray",
            size: "md"
        }
    },
);
const ratedColorVariants = cva(
    "text-gray-300 dark:text-gray-400",
    {
        variants: {
            variant: {
                gray: "text-gray-300 dark:text-gray-400",
                orange: "text-orange-300 dark:text-orange-400",
                amber: "text-amber-300 dark:text-amber-400",
                yellow: "text-yellow-300 dark:text-yellow-400",
                lime: "text-lime-300 dark:text-lime-400",
                green: "text-green-300 dark:text-green-400",
                teal: "text-teal-300 dark:text-teal-400",
                cyan: "text-cyan-300 dark:text-cyan-400",
                blue: "text-blue-300 dark:text-blue-400",
                indigo: "text-indigo-300 dark:text-indigo-400",
                purple: "text-purple-300 dark:text-purple-400",
                pink: "text-pink-300 dark:text-pink-400",
                red: "text-red-300 dark:text-red-400",
                white: "text-white dark:text-white",
            },
            size: {
                sm: "w-4 h-4",
                md: "w-6 h-6",
                lg: "w-8 h-8",
            }
        },
        defaultVariants: {
            variant: "gray",
            size: "md"
        }
    },
);


export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(({
    count,
    value,
    ratedIcon,
    unratedIcon,
    ratedColor,
    unratedColor,
    className,
    onChange,
    readonly,
    size,
    ...rest 
}, ref) => {
    const randomId = React.useId();

    const ratingValue = value || 0;
    const ratingCount = count || 5;
    const ratingRatedIcon = ratedIcon || TbStarFilled;
    const ratingUnratedIcon = unratedIcon || TbStar;

    const ratingRatedColor = cn(ratedColorVariants({ variant: unratedColor || "yellow", size: size || "md" }))
    const ratingUnratedColor = cn(unratedColorVariants({ variant: unratedColor || "gray", size: size || "md" }))


    const ratingClasses = cn(
        "inline-flex space-x-1 text-2xl select-none",
        (!readonly ? "cursor-pointer" : "cursor-default"),
        className,
    );
    const ratedIconClasses = cn(
        (!readonly ? "transition-colors duration-300 ease-in-out cursor-pointer select-none hover:scale-110 dark:hover:scale-110 transform-gpu hover:translate-y-0 dark:hover:translate-y-0 translate-y-0 hover:translate-x-0 dark:hover:translate-x-0 translate-x-0" : ""),
    );




    return (
        <>
            <TooltipProvider key={"rating_" + randomId + "_provider"}>
                <Tooltip key={"rating_" + randomId}>
                    <TooltipTrigger asChild>
                        <div {...rest} ref={ref} className={ratingClasses}>
                            {[...Array(ratingCount)].map((_, index) => {
                                const ratingIndex = index + 1;
                                const Icon = ((ratingIndex <= ratingValue) ? ratingRatedIcon : ratingUnratedIcon) as iconType;
                                return (
                                    <Icon
                                        key={"rating_" + randomId + "_" + index}
                                        className={cn(ratedIconClasses, (ratingIndex <= ratingValue ? ratingRatedColor : ratingUnratedColor))}
                                        onClick={(e) => {
                                            if (onChange && !readonly) {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                onChange(ratingIndex);
                                            }
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <div className="flex items-center gap-1">
                            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">{ratingValue}</p>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
                            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">{ratingCount}</p>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    );
},
);


