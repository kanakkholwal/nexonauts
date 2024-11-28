
import { getPostsByAuthor } from 'src/lib/blog/actions'

interface PageProps {
    params:Promise<{
        username:string
    }>
}

export default async function AuthorPage(props:PageProps){
    const {username} = await props.params
    const {profile, posts} = await getPostsByAuthor(username)

    if(!profile){
        return <div>Author not found</div>
    }

    return <>
    
    
    </>
}