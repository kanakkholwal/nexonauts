import { Button } from "@/components/ui/button";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownView from 'src/components/markdown/view';
import { sessionType } from "src/types/session";
import { getToolById } from "./actions";


export default async function DashboardPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions) as sessionType;

    const tool = await getToolById(params.id);
    if (!tool) return notFound();


    return (<div className="space-y-6 my-5">

        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Tool Details</h1>
        </div>

        <div className="glassmorphism p-5 rounded-lg">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{tool.name}</h1>
                <div className="flex items-center">
                    <span className="text-xs text-gray-400">Status:</span>
                    <span className="text-xs text-green-500 ml-1">{tool.status}</span>
                </div>
            </div>
            <div className="flex justify-between items-center mt-2">

                <div className="flex items-center">
                    <span className="text-xs text-gray-400">Created At:</span>
                    <span className="text-xs text-gray-500 ml-1">{new Date(tool.createdAt).toDateString()}</span>
                </div>
                <div className="flex items-center">
                    <span className="text-xs text-gray-400">Verified:</span>
                    <span className="text-xs text-green-500 ml-1">{tool.verified ? "Yes" : "No"}</span>
                </div>
            </div>
            <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                    <span className="text-xs text-gray-400">Pricing Type:</span>
                    <span className="text-xs text-gray-500 ml-1">{tool.pricing_type}</span>
                </div>
            </div>
            <div className="my-2">
                <Button variant="outline" size="sm" asChild>
                    <Link className="text-sm" href={`/admin/tools/${params.id}/edit`}>Edit</Link>
                </Button>
            </div>

            <div className="mt-5">
                <h1 className="text-xl font-bold">Description</h1>
                <MarkdownView className="prose xl:prose-xl">{tool.description}</MarkdownView>
            </div>
            <div className="mt-5">
                <h1 className="text-xl font-bold">Categories</h1>
                <p className="text-gray-500 mt-2">{tool.categories.map(category => {
                    return <span className="mr-2" key={category._id}>{category.name}</span>
                })}</p>
            </div>
            <div className="mt-5">
                <h1 className="text-xl font-bold">Link</h1>
                <p className="text-gray-500 mt-2">{tool.link}</p>
            </div>
        </div>


    </div>)
}