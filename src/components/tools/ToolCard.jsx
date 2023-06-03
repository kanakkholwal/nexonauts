import { Card, CardBody, CardTitle, CardDescription } from "components/Card";
import Badge from "components/topography/badge";
import { RiShareCircleFill } from "react-icons/ri";
import Link from "next/link";

export default function ToolCard({ title, description, path, category, online, ...props }) {

    return (
        <Card  {...props}>
            <CardBody className="d-flex flex-column justify-content-start">
                <CardTitle>{title}</CardTitle>
                <div>
                    <Badge className="mb-2" as="small"  nature={["danger","theme","warning","info","secondary"][Math.floor(Math.random() * 5)]} pill>{category}</Badge>
                    <Badge nature={(online ? "success" : "danger")} className={"mb-2 ms-2 "} pill title={online ? " Tool is working Fine :)" : "Tool has Some Issues ;)"}>{online ? "On" : "Off"}</Badge>

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