import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Author } from "src/models/post";

interface SidebarProps {
  author: Author;
  createdAt: string;
  content: string;
}



export function SideBar(props: SidebarProps) {
  // Calculate reading time
  const wordCount = props.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  
  return (
    <aside className="sticky top-6 h-fit w-full max-w-md mx-auto lg:ml-auto lg:max-w-xs">
      <div className="bg-card rounded-xl border border-border/50 p-6 shadow-sm">
        <div className="flex flex-col items-center text-center gap-4">
          <Avatar className="size-24 md:size-32">
            <AvatarImage 
              src={props.author?.user?.profilePicture} 
              alt={props.author?.user?.name || "Author"}
              className="size-24 md:size-32"
            />
            <AvatarFallback>
              {props.author?.username?.split("")?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              Written by {props.author?.user?.name}
            </h3>
            
            <div className="text-sm text-muted-foreground">
              <p>
                {readingTime} min read • Published on{" "}
                {new Date(props.createdAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </p>
            </div>
            
            <Link
              href={`/blog/authors/${props.author.username}`}
              className="inline-block text-primary hover:underline text-sm"
            >
              View author profile
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
