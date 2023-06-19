import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components';


export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }

    render() {


        return (
            <Html lang='en'>
                <Head>
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
                    <NextScript async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6988693445063744" ></NextScript>
                    <link href='https://fonts.googleapis.com/css?family=Fira+Code:wght@300,400,500,600&display=swap' rel='stylesheet' />
                </Head>
                <body>
                    <Main />
                </body>
            </Html>
        )
    }
}