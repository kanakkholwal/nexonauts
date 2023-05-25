import HomePage from "pages/Home/Home.jsx";
import { registerView } from "lib/analytics";
import { useEffect } from "react";

export default function Home() {
  useEffect(() =>{
    registerView({ title: "Home Page", type: "home", slug: "/" })
},[])
  return <HomePage />
}
