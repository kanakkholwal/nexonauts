import { Card, CardBody, CardTitle, CardDescription } from "components/Card";
import Badge from "components/topography/badge";
import { RiShareCircleFill } from "react-icons/ri";
import Link from "next/link";

export default function ToolCard({ title, description, path, category, online,index, ...props }) {

    return (
        <Card  {...props}>
            <CardBody className="d-flex flex-column justify-content-start">
                <CardTitle>{title}</CardTitle>
                <div>
                    <Badge className="mb-2" as="small"  nature={["success","theme","warning","info","secondary"][index > 5 ? index % 5 : index]} pill>{category}</Badge>
                </div>
                <CardDescription>
                    {description}
                </CardDescription>
                <Link href={path} className="mt-auto">
                    Try this Tool
                    <RiShareCircleFill />
                </Link>
            </CardBody>
        </Card>
    )
}