import {checkEnvironment} from "lib/scripts";
import axios from "axios";

export default function Blog({ post }) {
  // console.log(post)
    return (
      <ul>
        {/* {posts.map((post) => ( */}
          <p>{post.title}</p>
          <p>{post.description}</p>
        {/* ))} */}
      </ul>
    );
  }

   
  // This function gets called at build time on server-side.
  // It may be called again, on a serverless function, if
  // the path has not been generated.
  export async function getStaticPaths() {
    const {data} = await axios.post("https://kkupgrader.eu.org/api/posts/all");
    
   
   
    // Get the paths we want to pre-render based on posts
    const paths = data.posts.map((post) => {
     
        return {
            params: { 
                slug: post.slug,
            }
        }
    });
   
    // We'll pre-render only these paths at build time.
    // { fallback: 'blocking' } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: 'blocking' };
  }
  export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    
    const {data} = await axios.post("https://kkupgrader.eu.org/api/posts/"+params.slug);

    // Pass post data to the page via props
    if (!data.post) {
      return {
        notFound: true,
      };
    }
   
  return {
    props: {
      post:data.post,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
  }
   