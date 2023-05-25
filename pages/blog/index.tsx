import { NavBar } from "components/blog";
import { PostCard } from "components/blog";
import { registerView } from "lib/analytics";
import { useEffect } from "react";


export default function BlogHomePage() {

    useEffect(() =>{
        registerView({ title: "K K UPGRADER BLOG", type: "page", slug: "/blog" })
    },[])

    return (<>
        <NavBar />
        <PostCard imageSrc="https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680956809/kkupgrader/React_Development_Made_Easy_The_Ultimate_List_of_Tools_and_Frameworks_v0szon.png" title={"React Development Made Easy: The Ultimate List of Tools and Frameworks"} description={"Discover Gatsby, Next.js, Webpack, Storybook, Preact, NWB Toolkit, and Razzle - essential tools and frameworks for React developers looking to enhance"}/>
        <PostCard imageSrc="https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680956809/kkupgrader/React_Development_Made_Easy_The_Ultimate_List_of_Tools_and_Frameworks_v0szon.png" title={"React Development Made Easy: The Ultimate List of Tools and Frameworks"} description={"Discover Gatsby, Next.js, Webpack, Storybook, Preact, NWB Toolkit, and Razzle - essential tools and frameworks for React developers looking to enhance"}/>
        <PostCard imageSrc="https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680956809/kkupgrader/React_Development_Made_Easy_The_Ultimate_List_of_Tools_and_Frameworks_v0szon.png" title={"React Development Made Easy: The Ultimate List of Tools and Frameworks"} description={"Discover Gatsby, Next.js, Webpack, Storybook, Preact, NWB Toolkit, and Razzle - essential tools and frameworks for React developers looking to enhance"}/>
    </>)
}