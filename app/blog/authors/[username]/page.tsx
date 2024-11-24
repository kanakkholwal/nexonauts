


interface PageProps {
    params:Promise<{
        username:string
    }>
}

export default async function AuthorPage(props:PageProps){
    const {username} = await props.params


    return <>
    
    </>
}