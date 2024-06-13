'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  categories: readonly string[];
  keyName?: string;
  options?: {
    mobile?: boolean;
    uniqueTabs?: boolean;
  };
}

export default function CategoryNavigation({
  categories,
  keyName = 'category',
  options = {
    mobile: false,
    uniqueTabs: false,
  },
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams() as URLSearchParams;

  // Extract category from the URL query
  const activeCategory = searchParams.get(keyName) || '';

  return (
    <div
      className={cn(
        'mb-8 sticky top-6 z-50 justify-center gap-x-2 flex-wrap gap-y-2',
        options?.mobile ? 'flex' : 'hidden md:flex'
      )}
    >
      {!options?.uniqueTabs && (
        <>
          <button
            aria-label="All categories"
            onClick={() => {
              router.push('?', { scroll: false });
            }}
            className={cn(
              `py-2 px-4 h-11 flex gap-x-1 font-medium items-center border rounded-xl transition-all text-sm xl:text-h6 shadow`,

              `border-dim-gray  hover:border-text`,
              activeCategory === ''
                ? 'bg-white dark:bg-gray-800'
                : 'bg-slate-100 dark:bg-gray-800/40'
            )}
          >
            All
          </button>
        </>
      )}
      <div className="flex gap-x-0 p-1 bg-slate-200/80 dark:bg-slate-800/40 rounded-2xl border border-border dark:border-slate-100/10 backdrop-blur border-opacity-15 shadow">
        {categories.map((item: string) => {
          return (
            <button
              key={item}
              onClick={(e) => {
                e.preventDefault();
                router.push(`?${keyName}=${item}`, { scroll: false });
              }}
              className={cn(
                `py-2 px-5 flex gap-x-1 font-medium  rounded-xl  transition-all relative`,
                activeCategory === item ? '' : 'hover:text-gray'
              )}
            >
              {activeCategory === item && (
                <motion.div
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  layoutId="active"
                  className="absolute inset-0 bg-white dark:bg-black rounded-xl shadow-sm"
                />
              )}
              <span className="text-sm xl:text-h6 relative  z-10 capitalize">
                {item}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
