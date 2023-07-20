import axios from "axios";

export default function Post({ username }) {
    // Render post...
    console.log(username);
    return <div>{username}</div>;
  
}
export async function getServerSideProps(ctx: { query: { username: string; }; }) {
    // Call an external API endpoint to get posts
    var username = ctx.query.username;
    // You can use any data fetching library
    const { data } = await await axios({
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/users/${username}/profile`,
        method: 'get',
        headers: {
            "X-Authorization": `Bearer ${process.env.NEXT_AUTH_SECRET}`,
            'Content-Type': 'application/json'
        }
     })
    

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