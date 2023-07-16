// Your verification page or component

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Spinner } from 'components/Loader';
import axios from 'axios';
import Head from 'next/head';

const VerificationPage = () => {
  const router = useRouter();
  const { token } = router.query;
  
    useEffect(() => {
        if (token) {
            async () => (await axios.get(`/api/auth/verify?token=${token}`)
                .then((response) => {
                    console.log(response.data.message);
                    // Handle successful verification
                    router.push('/login');
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                    // Handle verification error
                }))();
        }
    }, [token]);
    if(router.query.token === undefined || router.query.token === null) router.push('/signup');

  
  return <div className='d-flex justify-content-center align-items-center flex-column g-3' style={{
    width: '100%',
    height: '100vh',
  }}>
  <Spinner />
  
  Verification in progress...


  <Head>
    <title>Verification</title>
  </Head>
  
  
  
  </div>;
};

export default VerificationPage;
