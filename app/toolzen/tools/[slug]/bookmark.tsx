"use client";
import { Bookmark, BookmarkCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { PublicToolTypeWithId } from 'src/models/tool';
import { formatNumber } from "src/utils/formaters";

export function BookMarkButton({ tool, toggleBookmark,userId }: { tool: PublicToolTypeWithId,userId?:string|null, toggleBookmark: (toolId: string, userId: string) => Promise<boolean> }) {

    return (<button
        onClick={() => {
            if (!userId) {
                toast.error("You need to be logged in to bookmark a tool");
                return;
            }
            toast.promise(toggleBookmark(tool._id!, userId), {
                loading: "Saving Bookmark...",
                success: (isBookmarked) => isBookmarked ? "Bookmarked" : "Removed from bookmarks",
                error: "An error occurred"
            });
        }}
        className="pointer-events-auto relative inline-flex rounded-md cursor-pointer border border-input bg-accent dark:bg-gray-800 dark:border-gray-700  dark:text-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm">
        <div className="flex px-3 py-2 gap-2">
            {userId ? (tool?.bookmarks?.includes(userId) ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />) : <Bookmark className="w-5 h-5" />}
            <span>
                {userId ? (tool?.bookmarks?.includes(userId) ? "Bookmarked" : "Bookmark") : "Bookmark"}
            </span>
        </div>
        <div className="border-l border-slate-400/20 px-2.5 py-2">{formatNumber(tool?.bookmarks?.length! || 0)}</div>
    </button>)
}