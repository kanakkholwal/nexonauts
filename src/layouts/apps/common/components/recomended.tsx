import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AppType } from "src/types/app";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";

export default function Recomended({ app }: { app: AppType }) {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`api/apps/app-category?q=${app.categories[0]}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setRecommended(data);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="flex justify-center items-stretch gap-2 flex-wrap">
      {error && (
        <div className="w-full h-full flex justify-center items-center">
          <span className="text-red-500">Error loading recommended apps</span>
        </div>
      )}
      {loading &&
        [1, 2, 3].map((_, index) => {
          return (
            <Card
              className="relative p-2 max-w-[280px] flex flex-col justify-center items-center"
              key={index}
            >
              <span className="absolute top-2 right-2 bg-slate-100 text-primary px-2 py-1 rounded-md text-xs flex items-center">
                <Skeleton className="w-[25px] h-[20px] rounded-sm" />
                <AiFillStar className="inline-block ml-1 h-4 w-4 text-primary" />
              </span>
              <CardContent className="flex items-center justify-center">
                <Skeleton className="w-[200px] h-[180px] rounded-md m-auto" />
              </CardContent>
              <CardHeader className="text-center !p-0">
                <CardTitle className="text-[20px] font-semibold">
                  <Skeleton className="w-[180px] h-[20px] rounded-full" />
                </CardTitle>
                <CardDescription className="text-[16px] font-medium mb-3">
                  <Skeleton className="w-[200px] h-[16px] rounded-full" />
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}

      {!error &&
        !loading &&
        recommended
          .filter((item: AppType) => item._id != app._id)
          .slice(0, recommended.length <= 3 ? recommended.length : 3)
          .map((tool: AppType, index: number) => {
            let avg_rating = 0;
            let sum_rating = 0;
            // tool.ratings?.forEach((item: number, idx: number) => {
            //     avg_rating = avg_rating + (item * (idx + 1));
            //     sum_rating = sum_rating + item;
            // });

            return (
              <Card
                key={index}
                className="relative p-2 max-w-[280px] flex flex-col justify-center items-center"
              >
                <span className="absolute top-2 right-2 bg-slate-100 text-primary px-2 py-1 rounded-md text-xs">
                  {(avg_rating / sum_rating).toFixed(1)}
                  <AiFillStar className="inline-block ml-1 h-4 w-4 text-primary" />
                </span>
                <CardContent className="flex flex-col items-center gap-2 justify-center ">
                  <Image
                    src={`/icons/${tool.appId}.svg`}
                    alt={tool.name}
                    width={300}
                    height={320}
                    className="max-w-[120px] object-contain m-auto"
                  />
                  {app.tags.map((tag, index) => {
                    return <Badge key={index}>{tag}</Badge>;
                  })}
                </CardContent>
                <CardHeader className="text-center !p-0">
                  <CardTitle className="text-[20px] font-semibold">
                    <Link href={tool.path}>{tool.name}</Link>
                  </CardTitle>
                  <CardDescription className="text-[16px] font-medium">
                    {app.shortDescription.length > 40
                      ? app.shortDescription.trim().slice(0, 40) + " ..."
                      : app.shortDescription.trim()}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
    </div>
  );
}
