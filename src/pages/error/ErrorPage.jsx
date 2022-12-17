
import Link from 'next/link';
import Head from 'next/head';
import styles from "./_ErrorPage.module.scss"

export default function ErrorPage() {


    return (
        <>
            <Head>
                <title>404 | Page Not Found</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css?family=Montserrat:400,600,700" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Catamaran:400,800" rel="stylesheet" />
            </Head>
            <div className={styles.ErrorPage}>
                <section className={styles.errorContainer}>
                    <span className={styles.four}><span className={styles.screenReaderText}>4</span></span>
                    <span className={styles.zero}><span className={styles.screenReaderText}>0</span></span>
                    <span className={styles.four}><span className={styles.screenReaderText}>4</span></span>
                </section >
                <h1>Page Not Found</h1>
                <div className="d-flex justify-content-center " style={{ width: "100%" }}>


                    <div className={styles.linkContainer}>
                        <a className={styles.moreLink + " p-2 px-3"} onClick={() => history.go(-1)} title="Go Back"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></a>
                        <Link href="/" className={styles.moreLink} title="Go to HomePage">Go the HomePage</Link>
                    </div>
                </div>
            </div >
        </>
    )
}