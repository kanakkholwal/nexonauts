import { Badge } from "@/components/ui/badge";
import { Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PublicToolTypeWithId } from 'src/models/tool';

export default function SimilarTools({ tools }: { tools: Partial<PublicToolTypeWithId>[] }) {


    return (<>
        {tools.length > 0 ? <>
            <h3 className="text-2xl font-bold">Similar tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {tools.map(tool => {
                    return (
                        <Link key={tool._id} href={`/toolzen/tools/${tool.slug}`} className="bg-slate-50 dark:bg-slate-800 hover:bg-primary/5 dark:hover:bg-primary/10 w-full flex flex-row items-center justify-start gap-4 border border-border px-2 py-3 rounded-md">
                            <Image src={tool.coverImage!} alt={tool.name!} height={128} width={320} className="max-w-32 max-h-24 flex-auto rounded-lg  backdrop-blur-lg object-cover w-full my-auto" />
                            <div className="flex flex-col items-start justify-start">
                                <h4 className="text-lg font-semibold">{tool.name}</h4>
                                <p className="text-base text-muted-foreground line-clamp-2 text-pretty prose prose-sm  dark:prose-invert  prose-slate">
                                    <Badge variant="default_light" size="sm">{tool.pricing_type}</Badge>
                                </p>
                            </div>
                        </Link>
                    )
                })}
            </div>

        </> : <div className="w-full flex flex-col items-center justify-center gap-4">
            <Zap className="w-24 h-24 text-gray-400" />
            <h3 className="text-gray-500 text-xl font-semibold">No similar tools found</h3>
            <p className="text-gray-500 text-base">We couldn't find any similar tools for this category.</p>
        </div>
        }
    </>)

}