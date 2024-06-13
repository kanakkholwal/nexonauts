import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authOptions } from 'app/api/auth/[...nextauth]/options';
import { PostReview } from 'layouts/apps/view/review';
import { getServerSession } from 'next-auth/next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiLock } from 'react-icons/fi';
import workingApp from 'src/assets/animation/app-working.gif';
import { getAppBySlug } from 'src/lib/apps/actions';
import { sessionType } from 'src/types/session';

import AppplicationView from 'src/layouts/apps/app-view';

export default async function Page({ params }: { params: { slug: string } }) {
  const session = (await getServerSession(authOptions)) as sessionType | null;

  const app = await getAppBySlug(params.slug);
  if (!app) return notFound();

  return (
    <main className="p-10 flex min-h-screen gap-2 w-full justify-between flex-wrap items-start relative z-0">
      <div className="max-w-5xl">
        <h1 className="text-3xl font-bold">{app.name}</h1>
        <p className="text-slate-500 mt-2 line-clamp-3">{app.description}</p>
        <div className="mt-2 text-sm font-medium w-full rounded-lg text-slate-500 bg-slate-100 p-2">
          Created by{' '}
          <span className="text-accent-foreground font-semibold cursor-pointer hover:underline">
            {app.developer.name}
          </span>{' '}
          in{' '}
          <Link
            className="text-primary font-semibold px-2 py-1 rounded-md bg-primary/10 hover:bg-primary/20 capitalize ml-1"
            href={`/apps?category=${app.categories[0]}`}
          >
            {app.categories[0].replaceAll('_', ' ')}
          </Link>
        </div>
        {session?.user ? (
          <AppplicationView app={app} user={session?.user} />
        ) : (
          <div className="relative w-full aspect-video flex justify-center items-center bg-slate-100 my-5">
            <Image
              src={workingApp}
              height={500}
              width={500}
              alt="Working App"
              className="z-1"
            />

            <div className="absolute inset-0  backdrop-blur-sm flex justify-center items-center z-10">
              <Link
                href={'/login?continue=' + encodeURI('/apps/' + app.slug)}
                className="w-full max-w-xs flex items-center justify-center border border-solid border-primary rounded-md p-2 bg-slate-100"
              >
                <FiLock className="w-4 h-4 mr-2 text-primary inline-block" />{' '}
                Please login to use this app
              </Link>
            </div>
          </div>
        )}
        {/* <Card>
                <CardHeader>
                    <CardTitle>
                        Related Apps
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-1">
                    
                </CardContent>

            </Card> */}
      </div>
      <div className="grow">
        <Tabs defaultValue="my_review" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="my_review" className="grow">
              Your Review
            </TabsTrigger>
            <TabsTrigger value="others_review" className="grow">
              Others Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="my_review">
            {session?.user ? (
              <PostReview app={app} user={session?.user} />
            ) : (
              <Link
                href={'/login?continue=' + encodeURI('/apps/' + app.slug)}
                className="w-full flex items-center justify-center border border-solid border-primary rounded-md p-2 bg-slate-100"
              >
                <FiLock className="w-4 h-4 mr-2 text-primary inline-block" />{' '}
                Please login to Post a Review
              </Link>
            )}
          </TabsContent>
          <TabsContent value="others_review">
            {/* <AllReviews app={app} /> */}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
