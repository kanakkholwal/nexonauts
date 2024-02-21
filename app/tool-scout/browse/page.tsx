import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Navbar from "app/layouts/navbar";
import { FilterButton, SearchBar } from "app/tool-scout/browse/search";
import { getTools } from 'app/tool-scout/lib/actions';
import LazyImage from "components/image";
import { Hash } from 'lucide-react';
import { Metadata } from "next";
import Link from "next/link";
import { PublicToolPricingType } from "src/models/tool";


export const metadata: Metadata = {
    title: "Browse Nexo Scout - AI Tools, Services, and Resources",
    description: "Nexo Scout is a curated list of AI tools, services, and resources. Find the best AI tools for your business.",
}




export default async function BrowsePage({
    searchParams,
}: {
    searchParams?: {
        query?: string,
        page?: string,
        pricing_type?: string,
        category?: string,
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const filter = {
        pricing_type: searchParams?.pricing_type as PublicToolPricingType || "all",
        category: searchParams?.category || "all",
    }

    const { tools, categories, totalPages, pricing_types } = await getTools(query, currentPage, filter);


    return (<>
        <header>
            <Navbar />
        </header>
        <div className="flex items-start justify-start gap-6 h-full w-full max-w-7xl mx-auto pt-32">
            <section id="filter" className="min-w-92 max-w-96 grow w-auto sticky top-24 px-4 hidden md:block">
                <div className="w-full flex flex-col space-y-2 text-center sm:text-left mb-5">
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                        Filter Tools
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        Filter Tools by category, pricing, and more.
                    </p>
                    <div className="mb-4">
                        <p className="text-base font-semibold text-slate-600 mb-4">
                            By Categories
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <FilterButton
                                active={filter.category === "all"}
                                size="sm"
                                className="cursor-pointer"
                                filterKey="category"
                                filterValue="all"
                            >
                                All
                            </FilterButton>
                            {categories.map((category) => (
                                <FilterButton
                                    key={category.slug}
                                    size="sm"
                                    className="cursor-pointer"
                                    filterKey="category"
                                    filterValue={category.slug}
                                    active={filter.category === category.slug}

                                >
                                    {category.name.split("_").join(" ")}
                                </FilterButton>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <p className="text-base font-semibold text-slate-600 mb-4">
                        By Pricing
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {pricing_types.map((pricing_type) => (
                            <FilterButton
                                key={pricing_type}
                                size="sm"
                                className="cursor-pointer"
                                filterKey="pricing_type"
                                filterValue={pricing_type}
                                active={filter?.pricing_type === pricing_type}
                            >
                                {pricing_type.split("_").join(" ")}
                            </FilterButton>
                        ))}
                    </div>
                </div>
            </section>
            <section id="content" className="grow w-full px-3">
                <SearchBar />

                <div id="results">
                    <div className="grid mx-auto gap-x-6 gap-y-12 grid-cols-1 sm:grid-cols-2 xl:gap-x-8 2xl:gap-x-12 2xl:gap-y-16 xl:gap-y-14 mt-8">
                        {tools.map((tool) => {
                            return (<div key={tool._id}>
                                <Link href={`/tool-scout/tools/${tool.slug}`} className="p-1">
                                    <Card className="rounded-3xl">
                                        <CardHeader>
                                            <div className="flex flex-col w-full aspect-video overflow-hidden bg-gray-100 dark:bg-slate-800 rounded-2xl h-64 sm:h-72">
                                                <div className="relative flex items-center justify-center flex-shrink-0 h-full group">
                                                    <LazyImage className="w-9/10 sm:w-10/12 lg:w-9/10 xl:w-10/12 h-auto rounded-lg shadow-md mx-auto object-cover object-left-top transition ease-in-out duration-300"
                                                        width={350}
                                                        height={200}
                                                        src={tool.coverImage} alt={tool.name} />
                                                    <div className="absolute inset-0 transition duration-200 bg-gray-900 opacity-0 rounded-2xl group-hover:opacity-60"></div>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="w-full text-xl font-semibold mb-2 inline-flex gap-2 justify-between items-center flex-wrap" title={tool.name}>
                                                {tool.name}
                                                <Badge variant="default_light" size="sm" className="ml-auto">{tool.pricing_type}</Badge>
                                            </div>

                                            <div className="inline-flex flex-wrap gap-2 w-full items-center justify-start mt-2">
                                                {tool.categories?.map((category, index) => {
                                                    return <Badge key={category.slug + "_" + index} variant="success_light" className="font-medium">
                                                        <Hash className="inline-block w-4 h-4" />
                                                        {category.name}
                                                    </Badge>
                                                })}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </div>)
                        })}
                    </div>
                </div>
            </section>
        </div>

    </>)

}
