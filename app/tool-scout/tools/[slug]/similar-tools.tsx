import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LazyImage from "src/components/image";
import { Zap } from 'lucide-react';
import Link from 'next/link';
import { PublicToolTypeWithId } from 'src/models/tool';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export default function SimilarTools({ tools }: { tools: Partial<PublicToolTypeWithId>[] }) {


  return (<>
    {tools.length > 0 ? <>
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-[90%] max-w-5xl mx-auto"
      >
        <CarouselContent className="-ml-2 md:-ml-4 px-2 md:px-4">
          {tools.map((tool) => (
            <CarouselItem key={tool._id} className="md:basis-1/2 lg:basis-1/3 pl-2 md:pl-4">
              <Link href={`/tool-scout/tools/${tool.slug}`} className="p-1">
                <Card className="rounded-3xl">
                  <CardHeader>
                  <div className="flex flex-col w-full h-auto aspect-video overflow-hidden bg-gray-100 dark:bg-slate-800 rounded-xl">
                    <div className="relative flex items-center justify-center flex-shrink-0 h-full group">
                      <LazyImage className=" h-auto rounded-lg shadow-md mx-auto object-cover object-left-top transition ease-in-out duration-300"
                        width={350}
                        height={200}
                        src={tool.coverImage} alt={tool.name} />
                      <div className="absolute inset-0 transition duration-200 bg-gray-900 opacity-0 rounded-2xl group-hover:opacity-60"></div>
                    </div>
                  </div>
                  </CardHeader>

                  {/* <Image src={tool.coverImage!} alt={tool.name!} height={320} width={540} className="w-full h-auto max-w-sm  rounded-lg flex-auto  backdrop-blur-lg object-cover" /> */}
                  <CardContent>
                    <h4 className="text-xl font-semibold mb-2">{tool.name}</h4>
                    <Badge variant="default_light" size="sm">{tool.pricing_type}</Badge>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="h-12 w-12" />
        <CarouselNext className="h-12 w-12" />
      </Carousel>
    </> : <div className="w-full flex flex-col items-center justify-center gap-4">
      <Zap className="w-24 h-24 text-gray-400" />
      <h3 className="text-gray-500 text-xl font-semibold">No similar tools found</h3>
      <p className="text-gray-500 text-base">We couldn't find any similar tools for this category.</p>
    </div>
    }
  </>)

}