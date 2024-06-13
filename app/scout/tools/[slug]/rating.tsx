import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Rating } from '@/components/ui/rating';
import { Skeleton } from '@/components/ui/skeleton';
import MarkdownView from 'src/components/markdown/view';
import { RatingTypeWithId } from 'src/models/tool-rating';

import { format, parseISO } from 'date-fns';

export default function RatingComponent({
  rating,
}: {
  rating: RatingTypeWithId;
}) {
  return (
    <section className="p-6 rounded-2xl bg-slate-100/40 dark:bg-gray-800 border border-border flex gap-2 w-full">
      <Avatar>
        <AvatarImage
          height={40}
          width={40}
          src={rating.userId.profilePicture}
          alt={'@' + rating.userId.username}
          className="h-10 w-10"
        />
        <AvatarFallback className="uppercase">
          {rating.userId.username.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h4 className="prose-h2">{rating.userId.name}</h4>
          <Rating value={rating.rating} count={5} readonly={true} size="sm" />
          <time dateTime={rating.createdAt?.toString()!} className="text-sm">
            {format(parseISO(rating.createdAt?.toString()!), 'dd MMM yyyy')}
          </time>
        </div>
        <MarkdownView className="prose dark:prose-invert prose-slate">
          {rating.comment}
        </MarkdownView>
      </div>
    </section>
  );
}

export function RatingSkeletonLoader() {
  return (
    <section className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 flex gap-2 w-full">
      {/* Skeleton placeholder for Avatar */}
      <Skeleton className="h-10 w-10" />
      <div className="flex flex-col gap-2">
        {/* Skeleton placeholder for name */}
        <Skeleton className="h-6 w-40" />
        <div className="flex items-center justify-between gap-2">
          {/* Skeleton placeholder for rating */}
          <Skeleton className="h-6 w-24" />
          {/* Skeleton placeholder for time */}
          <Skeleton className="h-6 w-24" />
        </div>
        {/* Skeleton placeholder for comment */}
        <Skeleton className="h-10 w-full" />
      </div>
    </section>
  );
}
