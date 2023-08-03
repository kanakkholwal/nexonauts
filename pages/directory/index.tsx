import Head from "next/head";
import axios from "axios";
import PublicToolType from "types/public-tool";

export default function AiDirectory({

}) {


  

    return (
        <>
            <Head>
                <title>Ai directory</title>
            </Head>
            <div>
                Coming Soon!

            </div>
        </>
    )
}


export async function getServerSideProps(context) {

    let data = {
        type: "idle",
        message: ""
    } as {
        type: string,
        message: string
    };
    // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/public-tools`)
    //     .then(response => {
    //         data.type = "success";
    //         data.message = response.data.message;
    //        return response.data;
    //     })
    //     .catch(error => {
    //         data.type = "error";
    //         data.message = error.message;
    //         return error.response
    //     });
  

    return {
        props: { 
            // tools:response.data.tools as PublicToolType[],
            data,
        },

    }
}