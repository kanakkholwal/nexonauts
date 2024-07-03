import { sessionType } from "src/types/session";
import FloatingMenu from "./floating-menu";
import { Navbar } from "./navbar";

export type WrapperProps = {
  children: React.ReactNode;
  title?: React.ReactNode | null;
<<<<<<< HEAD
  user: sessionType["user"] | null;
=======
<<<<<<< HEAD
  user: sessionType["user"] | null;
=======
  user: SessionUserType | null;
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0
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
