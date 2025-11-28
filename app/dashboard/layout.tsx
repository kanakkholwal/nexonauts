import { FlickeringGrid } from "@/components/animation/flikering-grid";
import AppNavbar from "@/components/common/sidebar/app-navbar";
import { AppSidebar } from "@/components/common/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import WithoutSession from "app/layouts/without-session";
import { Metadata } from "next";
import { SessionUserType } from "src/auth";
import { getSession } from "~/auth/server";
import "./layout.css";


export const metadata: Metadata = {
  title: "Feed - NexoNauts",
  description: "Feed for NexoNauts",
};

export const dynamic = 'force-dynamic';

export default async function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!(session && session.user)) return <WithoutSession />;

  return (
    <SidebarProvider>
      <AppSidebar user={JSON.parse(JSON.stringify(session.user)) as SessionUserType} moderator="user" prefixPath="dashboard" />

      <SidebarInset className="flex flex-col flex-1 w-full relative z-0">
        <AppNavbar user={session.user} impersonatedBy={session?.session?.impersonatedBy} />
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
        <main className="content p-4 px-2 md:p-6 z-2 @container space-y-10 min-h-screen h-full">
          {children}
        </main>
        {process.env.NODE_ENV !== "production" && (
          <div className="fixed bottom-0 right-0 p-2 text-xs text-gray-500 dark:text-slate-400">
            v0.1.1({process.env.NODE_ENV})
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
