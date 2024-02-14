import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Zap } from 'lucide-react';
import Image from 'next/image';
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
        className="w-full mx-10"
      >
      <CarouselContent className="-ml-1">
          {tools.map((tool) => (
            <CarouselItem key={tool._id} className="md:basis-1/2 lg:basis-1/3">
              <Link href={`/toolzen/tools/${tool.slug}`} className="p-1">
                <Card>
                  <Image src={tool.coverImage!} alt={tool.name!} height={320} width={540} className="w-full h-auto max-w-sm  rounded-lg flex-auto  backdrop-blur-lg object-cover" />
                  <CardContent className="pt-5">
                    <h4 className="text-xl font-semibold">{tool.name}</h4>
                    <Badge variant="default_light" size="sm">{tool.pricing_type}</Badge>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </> : <div className="w-full flex flex-col items-center justify-center gap-4">
      <Zap className="w-24 h-24 text-gray-400" />
      <h3 className="text-gray-500 text-xl font-semibold">No similar tools found</h3>
      <p className="text-gray-500 text-base">We couldn't find any similar tools for this category.</p>
    </div>
    }
  </>)

}