import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'


interface PostHeaderProps {
        title: string,
        image: string,
        author: {
            name: string,
            username: string,
            profilePicture: string
        },
        createdAt: string
}

export function PostHeader(props:PostHeaderProps) {


    return <div className="relative overflow-hidden w-full mx-auto mt-40 space-y-10 mb-10 p-3">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 w-full">
            <Balancer>{props.title}</Balancer>
        </h1>
        <div className="flex items-center space-x-4 pb-5 border-b border-gray-300 dark:border-gray-800">
            <Avatar className="size-16">
                <AvatarImage src={props.author.profilePicture} />
                <AvatarFallback>{props.author.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm font-semibold leading-none text-gray-700 dark:text-gray-200">{props.author.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300"> On {new Date(props.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
        <Image src={props.image} alt={props.title} width={1920} height={1080} className="w-full aspect-video object-cover max-h-[620px] rounded-lg" />
    </div>
}