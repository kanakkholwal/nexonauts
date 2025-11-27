// PostHeader component
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Author } from "src/models/post";
import { decodeHTMLEntities } from "~/utils/string";

interface PostHeaderProps {
  title: string;
  image: string;
  author: Author;
  createdAt: string;
}

export function PostHeader(props: PostHeaderProps) {
  const cleanTitle = decodeHTMLEntities(props.title);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10 md:pt-24 md:pb-16">
      <div className="flex flex-col gap-6 md:gap-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground w-full max-w-6xl">
          {cleanTitle}
        </h1>

        <div className="flex items-center gap-4 pb-6 border-b border-border">
          <Avatar className="size-12 md:size-16">
            <AvatarImage
              src={props.author.user?.image}
              alt={props.author.user?.name || "Author"}
            />
            <AvatarFallback>
              {props.author?.username?.split("")?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">
              {props.author.user?.name}
            </p>
            <p className="text-sm text-muted-foreground">
              Published on {new Date(props.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className="relative w-full aspect-video md:aspect-21/9 rounded-xl overflow-hidden border border-border/50 shadow-sm">
          <Image
            src={props.image}
            alt={cleanTitle}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>
      </div>
    </div>
  );
}

