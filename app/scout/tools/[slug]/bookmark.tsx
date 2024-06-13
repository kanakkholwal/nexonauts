'use client';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { PublicToolTypeWithId } from 'src/models/tool';

export function BookMarkButton({
  tool,
  toggleBookmark,
  userId,
}: {
  tool: PublicToolTypeWithId;
  userId?: string | null;
  toggleBookmark: (toolId: string) => Promise<boolean>;
}) {
  return (
    <Button
      onClick={() => {
        if (!userId) {
          toast.error('You need to be logged in to bookmark a tool');
          return;
        }
        toast.promise(toggleBookmark(tool._id!), {
          loading: 'Saving Bookmark...',
          success: (isBookmarked) =>
            isBookmarked ? 'Bookmarked' : 'Removed from bookmarks',
          error: 'An error occurred',
        });
      }}
      title={
        userId
          ? tool?.bookmarks?.includes(userId)
            ? 'Bookmarked'
            : 'Bookmark'
          : 'Bookmark'
      }
      className="icon"
      variant="link"
    >
      {userId ? (
        tool?.bookmarks?.includes(userId) ? (
          <BookmarkCheck />
        ) : (
          <Bookmark />
        )
      ) : (
        <Bookmark />
      )}
    </Button>
  );
}
