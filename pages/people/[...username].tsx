import {useRouter} from 'next/router';

export default function Page(){
    const router = useRouter();
    const {username} = router.query;
    console.log(router);
    return <div>Page : {username}</div>
}