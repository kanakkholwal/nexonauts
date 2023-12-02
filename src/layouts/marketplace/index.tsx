import { SessionUserType } from "src/types/user";
import FloatingMenu from "./floating-menu";
import { Navbar } from "./navbar";

export type WrapperProps = {
    children:React.ReactNode,
    user:SessionUserType | null,

}

export default function MarketWrapper({ children,user }:WrapperProps) {
    return (<>
        <Navbar user={user}/>
            <FloatingMenu />
            <main className="relative z-0 lg:pl-[100px] bg-slate-100 min-h-screen h-full">
                {children}
            </main>
    </>)
}