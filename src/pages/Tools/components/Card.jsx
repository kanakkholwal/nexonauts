import Link from "next/link";

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
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-corner-down-right"><polyline points="15 10 20 15 15 20" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>
                    Use this Tool</Link>
            </div>


        </div>
    )
}