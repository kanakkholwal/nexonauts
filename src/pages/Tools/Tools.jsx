import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Tools() {

    const metaData = {
        title: "Tools | K K UPGRADER",
        description: "Collection of Web Tools , Design Tools , Editing and Coding Tools"
    }


    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{metaData.title}</title>
                    <meta name="description" content={metaData.description} />
                </Helmet>
            </HelmetProvider>
            <Header title={"Tools"} description={metaData.description} />
            <Main />
            <Footer />
        </>
    )
}