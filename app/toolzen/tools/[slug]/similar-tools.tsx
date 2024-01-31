import { PublicToolTypeWithId } from 'app/toolzen/models/tool';
import { Zap } from 'lucide-react';
import Link from 'next/link';
export default function SimilarTools({ tools }: { tools: PublicToolTypeWithId[] }) {

    
    return (<>
        {tools.length > 0 ?<>
            <h3 className="text-2xl font-bold">Similar tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {tools.map(tool =>  {
                return (
                    <Link key={tool._id} href={`/toolzen/tools/${tool.slug}`} className="bg-slate-50 dark:bg-slate-800 hover:bg-primary/10 dark:hover:bg-primary/20 w-full flex flex-row items-center justify-start gap-4 border border-border px-2 py-3 rounded-md">
                        <img src={tool.coverImage} alt={tool.name} className="w-16 h-16 rounded-lg shadow-xl border border-slate-500/20  backdrop-blur-lg object-cover" />
                        <div className="flex flex-col items-start justify-start">
                            <h4 className="text-lg font-semibold">{tool.name}</h4>
                            <p className="text-base text-muted-foreground line-clamp-2 text-pretty">{tool.description}</p>
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