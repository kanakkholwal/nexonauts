import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Author } from "src/models/post";

interface SidebarProps {
  author: Author;
  createdAt: string;
  content: string;
}

export function SideBar(props: SidebarProps) {
  console.log(props.author);
  return (
    <aside className="@3xl:sticky @3xl:top-5 overflow-hidden space-y-10 p-5 rounded-lg border backdrop-blur-lg shadow w-full @4xl:w-max @4xl:ml-auto shrink-0">
      <div className="flex flex-col items-start space-y-4">
        <Avatar className="size-56">
          <AvatarImage src={props.author?.user?.profilePicture} className="size-56" />
          <AvatarFallback>
            {props.author?.username?.split("")?.[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold leading-none text-gray-700 dark:text-gray-200">
            Written by {props.author?.user?.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Learn more{" "}
            <Link
              href={`/blog/authors/${props.author.username}`}
              className="underline"
            >
              about the author
            </Link>
          </p>
        </div>
      </div>
    </aside>
  );
}
