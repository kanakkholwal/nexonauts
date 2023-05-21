// Your verification page or component

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const VerificationPage = () => {
  const router = useRouter();
  const { token } = router.query;
  
  useEffect(() => {
    if (token) {
      axios.get(`/api/auth/verify?token=${token}`)
        .then((response) => {
          console.log(response.data.message);
          // Handle successful verification
        })
        .catch((error) => {
          console.log(error.response.data.message);
          // Handle verification error
        });
    }
  }, [token]);
  
  return <div>Verification in progress...</div>;
};

export default VerificationPage;
