import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export type RouterCardLink = {
  href: string;
  title: string;
  description: string;
  external?: boolean;
  Icon: React.ElementType;
};

export interface RouterCardProps extends RouterCardLink {
  style?: React.CSSProperties;
}

export function RouterCard({
  href,
  title,
  description,
  external = false,
  Icon,
  style,
}: RouterCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group rounded-lg flex flex-col justify-between gap-3 px-5 py-4",
        "animate-in popup  transition-colors duration-200 ease-in-out",
        "backdrop-blur-2xl border border-gray-50/30 bg-white/10 hover:bg-primary/5 hover:shadow-sm hover:border-primary/50"
      )}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : undefined}
      style={style}
    >
      <h2 className="text-xl font-semibold">
        <Icon className="w-8 h-8 text-primary inline-block mr-2" />
        {title}{" "}
      </h2>
      <p className="max-w-[30ch] text-sm opacity-80">{description}</p>
      <p className="text-sm whitespace-nowrap font-semibold text-primary/80 transition-all group-hover:text-primary group-hover:translate-x-1 motion-reduce:transform-none">
        Go to {title}
        {external ? (
          <ArrowUpRight className="w-4 h-4 ml-1 inline-block" />
        ) : (
          <ArrowRight className="w-4 h-4 ml-1 inline-block" />
        )}
      </p>
    </Link>
  );
}
