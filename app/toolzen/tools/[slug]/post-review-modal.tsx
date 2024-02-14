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
import { Textarea } from "@/components/ui/textarea";
import { PublicToolTypeWithId } from 'src/models/tool';

export function PostReviewModal({tool}:{
    tool: Partial<PublicToolTypeWithId>
}) {
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
                
                    <div className="grid w-full items-center gap-2">
                        <Label htmlFor="comment">
                            Comment <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="comment"
                            name="comment"
                            placeholder="Write a review"
                            variant="fluid"
                            required
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
