'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import verifyPng from './verified.png';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  loggedIn: boolean;
  verifyUser: (token: string) => Promise<{
    success: boolean;
    message: string;
  }>;
}

export function UserAuthForm({
  className,
  loggedIn,
  verifyUser,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams() as URLSearchParams;
  const token = searchParams.get('token') || null;

  useEffect(() => {
    if (!token && !loggedIn) {
      router.push('/signup');
    } else {
      if (typeof token !== 'string') {
        console.log('Invalid token');
        setError('Invalid token');
        toast.error('Invalid token');
        return;
      }
      verifyUser(token as string)
        .then((response) => {
          console.log(response.message);
          // Handle successful verification
          setTimeout(() => {
            if (!loggedIn) {
              router.push('/login');
            } else {
              router.push('/feed');
            }
          }, 3000);
          setSuccess(response.message);
          toast.success(response.message);
        })
        .catch((error) => {
          console.log(error.message);
          setError(error.message);
          // Handle verification error
        })
        .finally(() => setIsLoading(false));
    }
  }, [token]);

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isLoading ? 'Verifying' : 'Verify Email'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isLoading
            ? 'Please wait while we verify your email'
            : error
              ? error
              : success
                ? success
                : 'Verify your emai'}
        </p>
      </div>
      <main className="flex flex-col items-center justify-center w-full p-4 space-y-4">
        <div
          className={cn('grid gap-6 lg:max-w-lg text-left mb-5', className)}
          {...props}
        >
          <div className="flex justify-center items-center w-full">
            {isLoading && (
              <CgSpinner className="animate-spin text-5xl text-primary" />
            )}
            {error && (
              <MdOutlineReportGmailerrorred className="text-5xl  text-red-500" />
            )}
            {success && (
              <Image
                src={verifyPng}
                height={320}
                width={320}
                alt="Verify Email"
                className="w-40 h-40"
              />
            )}
          </div>
          {!isLoading && (
            <Button
              disabled={isLoading}
              type="submit"
              className="mt-2 tracking-wide"
              size="lg"
              onClick={() => {
                router.push('/login');
              }}
            >
              Go to Login
            </Button>
          )}
        </div>
      </main>
    </>
  );
}
