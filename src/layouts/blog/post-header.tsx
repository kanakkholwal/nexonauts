"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useRouter } from "next/router"
import { AiOutlineFieldTime } from "react-icons/ai"




export default function PostHeader({ title, image, author, publishedAt,readTime }: {
    title: string,
    image: string,
    publishedAt: string,
    readTime?: string,
    author: {
        name: string;
        profileURL: string;
        user?: {
            _id?: string;
            name?: string;
            profileURL?: string;
        } | string | null;
    }
}) {

    return (<header className="bg-slate-100 ">
        <nav className="w-full max-w-7xl mx-auto flex gap-2 items-center py-4 px-6 md:px-12 lg:px-24">
            <Link href="/blog" className="font-bold text-xl leading-wide">
                Nexonauts
            </Link>
            <NavigationMenuBar />

        </nav>
        <div className="w-full max-w-7xl mx-auto py-16 px-6 md:px-12 lg:px-24">
            <div className="flex items-center justify-start gap-1 text-sm font-medium leading-none mb-10" itemType='https://schema.org/BreadcrumbList' itemScope>
                <Link href="/resources/" className=" text-slate-600 uppercase" itemProp='itemListElement' itemType='https://schema.org/ListItem' itemScope>
                    resources
                </Link> |
                <Link href="/blog/" className="text-primary/75 uppercase" itemProp='itemListElement' itemType='https://schema.org/ListItem' itemScope>
                    blog
                </Link>
            </div>
            <div className="flex items-center  flex-row flex-wrap w-full">
                <div className="p-4 flex-1">
                    <h1 className="text-4xl font-bold leading-tight text-slate-800 text-balance">
                        {title}
                    </h1>
                    <div className="flex items-center gap-2 mt-4">
                        <div className="flex items-center gap-2">
                            <Image src={author.profileURL} height={120} width={120} alt={author.name} className="w-8 h-8 rounded-full" />
                            <span className="text-md font-semibold leading-none text-slate-600">
                                {author.name}
                            </span>
                        </div>
                        <span className="text-sm font-medium leading-none text-slate-600">
                            on {new Date(publishedAt).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-2">
                            
                        </div>
                        <span className="text-sm font-medium leading-none text-slate-600 flex items-center gap-1">
                            <AiOutlineFieldTime className="inline-block h-4 w-4" /> {readTime}
                        </span>
                    </div>


                </div>
                <div className="p-4">
                    <Image src={image} height={400} width={600} alt={title} className="h-auto w-full max-w-[38rem] rounded-3xl shadow-md shadow-slate-300" priority />

                </div>
            </div>

        </div>


    </header>)
}
export function NavigationMenuBar() {
    const router = useRouter()
    return (
        <NavigationMenu className="mx-auto flex-auto">
            <NavigationMenuList>

                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">Getting started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-100 via-violet-200 to-fuchsia-200 p-6 no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >
                                        {/* <Image src="/logo-sqaure.svg" alt="NexoNauts" className="w-12 h-12" height={150} width={180} /> */}
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            NexoMart
                                        </div>
                                        <p className="text-sm leading-tight text-slate-600">
                                            A marketplace for buying, selling and promoting digital products.
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/marketplace/learn-more" title="Learn More">
                                Learn more about NexoMart.
                            </ListItem>
                            <ListItem href="/marketplace/faqs" title="FAQ">
                                Frequently asked questions.
                            </ListItem>
                            <ListItem href="/about-us" title="About NexoNauts">
                                Learn more about NexoNauts.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">
                        Products
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            Products
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem  >
                    <Link href={"/signup?continue=" + encodeURIComponent(router.asPath)} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle() + " bg-transparent"}>
                            Get Started
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
