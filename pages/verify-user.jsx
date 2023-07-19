// Your verification page or component

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Spinner } from 'components/Loader';
import axios from 'axios';
import Head from 'next/head';



export default function VerifyUser() {
    const router = useRouter();
    const { token } = router.query;
    const verify = async () =>{
        await axios.get(`/api/auth/verify?token=${token}`)
                .then((response) => {
                    console.log(response.data.message);
                    // Handle successful verification
                    router.push(response.data.callbackUrl);
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                    // Handle verification error
                })
    }
    useEffect(() => {
        if (token) {
            verify()
        }
        else{
            router.push('/signup');
        }
    }, [token]);


    return (<div className='d-flex justify-content-center align-items-center flex-column g-3' style={{
        width: '100%',
        height: '100vh',
    }}>
        <Spinner />

        Verification in progress...


        <Head>
            <title>Verification</title>
        </Head>



    </div>);
};
