import { notFound } from "next/navigation";
import { getToolById, updateTool } from "./actions";
import EditForm from "./form";
import { useFormStore } from "./store";
import StoreInitializer from "./store-initialzer";

export default async function DashboardPage({ params }: { params: { id: string } }) {

    
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
            <EditForm updateTool={updateTool}/>
        </div>


    </div>)
}