import Home from "../_Home.module.scss";
import Title from "./Title";
import Content from "./Content";




export default function Main({ MainContent }) {



    return (
        <>

            {
                MainContent.map(({ title, content, link, ImageUrl }) => {

                    return <section key={title} id={title.toLowerCase().split(" ").join("-")}>
                        <div className={Home.Title}>
                            <Title title={title} />
                        </div>
                        <div className={Home.Content}>
                            <Content content={content} link={link} ImageUrl={ImageUrl} />
                        </div>
                    </section>
                })
            }
        </>

    )
}