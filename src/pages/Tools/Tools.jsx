import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import PageMetaData from "../../components/PageMetaData";

export default function Tools() {

    const metaData = {
        title: "Tools | K K UPGRADER",
        description: "Collection of Web Tools , Design Tools , Editing and Coding Tools"
    }


    return (
        <>
            <PageMetaData PageTitle={metaData.title} PageDescription={metaData.description} />
            <Header title={"Tools"} description={metaData.description} />
            <Main />
            <Footer />
        </>
    )
}