import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { notFound } from "next/navigation";
import { sessionType } from "src/types/session";
import { getToolById } from "../actions";
import EditForm from "./form";
import { useFormStore } from "./store";
import StoreInitializer from "./store-initialzer";

export default async function DashboardPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions) as sessionType;

    const tool = await getToolById(params.id);
    if (!tool) return notFound();

    useFormStore.setState({
        tool: tool
    })


    return (<div className="space-y-6 my-5">
        <StoreInitializer tool={tool} />
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Tool Details</h1>
        </div>

        <div className="glassmorphism p-5 rounded-lg">
            <EditForm />
        </div>


    </div>)
}