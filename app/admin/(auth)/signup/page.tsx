import { authOptions } from 'app/api/auth/[...nextauth]/options';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { UserAuthForm } from './register-form';

export const metadata: Metadata = {
  title: 'Signup | NexoNauts',
  description: 'Register for an account on ' + process.env.NEXT_PUBLIC_APP_NAME,
  keywords: 'register, account, ' + process.env.NEXT_PUBLIC_APP_NAME,
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session) return redirect('/dashboard');

  return (
    <>
      <div className="text-center">
        <Link href="/" className="text-center">
          <Image
            className="h-10 mx-auto dark:invert"
            src="/assets/logo.svg"
            alt="Nexonauts.png"
            width={200}
            height={40}
            priority
          />
        </Link>
        <h2 className="font-bold text-xl mt-5">
          Create an account to get started.
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-300 mb-8">
          Sign up to your account to access your dashboard
        </p>
        <UserAuthForm data-aos="fade-up" />
      </div>
    </>
  );
}
