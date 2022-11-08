import Link from "next/link";

import components from "./_components.module.scss";
export default function Card({ title, description, path, category, online }) {

    return (
        <div className={"G_Card " + components.ToolCard}>
            <div className={"G_Card-body " + components.CardBody}>
                <div className={components.Info}>

                    <h5 className={"G_Card-title " + components.CardTitle}>{title}</h5>
                    <span className=" Badge  mb-2 ">{category}</span>
                    <span className={"Badge  mb-2 ms-2 " + (online ? "Badge_success" : "Badge_danger")} title={online ? " Tool is working Fine :)" : "Tool has Some Issues ;)"}>{online ? "On" : "Off"}</span>
                    <p className={"G_Card-text " + components.CardDescription}>
                        {description}
                    </p>
                </div>
                <Link href={path} className="G_Card-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-corner-down-right"><polyline points="15 10 20 15 15 20" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>
                    Use this Tool</Link>
            </div>
        </div>
    )
}