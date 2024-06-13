import { authOptions } from 'app/api/auth/[...nextauth]/options';
import Footer from 'app/layouts/footer';
import { getServerSession } from 'next-auth/next';
import { sessionType } from 'src/types/session';
import Navbar from './navbar';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession(authOptions)) as sessionType | null;
  // console.log(session)

  return (
    <>
      <Navbar user={session ? session.user : null} />
      <div className="p-10 flex min-h-screen gap-2 w-full justify-between flex-wrap items-start relative z-0">
        {children}
      </div>
      <Footer />
    </>
  );
}
