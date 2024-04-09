import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import tools, { ToolType } from '../collection';
import RenderTool from './render-tool';

type ToolPageProps = {
    params:{
        slug: string
    }
}
export async function generateMetadata({ params }: ToolPageProps, parent: ResolvingMetadata): Promise<Metadata> {

    const tool = tools.find(tool=>tool.slug === params.slug) as ToolType | null;
    if(tool === null) return notFound();

    return {
        title: tool.title,
        description: tool.description.substring(0, 160),
        keywords: tool.tags?.join(", "),
        metadataBase: new URL((process.env.NEXT_PUBLIC_WEBSITE_URL || "https://nexonauts.com") + "/dev-tools/" + tool.slug),
        openGraph: {
            title: tool.title,
            description: tool.description.substring(0, 160),
            url: (process.env.NEXT_PUBLIC_WEBSITE_URL || "https://nexonauts.com") + "/dev-tools/" + tool.slug,
        },
        category: tool.category,
    }
}

export default function ToolPage({params}:ToolPageProps){
    const tool = tools.find(tool=>tool.slug === params.slug) as ToolType | null;
    if(tool === null) return notFound();

    return <RenderTool tool={tool} />
}