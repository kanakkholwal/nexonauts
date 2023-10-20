import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import Link from "next/link";
import { RiShareCircleFill } from "react-icons/ri";

export default function ToolCard({ title, description, path, category, online,index, ...props }) {

    return (
        <Card  {...props}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-start grow">
                    {/* <Badge className="mb-2" as="small"  nature={["success","theme","warning","info","secondary"][index > 5 ? index % 5 : index]} pill>{category}</Badge> */}
                <CardDescription className="line-clamp-3 mb-3">
                    {description}
                </CardDescription>
                <Link href={path} className="mt-auto flex gap-2 items-center text-primary hover:underline">
                    Try this Tool
                    <RiShareCircleFill />
                </Link>
            </CardContent>
        </Card>
    )
}