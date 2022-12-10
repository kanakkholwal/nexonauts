
import ToolList from "../ToolsList";
import Card from "./Card";
import component from "./_components.module.scss";

export default function Main() {

    return (
        <main className={[component.Container, component.Main].join(" ")}>

            {
                ToolList.map(({ title, description, path, category, online }, index) => {
                    return <Card path={path} key={index} title={title} description={description} category={category} online={online} style={{ animationDelay: (0.1 * index) + "s" }} />

                })
            }
        </main>


    )
}