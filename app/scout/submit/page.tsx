import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import Navbar from "app/layouts/navbar";
import dbConnect from "lib/dbConnect";
import type { Metadata } from "next";
import PublicTool, { PublicToolType } from 'src/models/tool';
import { ToolSubmitForm } from "./form";

export const metadata: Metadata = {
    title: "Submit a Tool",
    description: "Submit a tool to be listed on the site.",
    // keywords: "submit, tool, tool-scout, devtools, developer tools, open source, tools, software, code, development, programming, web development, frontend, backend, fullstack, javascript, typescript, react, vue, svelte, angular, nodejs, deno, python, rust, go, ruby, rails, php, laravel, java, kotlin, swift, ios, android, mobile, app, application, desktop, windows, macos, linux, unix, server, api, database, sql, nosql, graphql, rest, restful, websockets, http, https, css, scss, sass, less, tailwindcss, bootstrap, bulma, materialize, foundation, semantic, ant, chakra, styled, emotion, jss, jss, mui, vuetify, quasar, nuxt, next, gatsby, sapper, sveltekit, angular, ionic, reactnative, flutter, expo, electron, nwjs, deno, oak, express, fastify, hapi, koa, nest, sails, adonis, django, flask, rails, sinatra, laravel, lumen, slim, spring, spark, ktor, vertx, actix, rocket, iron, warp, rocket
}

export default async function SubmitToolPage() {

    async function SubmitTool(tool: PublicToolType): Promise<boolean> {
        "use server"
        try {

            await dbConnect();
            const newTool = new PublicTool(tool);
            await newTool.save();
            return Promise.resolve(true);
        } catch (err) {
            console.log(err)
            return Promise.reject(err);
        }

    }

    return (<>
        <Navbar />
        <main className="relative mb-10  py-24 backdrop-blur-xl">
            <section id="hero" className="relative flex flex-col items-center justify-center text-center py-10">
                <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                    <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                    <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
                </div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 relative" >
                    <div className=" text-center mx-auto">
                        <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl relative bg-gradient-to-r from-primary to-violet-200 bg-clip-text text-transparent dark:from-primaryLight dark:to-secondaryLight">
                            Submit a Tool
                        </h1>
                        <p className="mt-8 text-gray-700 dark:text-gray-300">
                            Have a tool that you think should be listed here? Submit it below.
                        </p>
                    </div>
                </div>
            </section>
            <section className="z-2 w-full grow mx-auto px-4 sm:px-12 xl:max-w-6xl xl:px-0 pt-20 relative">
                <Card >
                    <CardHeader>
                        <CardTitle>
                            Submit a Tool
                        </CardTitle>
                        <CardDescription>
                            Submit a tool to be listed on the site.
                        </CardDescription>
                    </CardHeader>
                    <ToolSubmitForm submit={SubmitTool} />
                </Card>
            </section>

        </main>
    </>)
}