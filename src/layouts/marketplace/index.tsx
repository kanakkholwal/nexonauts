import { SessionUserType } from 'src/types/user';
import FloatingMenu from './floating-menu';
import { Navbar } from './navbar';

export type WrapperProps = {
  children: React.ReactNode;
  title?: React.ReactNode | null;
  user: SessionUserType | null;
};

export default function MarketWrapper({ children, user, title }: WrapperProps) {
  return (
    <>
      <Navbar user={user} title={title} />
      <FloatingMenu />
      <main className="relative z-0 p-2 lg:pl-[104px] bg-slate-100 min-h-screen h-full">
        {children}
      </main>
    </>
  );
}
