import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Balancer from 'react-wrap-balancer'


const post = {
    title: "Coding as an art form and the unsung Picassos of our time",
    description: "Post Description",
    author: {
        name: "Kanak Kholwal",
        username: "kanakkholwal",
        profilePicture: "https://github.com/kanakkholwal.png"
    },
    createdAt: "2024-06-13T17:32:20.443Z"
}

export function PostHeader() {


    return <div className="relative overflow-hidden w-full min-h-96 mx-auto">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">
            <Balancer> {post.title}</Balancer>
        </h1>
        <div className="flex items-center space-x-4">
            <Avatar>
                <AvatarImage src={post.author.profilePicture} className="size-16" />
                <AvatarFallback>{post.author.username[0]}</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm font-medium leading-none">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    </div>
}