import Login from "@backend/components/LoginCard";
import Head from "next/head";
import classes from "@backend/styles/_Login.module.scss";
import LocalImage from "@/components/LocalImage";
import blur from '../../../public/assets/backgrounds/dashboard.jpg';


export default function LoginPage() {

    return (<>
        <Head>
            <title>Admin Panel</title>
        </Head>

        <div className={classes.LoginPage}>
            <div className={classes.Greeting}>
                <h3>Hi , Welcome Back</h3>
                <div className={classes.illustrationContainer}>
                    <div className={classes.Wrapper}>
                        <LocalImage src="assets/images/illustration_dashboard.png" width="600" height="600" alt="Dashboard Illustration" />
                    </div>
                </div>
                <div className={classes.mask} style={{
                    backgroundImage: `url(${blur.src})`
                }} />
            </div>
            <div className={classes.LoginArea}>
                <div className={classes.Inner}>
                    <div className={classes.Header}>
                        <h4>Sign in to Admin DashBoard</h4>
                    </div>
                    <Login />
                </div>


            </div>


        </div>
    </>)
}