import { authOptions } from 'app/api/auth/[...nextauth]/options';
import WithoutSession from 'app/layouts/without-session';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { getSession } from 'src/lib/auth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'OnBoarding - NexoNauts',
  description: 'OnBoarding for NexoNauts',
};

export default async function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  // console.log(session)
  if (!(session && session?.user)) return <WithoutSession />;

  return (
    <>
      {children}
      {process.env.NODE_ENV !== 'production' && (
        <div className="fixed bottom-0 right-0 p-2 text-xs text-gray-500 dark:text-slate-400">
          v0.0.1({process.env.NODE_ENV})
        </div>
      )}
    </>
  );
}
