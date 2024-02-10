import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";


export default function FixedNavbar() {
    return (
        <nav
        
        className="absolute top-4 left-0 right-0 z-[100] w-screen flex justify-center items-center pointer-events-none">
            <div className="flex justify-between items-center relative z-[100] overflow-hidden pointer-events-all px-2 border border-border/20 text-sm">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink className={""}>
                                    Home
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

            </div>
        </nav>
    );
}