import { cn } from '@/lib/utils';
import './hero.css';

export function HeroWrapper({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <>
      <section
        id="hero"
        className={cn(
          'relative mb-16 pt-40 pb-20 min-h-[546px] lg:pt-56 lg:pb-32 lg:min-h-[770px] bg-primary/5',
          className
        )}
        {...props}
      >
        <div
          aria-hidden="true"
          aria-label="Image background"
          className="absolute inset-0 h-full"
        >
          <div className="h-full relative">
            <div className="absolute inset-0 mx-auto w-full h-full bg-full bg-cover bg-center bg-no-repeat z-[2] hero_image" />
          </div>
        </div>
        <div className="relative flex flex-col justify-center z-10 w-full h-full mx-auto max-w-5xl p-6">
          {children}
        </div>
      </section>
    </>
  );
}
