import { FlickeringGrid } from "@/components/animation/flikering-grid";
import { AppSidebar } from "@/components/common/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Page403 from "app/layouts/403";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "src/lib/auth";
import Navbar from "./components/navbar";
export const metadata: Metadata = {
  title: "Admin Dashboard - NexoNauts",
  description: "Admin Dashboard ",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  // console.log(session)
  if (!(session && session?.user)) return redirect("/login");
  if (session.user.role !== "admin") return <Page403 />;

  return (
    <SidebarProvider>
      <AppSidebar user={session.user} moderator={session.user.role} />

      <SidebarInset className="flex flex-col flex-1 w-full relative z-0">
        <Navbar user={session.user} />
        <div className="absolute top-0 left-0 z-0 w-full min-h-80 [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]">
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
