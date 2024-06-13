'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Page403() {
  const pathname = usePathname() as string;
  const redirect = encodeURIComponent(
    process.env.NEXT_PUBLIC_WEBSITE_URL + pathname
  );

  return (
    <div className="min-h-screen h-full w-full relative overflow-hidden bg-primary/10 flex flex-col justify-center items-center p-4">
      {/* <h2 className="text-5xl font-bold text-slate-900 dark:text-gray-100 text-center">

            </h2> */}
      <div className="m-auto">
        <div className="flex items-center justify-center mt-10 bg-gray-100 dark:bg-gray-800 rounded-xl aspect-square p-2  filter drop-shadow-lg">
          <Image
            src="/logo-square.png"
            height={512}
            width={512}
            alt="Nexonauts"
            className="w-28 h-28 dark:invert"
            draggable={false}
          />
        </div>
        <p className="text-lg  text-gray-600 dark:text-gray-400 mt-5 text-center">
          You are not logged in
        </p>

        <Button
          size="lg"
          width="sm"
          className="mt-5"
          variant="gradient_blue"
          asChild
        >
          <Link href={`/login?redirect=${redirect}`}>
            Login to continue
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
