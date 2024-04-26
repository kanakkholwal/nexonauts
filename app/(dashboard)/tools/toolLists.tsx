'use client'
import { PublicToolTypeWithId } from 'src/models/tool';
// import UserCard from './UserCard'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LazyImage from "components/image";
import { ChevronDown, LoaderCircle } from 'lucide-react';
import Link from "next/link";
import { useState } from 'react';
import { getToolsByUser } from './actions';


type ToolListProps = {
    initialTools: Partial<PublicToolTypeWithId>[]
}

const NUMBER_OF_USERS_TO_FETCH = 10

export default function ToolList({ initialTools }: ToolListProps) {
    const [offset, setOffset] = useState(NUMBER_OF_USERS_TO_FETCH)
    const [tools, setTools] = useState<Partial<PublicToolTypeWithId>[]>(initialTools);
    const [loading, setLoading] = useState(false)

    const loadMoreUsers = async () => {
        setLoading(true)
        const moreTools = await getToolsByUser(offset, NUMBER_OF_USERS_TO_FETCH)
        setTools([...tools, ...moreTools])
        setOffset(offset + NUMBER_OF_USERS_TO_FETCH);
        setLoading(false);
    }

    if (tools.length === 0)
        return null

    return (
        <>
            <div className="mx-auto w-full grow grid gap-4 grid-cols-1 @lg:grid-cols-2 @xl:grid-cols-3 @6xl:grid-cols-5">
                {tools.map((tool) => {
                    return (
                        <div key={tool._id}>
                            <Link href={`/tools/${tool.slug}/edit`} className="p-1">
                                <Card className="rounded-2xl backdrop-blur backdrop-saturate bg-opacity-75 bg-white-300 border-0 relative" variant="glass">
                                    <CardHeader className="p-2">
                                        <div className="flex flex-col w-full aspect-video overflow-hidden bg-white/30 dark:bg-white/5 backdrop-blur-lg border border-slate-500/10 dark:border-border/70 rounded-lg">
                                            <div className="relative flex items-center justify-center flex-shrink-0 h-full group w-auto m-auto overflow-hidden">
                                                <LazyImage className="w-auto h-auto m-auto transition ease-in-out duration-300 group-hover:scale-105"
                                                    width={350}
                                                    height={200}
                                                    src={tool.coverImage} alt={tool.name} />
                                                <div className="absolute inset-0 transition duration-200 opacity-0 group-hover:opacity-60"></div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="w-full text-xl font-semibold mb-2 inline-flex gap-2 justify-between items-center" title={tool.name}>
                                            {tool.name}
                                            <Badge variant={tool.verified ? "success" : "warning_light"} size="sm">{tool.verified ? "Verified" : "Not verified"}</Badge>
                                        </div>
                                        <Badge variant="default_light" size="sm" className="ml-auto">{tool.status}</Badge>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-center items-center py-4 mb-10">
                {loading ? <LoaderCircle className="w-8 h-8 animate-spin text-primary" /> : <Button onClick={loadMoreUsers} width="xs">Load more <ChevronDown /></Button>}
            </div>
        </>
    )
}