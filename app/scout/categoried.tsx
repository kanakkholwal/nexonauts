import Image from "next/image";
import Link from "next/link";
import { Tabs } from "src/components/animations/tabs";

interface CategorizedProps {
  categorized_tools: any[];
}

export function Categorized({ categorized_tools }: CategorizedProps) {
  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
      <Tabs
        containerClassName="justify-center gap-4"
        contentClassName="backdrop-filter backdrop-blur-md bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50"
        tabClassName="hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
        tabs={categorized_tools.map((category) => {
          return {
            title: category.name,
            value: category.slug,
            content: (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.tools.map((tool) => {
                  return (
                    <Link
                      href={`/tool-scout/tools/${tool.slug}`}
                      key={tool.slug}
                      className="flex flex-col gap-4 items-start  p-4 rounded-lg border hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <div className="flex flex-col gap-1 shrink ">
                        <h3 className="text-lg font-semibold">{tool.name}</h3>
                        <p className="text-slate-600 text-md font-medium line-clamp-2">
                          {tool.description}
                        </p>
                      </div>
                      <Image
                        src={tool.coverImage}
                        alt={tool.name}
                        height={128}
                        width={320}
                        className="max-h-32 object-cover  rounded-lg  w-full mx-auto mt-auto"
                      />
                    </Link>
                  );
                })}
              </div>
            ),
          };
        })}
      />
    </div>
  );
}
// {category.tools.map((tool) => {
//     return <Link href={`/tool-scout/tools/${tool.slug}`} key={tool.slug} className="flex flex-col gap-4 items-start  p-4 rounded-lg border hover:bg-slate-100 dark:hover:bg-slate-800">
//         <div className="flex flex-col gap-1 shrink ">
//             <h3 className="text-lg font-semibold">{tool.name}</h3>
//             <p className="text-slate-600 text-md font-medium line-clamp-2">{tool.description}</p>
//         </div>
//         <Image src={tool.coverImage} alt={tool.name} height={128} width={320} className="max-h-32 object-cover  rounded-lg  w-full mx-auto mt-auto" />
//     </Link>
// })}
