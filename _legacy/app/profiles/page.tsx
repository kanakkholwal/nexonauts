import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, UserPlus, Users } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProfileType } from "./[username]/actions";
import { getProfiles } from "./actions";

type PageProps = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    offset?: string;
  }>
};

export const metadata: Metadata = {
  title: "Explore Developers | Nexonauts",
  description: "Connect with top developers, designers, and creators in the Nexonauts ecosystem.",
  openGraph: {
    type: "profile",
    title: "Explore Developers",
    description: "Find developers on the platform",
  },
};

export default async function ExploreDevelopers(props: PageProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const offset = Number(searchParams?.offset) || 0;

  const profiles = (await getProfiles(
    query,
    currentPage,
    offset,
    {}
  )) as ProfileType[]; // Ensure your ProfileType includes populated user fields

  return (
    <div className="min-h-screen relative overflow-hidden">
   

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* --- Header & Search --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
               <Users className="w-4 h-4" />
               Community Directory
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Explore Developers
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Discover talented builders, follow their journey, and collaborate on the next big thing.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[300px]">
             <form className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground" />
                <Input 
                  name="query"
                  placeholder="Search by name, username, or skills..." 
                  defaultValue={query}
                  className="pl-9 h-11 bg-background/50 backdrop-blur-sm border-border/60 focus-visible:ring-primary/20"
                />
             </form>
          </div>
        </div>

        {/* --- Profiles Grid --- */}
        <Suspense fallback={<ProfilesSkeleton />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 5xl:grid-cols-4 gap-6">
            {profiles?.map((profile: any) => (
              <ProfileCard key={profile._id} profile={profile} />
            ))}
            
            {profiles.length === 0 && (
               <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                     <Search className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-lg font-medium">No developers found</h3>
                  <p className="text-muted-foreground">Try adjusting your search query.</p>
               </div>
            )}
          </div>
        </Suspense>

      </div>
    </div>
  );
}

// --- Sub-Components ---

function ProfileCard({ profile }: { profile: ProfileType }) {
  // Safe accessor for user data (handle potential population issues)
  const user = profile.user || {};
  const initials = (user.name || user.username || "??").slice(0, 2).toUpperCase();

  return (
    <Link href={`/devs/${profile.username}`} className="group block h-full">
      <Card className="h-full relative overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20">
        
        {/* Banner/Header Background (Optional aesthetic touch) */}
        <div className="h-20 bg-linear-to-r from-primary/10 via-violet-500/5 to-transparent" />

        <div className="px-5 pb-5 -mt-10 flex flex-col h-[calc(100%-5rem)]">
           <div className="flex justify-between items-end mb-3">
              <Avatar className="w-20 h-20 border-4 border-background shadow-sm bg-background">
                <AvatarImage src={user.image} alt={profile.username} />
                <AvatarFallback className="bg-primary/5 text-primary font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              
              <Button size="sm" variant="outline" className="rounded-full gap-1 hover:bg-primary hover:text-primary-foreground transition-colors group/btn">
                 <UserPlus className="w-3.5 h-3.5" />
                 Follow
              </Button>
           </div>

           <div className="space-y-1 mb-3">
              <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
                 {user.name || "Anonymous"}
              </h2>
              <p className="text-sm text-muted-foreground font-medium">
                 @{profile.username}
              </p>
           </div>

           {/* Bio Truncation */}
           <p className="text-sm text-muted-foreground/80 line-clamp-2 mb-4 h-10">
              {profile.bio || "Building cool things in the Nexonauts ecosystem."}
           </p>

           {/* Stats Footer */}
           <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between text-xs font-medium text-muted-foreground">
              <div className="flex gap-4">
                 <span className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <strong className="text-foreground">{profile.followers?.length || 0}</strong> Followers
                 </span>
                 <span className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <strong className="text-foreground">{profile.following?.length || 0}</strong> Following
                 </span>
              </div>
           </div>
        </div>
      </Card>
    </Link>
  );
}

function ProfilesSkeleton() {
   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-[280px] rounded-2xl border border-border/50 bg-card/30 p-5 flex flex-col">
               <div className="flex justify-between items-end mb-4 pt-8">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <Skeleton className="w-20 h-8 rounded-full" />
               </div>
               <Skeleton className="w-3/4 h-5 mb-2" />
               <Skeleton className="w-1/2 h-4 mb-4" />
               <Skeleton className="w-full h-12 mb-auto" />
               <Skeleton className="w-full h-8 mt-4" />
            </div>
         ))}
      </div>
   )
}