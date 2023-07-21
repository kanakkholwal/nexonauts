import axios from "axios";

export default function Post({ username,user }) {
    // Render post...
    console.log(user);
    return <div>{username}</div>;
  
}
export async function getServerSideProps(ctx: { query: { username: string; }; }) {
    // Call an external API endpoint to get user
    const username = ctx.query.username;

    const { data } = await axios({
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/users/${username}/profile`,
        method: 'get',
        headers: {
            "x-authorization": `Bearer ${process.env.NEXT_AUTH_SECRET}`,
            'Content-Type': 'application/json'
        }
     });
     console.log(data);
    

    if(data.success === true && data.user && data.user.username === username){

        return {
            props: {
                username,
                user: data.user
            }
        }
    }
    else {
        // not found, return
        return {
            notFound: true,
        }   as
        {
            notFound: boolean;
        };
    }

  }