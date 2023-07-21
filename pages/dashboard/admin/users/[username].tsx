import axios from "axios";

export default function Post({ username,user }) {
    // Render post...
    console.log(user);
    return <div>{username}</div>;
  
}
export async function getServerSideProps(ctx: { query: { username: string; }; }) {
    // Call an external API endpoint to get user
    const username = ctx.query.username;

    const response = await axios({
        url: `https://kkupgrader.eu.org/api/users/${username}/profile`,
        method: 'get',
        headers: {
            "x-authorization": `Bearer ${process.env.NEXT_AUTH_SECRET}`,
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res;
    }).catch((err) => {
        return err.response;
    });


    if(response.data.success === true && response.data.user && response.data.user.username === username){

        return {
            props: {
                username,
                user: response.data.user
            }
        }
    }
    else if(response.data.success === false) {
        // not found, return
        return {
            props:{
                username,
                user: null
            }
        }
    }
  

  }