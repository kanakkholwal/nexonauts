import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

// searchable contents
// import { CategoryList } from "pages/tools/ToolsList";
import { CATEGORIES } from "src/layouts/apps/common/constants";
export default function Search() {
  const [open, setOpen] = React.useState(false);
  const [apps, setApps] = React.useState<
    {
      _id?: string;
      title: string;
      path: string;
      icon: React.ReactNode;
    }[]
  >([]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="w-full flex-1 md:w-auto md:flex-none">
      <button
        role="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((open) => !open);
        }}
        className="inline-flex w-full items-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-slate-100 shadow-sm hover:bg-slate-200 h-9 px-4 py-2 relative justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
      >
        <span className="hidden lg:inline-flex">Search Anything...</span>
        <span className="inline-flex lg:hidden">Search...</span>

        <kbd className="pointer-events-none absolute right-1.5 top-[50%] translate-y-[-50%] hidden h-5 select-none items-center gap-1 rounded border bg-muted text-slate-600 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>J
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="AI Apps">
            {CATEGORIES.map((category, index) => {
              return (
                <Link
                  href={`/apps?category=${category.value}`}
                  key={"apps_category_" + index}
                  className="cursor-pointer"
                >
                  <CommandItem>
                    <category.Icon className="mr-3 h-4 w-4" />
                    <span>{category.label}</span>
                  </CommandItem>
                </Link>
              );
            })}
          </CommandGroup>
          {/* <CommandGroup heading="Developer Tools">
                        {CategoryList.map((tool, index) => {
                            return (<Link href={tool.path} key={"tool_" + index} className="cursor-pointer">
                                <CommandItem>
                                    <span className="mr-3 h-4 w-4" >
                                        {tool.icon}
                                    </span>
                                    <span>{tool.title}</span>
                                </CommandItem>
                            </Link>)
                        })}
                    </CommandGroup> */}
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <Link
              href={"/dashboard/settings?defaultTab=profile"}
              className="cursor-pointer"
            >
              <CommandItem>
                <PersonIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </CommandItem>
            </Link>
            {/* <CommandItem>
                            <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
                            <span>Mail</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <GearIcon className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem> */}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
