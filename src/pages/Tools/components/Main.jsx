
import ToolList from "../ToolsList";
import Card from "./Card";
export default function Main() {

    return (
        <main className="G_MainContent d-flex g-5 flex-wrap">

            {
                ToolList.map(({ title, description, path, category, online }, index) => {
                    return <Card path={path} title={title} description={description} category={category} online={online} key={title} style={{ animationDelay: (0.1 * index) + "s" }} />
                })
            }
        </main>


    )
}