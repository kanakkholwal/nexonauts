import Link from "next/link";
import { RiShareCircleFill } from "react-icons/ri";

import components from "./_components.module.scss";
export default function Card({ title, description, path, category, online, ...props }) {

    return (
        <div className={"Fui_Card " + components.ToolCard}  {...props}>

            <div className={"Fui_Card-body "}>
                <h4 className={"Fui_Card-title " + components.CardTitle}>{title}</h4>
                <span className=" Badge  mb-2 ">{category}</span>
                <span className={"Badge  mb-2 ms-2 " + (online ? "Badge_success" : "Badge_danger")} title={online ? " Tool is working Fine :)" : "Tool has Some Issues ;)"}>{online ? "On" : "Off"}</span>
                <p className={"Fui_Card-text " + components.CardDescription}>
                    {description}
                </p>
                <Link href={path} className="Fui_Card-link">
                    Try this Tool
                    <RiShareCircleFill />
                </Link>
            </div>


        </div>
    )
}