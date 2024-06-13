import { getSession } from 'next-auth/react';

import Image from 'next/image';
import Link from 'next/link';
import {
  FULL_DESCRIPTION,
  NAME,
  SHORT_DESCRIPTION,
  TITLE,
} from 'src/constants/marketplace';
import Wrapper from 'src/layouts/marketplace';

export default function Market({ user }) {
  return (
    <>
      <Wrapper user={user}>
        <section className="w-full p-3  mt-4 ">
          <div className="w-full flex items-center justify-between p-7 rounded-xl bg-white shadow-slate-200 shadow-lg">
            <div className="py-8 pl-3 max-w-2xl">
              <h1 className="leading-10 text-6xl font-bold text-slate-900 flex items-center gap-2">
                {NAME}
              </h1>
              <p className="text-slate-600 text-lg mt-7 mb-10 font-medium">
                {SHORT_DESCRIPTION}
              </p>
              <Link
                href={`/marketplace/explore`}
                className="flex items-center justify-center gap-2 h-12 min-w-40 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-400 via-violet-600 to-fuchsia-600 shadow-sm shadow-primary/30  transition-all duration-200 max-w-[240px] mt-4"
              >
                <div>
                  <span className="text-lg font-semibold text-white">
                    Explore Now
                  </span>
                </div>
                <div>
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </Link>
            </div>
            <div>
              <Image
                src="/assets/images/illustration_dashboard.png"
                width={500}
                height={500}
                alt={'NexoMart'}
              />
            </div>
          </div>
        </section>
        <section className="w-full p-3  mt-4 ">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Trending on
            <span className="bg-gradient-to-r from-primary to-fuchsia-600 bg-clip-text text-transparent">
              {NAME}
            </span>
          </h1>
          <div className="w-full grid grid-cols-4 gap-4 mt-4 md:px-8 "></div>
        </section>
        <section className="w-full p-3  mt-4 ">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Latest on
            <span className="bg-gradient-to-r from-primary to-fuchsia-600 bg-clip-text text-transparent">
              {NAME}
            </span>
          </h1>
          <div className="w-full grid grid-cols-4 gap-4 mt-4 md:px-8 "></div>
        </section>
      </Wrapper>
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };

  return {
    props: { user: session.user },
  };
}
