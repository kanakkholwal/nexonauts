import { Button } from "@/components/ui/button";
import {
    CardContainer,
    ToolCard
} from "components/tools";
import Link from "next/link";
import { ToolList } from "pages/tools/ToolsList";



export default function SimilarTools({category,tool}) {
    const similars = ToolList.filter((tool) => tool.category === category);

    return (<>
        <div className="flex gap-2 w-full items-center justify-between">
            <h3 className="font-semibold text-lg">More Like this  ...</h3>
            <Link href="/tools/">
            <Button variant="outline" className="text-primary">See all</Button>
            </Link>
            
        </div>
        <hr className="my-2" />
        <CardContainer>
            {similars.map(({ title, description, path, category, online }, index) => {
                        return <ToolCard className="!bg-slate-100 flex flex-col items-start" path={path} key={index} title={title} description={description} category={category} online={online} index={index} style={{ animationDelay: (0.1 * index) + "s" }} />
                    })}
        </CardContainer>

    </>)
}