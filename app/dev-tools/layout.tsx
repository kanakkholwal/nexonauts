import Footer from "app/layouts/footer";
import type { Metadata } from "next";

import { FlickeringGrid } from "@/components/animation/flikering-grid";
import NavbarGlobal from "@/components/common/navbar";
import MoreFromUs from "app/layouts/more-from-us";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Developer Tools | Nexonauts",
  description:
    "A collection of tools that I have made to make your developer life easier.",
  // keywords: "submit, tool, toolzen, devtools, developer tools, open source, tools, software, code, development, programming, web development, frontend, backend, fullstack, javascript, typescript, react, vue, svelte, angular, nodejs, deno, python, rust, go, ruby, rails, php, laravel, java, kotlin, swift, ios, android, mobile, app, application, desktop, windows, macos, linux, unix, server, api, database, sql, nosql, graphql, rest, restful, websockets, http, https, css, scss, sass, less, tailwindcss, bootstrap, bulma, materialize, foundation, semantic, ant, chakra, styled, emotion, jss, jss, mui, vuetify, quasar, nuxt, next, gatsby, sapper, sveltekit, angular, ionic, reactnative, flutter, expo, electron, nwjs, deno, oak, express, fastify, hapi, koa, nest, sails, adonis, django, flask, rails, sinatra, laravel, lumen, slim, spring, spark, ktor, vertx, actix, rocket, iron, warp, rocket
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarGlobal />
      <div className="absolute top-0 left-0 z-0 w-full min-h-80 mask-[linear-gradient(to_top,transparent_25%,black_95%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>
      <main className="w-full grow mx-auto px-4 sm:px-12 xl:px-0 pt-[70px] relative @container max-w-(--max-app-width)">
        {children}
      </main>
      <MoreFromUs omit={["dev-tools"]} />
      <Footer />
    </>
  );
}
