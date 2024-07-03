"use client";
import { BsSearch } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";
// import { GoHomeFill } from "react-icons/go";
import { PiHeartStraightBold, PiTrendUpBold } from "react-icons/pi";
import { TbLayoutGrid } from "react-icons/tb";

import Link from "next/link";
import { useRouter } from "next/navigation";

const navigations = [
  {
    label: "MarketPlace",
    href: "/marketplace",
    icon: TbLayoutGrid,
  },
  {
    label: "Trending",
    href: "/marketplace/trending",
    icon: PiTrendUpBold,
  },
  {
    label: "Explore",
    href: "/marketplace/explore",
    icon: BsSearch,
  },
  {
    label: "Favorites",
    href: "/marketplace/favorites",
    icon: PiHeartStraightBold,
  },
  {
    label: "Account",
    href: "/marketplace/my/account",
    icon: FaRegUser,
  },
] as {
  label: string;
  href: string;
  icon: React.ElementType;
}[];

export default function FloatingMenu() {
<<<<<<< HEAD
  // const { pathname } = useRouter();
=======
<<<<<<< HEAD
  // const { pathname } = useRouter();
=======
  const { pathname } = useRouter();
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0

  return (
    <div className="fixed z-10 left-0 bottom-0 lg:top-0 right-0 lg:right-auto lg:w-24 bg-slate-100 lg:bg-white shadow-md border-t border-slate-200 pt-1  flex flex-col justify-center">
      <div className="flex lg:flex-col gap-1  p-1 lg:px-5">
        {navigations.map((NavLink, i) => {
          return (
            <Link
              key={i}
              href={NavLink.href}
              className={
                "flex flex-col items-center justify-center gap-1 px-5 h-16 w-full "
              }
            >
              <span
                title={NavLink.label}
                className={
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0
                  "px-6 py-2 rounded-full"
                  // (pathname === NavLink.href
                  //   ? " text-primary bg-primary/10 shadow-sm shadow-primary/10"
                  //   : " text-slate-700  hover:text-slate-900 hover:bg-white lg:hover:bg-slate-100")
<<<<<<< HEAD
=======
=======
                  "px-6 py-2 rounded-full" +
                  (pathname === NavLink.href
                    ? " text-primary bg-primary/10 shadow-sm shadow-primary/10"
                    : " text-slate-700  hover:text-slate-900 hover:bg-white lg:hover:bg-slate-100")
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0
                }
              >
                <NavLink.icon
                  className={
                    "w-6 h-6 text-inherit  transition-all duration-200"
                  }
                />
              </span>
              <span
                className={
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0
                  "lg:hidden text-xs"
                  // (pathname === NavLink.href
                  //   ? " font-semibold"
                  //   : " font-medium")
<<<<<<< HEAD
=======
=======
                  "lg:hidden text-xs" +
                  (pathname === NavLink.href
                    ? " font-semibold"
                    : " font-medium")
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0
                }
              >
                {NavLink.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
