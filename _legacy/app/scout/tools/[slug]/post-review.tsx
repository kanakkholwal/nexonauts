"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Rating } from "@/components/ui/rating";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import toast from "react-hot-toast";
import { PublicToolTypeWithId } from "src/models/tool";
import { RatingTypeWithId } from "src/models/tool-rating";

export function PostReview({
  tool,
  postRatingAndReview,
}: {
  tool: Partial<PublicToolTypeWithId>;
  postRatingAndReview: (data: {
    rating: number;
    comment: string;
  }) => Promise<RatingTypeWithId>;
}) {
  const [loading, setLoading] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");

  return (
    <>
      <Card className="border-none w-full">
        <CardHeader>
          <CardTitle>Rate {tool.name}</CardTitle>
          <CardDescription>
            Your review will help others decide if {tool.name} is right for
            them.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="w-full">
            <Label htmlFor="rating" className="block mb-2">
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            width="sm"
            onClick={() => {
              if (rating === 0) {
                toast.error("Please select a rating");
                return;
              }
              if (comment === "") {
                toast.error("Please enter a comment");
                return;
              }
              if (comment.length < 10) {
                toast.error("Comment should be at least 10 characters long");
                return;
              }
              setLoading(true);
              toast.promise(
                postRatingAndReview({
                  rating,
                  comment,
                }),
                {
                  loading: "Posting review...",
                  success: "Review posted",
                  error: (err) => {
                    return err.message;
                  },
                }
              );
              setLoading(false);
            }}
            disabled={loading || rating === 0}
          >
            {loading ? "Posting review..." : "Post Review"}
          </Button>{" "}
        </CardFooter>
      </Card>
    </>
  );
}
