import classes from "./_Home.module.scss";


export default function Footer({ SocialMedia }) {

    return (
        <>
            <footer className={classes.footer}>
                <div className={classes.Container}>
                    <p className={classes.copyright}>
                        © {new Date().getFullYear()} <strong>kkupgrader</strong> . All rights reserved.
                    </p>
                    <ul className={classes.SocialList}>
                        {
                            SocialMedia.map(({ name, icon, url }) => {
                                return (
                                    <li key={name}>
                                        <a href={url} title={name} className={classes.SocialLink}>
                                            {icon}
                                        </a>
                                    </li>
                                )
                            })

                        }

                    </ul>
                </div>
            </footer>

        </>
    )
}