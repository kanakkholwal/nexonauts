import { Button } from "@/components/ui/button";
import { nav_links } from "data/blog";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="@4xl:px-3 @4xl:my-10 fixed top-0 left-0 right-0 @4xl:relative">
      <nav className="py-4 px-5 w-full mx-auto rounded-lg flex justify-between items-center backdrop-blur border dark:border-transparent shadow-lg dark:shadow-neutral/50">
        <Link href="/" aria-label="Logo">
          <span className="sr-only">Nexonauts</span>
          <Image
            height={40}
            width={280}
            className="h-8 dark:invert w-auto"
            src="/assets/logo.svg"
            alt="logo"
            priority
            loading="eager"
          />
        </Link>
        <div className="flex items-center gap-2">
          <div className="hidden @4xl:flex items-center gap-2">
            {nav_links.map((link, index) => {
              return (
                <Button
                  size="sm"
                  variant="ghost"
                  className="dark:bg-transparent dark:hover:bg-transparent dark:hover:underline"
                  key={index}
                  asChild
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              );
            })}
          </div>
          <Button size="sm" variant="default_light" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </nav>
    </div>
  );
}
