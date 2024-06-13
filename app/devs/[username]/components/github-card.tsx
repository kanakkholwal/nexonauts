import { CircleIcon, StarIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDistance } from "date-fns";
import { GoRepoForked } from "react-icons/go";
export function RepositoryCard({ repository }) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="grid grid-cols-[1fr_90px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{repository.name}</CardTitle>
          <CardDescription>
            {repository.description || "No description provided."}
          </CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <Button variant="secondary" className="px-3 shadow-none">
            <StarIcon className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-[20px]" />

          <Button variant="secondary" className="px-3 shadow-none">
            <GoRepoForked className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            {repository.language && (
              <>
                <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                {repository.language}
              </>
            )}
          </div>
          <div className="flex items-center">
            <StarIcon className="mr-1 h-3 w-3" />
            {repository.stargazers_count}
          </div>
          <div className="ml-auto">
            Updated{" "}
            {formatDistance(new Date(repository.updated_at), new Date(), {
              addSuffix: true,
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
