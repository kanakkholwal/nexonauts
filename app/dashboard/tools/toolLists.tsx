"use client";
import { PublicToolTypeWithId } from "src/models/tool";
// import UserCard from './UserCard'
import { Button } from "@/components/ui/button";
import { ChevronDown, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getToolsByUser } from "./actions";

type ToolListProps = {
  initialTools: PublicToolTypeWithId[];
};

const NUMBER_OF_USERS_TO_FETCH = 10;

export default function ToolList({ initialTools }: ToolListProps) {
  const [offset, setOffset] = useState(NUMBER_OF_USERS_TO_FETCH);
  const [tools, setTools] =
    useState<PublicToolTypeWithId[]>(initialTools);
  const [loading, setLoading] = useState(false);

  const loadMoreUsers = async () => {
    setLoading(true);
    const moreTools = await getToolsByUser(offset, NUMBER_OF_USERS_TO_FETCH);
    setTools([...tools, ...moreTools]);
    setOffset(offset + NUMBER_OF_USERS_TO_FETCH);
    setLoading(false);
  };

  if (tools.length === 0) return null;

  return (
    <>
      <div className="mx-auto w-full grow grid gap-4 grid-cols-1 @lg:grid-cols-2 @xl:grid-cols-3 @6xl:grid-cols-5">
        {tools.map((tool) => {
          return (
            <div key={tool._id}>
              <Link href={`/dashboard/tools/${tool.slug}/edit`} className="h-full flex flex-col gap-4 items-start p-4 rounded-lg border backdrop-blur-md bg-card transition-all duration-500 hover:border-primary/50 group"
              >

                <div className="flex flex-col gap-1 shrink">
                  <h3 className="text-lg font-semibold">
                    {tool.name}
                  </h3>
                  <p className="text-muted-foreground text-sm font-medium line-clamp-2">
                    {tool.description}
                  </p>
                </div>
                <Image
                  src={tool.coverImage}
                  alt={tool.name}
                  height={128}
                  width={320}
                  className="max-h-32 object-cover  rounded-lg  w-full mx-auto mt-auto"
                />
              </Link>

            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center py-4 mb-10">
        {loading ? (
          <LoaderCircle className="w-8 h-8 animate-spin text-primary" />
        ) : (
          <Button onClick={loadMoreUsers} width="xs">
            Load more <ChevronDown />
          </Button>
        )}
      </div>
    </>
  );
}
