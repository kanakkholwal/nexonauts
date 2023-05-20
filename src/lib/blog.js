import axios from "axios";

// Dashboard APIs

// Using postId
export const getPostBySlug = async (slug) => {

    return await new Promise(async(resolve,reject) =>{
        await axios.post("http://localhost:3000/api/posts/" + slug)
        .then(({ data }) => {
            const post = data?.post;
            resolve(post)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        })
     
    })

    
}

