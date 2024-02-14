"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Rating } from "@/components/ui/rating";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { PublicToolTypeWithId } from 'src/models/tool';
import { RatingTypeWithId, rawRatingType } from 'src/models/tool-rating';

export function PostReviewModal({tool,
    postRatingAndReview
}:{
    tool: Partial<PublicToolTypeWithId>,
    postRatingAndReview:(data: rawRatingType) => Promise<RatingTypeWithId>

}) {
    const [loading, setLoading] = React.useState(false);
    const [rating, setRating] = React.useState(0);
    const [comment, setComment] = React.useState("");

    
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Rate this tool
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Rate {tool.name}
                    </DialogTitle>
                    <DialogDescription>
                        Your review will help others decide if {tool.name} is right for them.
                    </DialogDescription>
                </DialogHeader>
                
                    <div className="w-full">
                        <Label htmlFor="comment" className="block mb-2">
                            Rating <span className="text-red-500">*</span>
                        </Label>
                        <Rating
                            count={5}
                            value={rating}
                            className="mx-auto"
                            onChange={(value) => {
                                setRating(value);
                            }}
                            
                        />
                    </div>
                    <div className="grid w-full items-center gap-2">
                        <Label htmlFor="comment">
                            Comment <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="comment"
                            name="comment"
                            placeholder="Write a review"
                            variant="fluid"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        
                        />
                    </div>
                <DialogFooter>
                    <Button type="submit">
                        Post Review
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
