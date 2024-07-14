"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";


const ROUTES = ["/feed", "/explore", "/favorites", "/notifications"];

interface Props {
}

export default function SoftNavigation({ }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    

    return (
        <div
            className={cn(
                "mb-8 sticky top-6 z-50 justify-center gap-x-2 flex flex-wrap gap-y-2",
            )}
        >

            <div className="flex gap-x-0 p-1 bg-card rounded-2xl border border-border dark:border-slate-100/10 backdrop-blur border-opacity-15 shadow">
                {ROUTES.map((item: string) => {
                    return (
                        <button
                            key={item}
                            onClick={(e) => {
                                e.preventDefault();
                                router.push(item);
                            }}
                            className={cn(
                                `py-2 px-5 flex gap-x-1 font-medium  rounded-xl  transition-all relative`,
                                pathname?.startsWith(item) ? "" : "hover:text-gray"
                            )}
                        >
                            {pathname?.startsWith(item) && (
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
