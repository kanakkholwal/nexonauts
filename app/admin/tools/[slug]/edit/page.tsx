import { Button } from "@/components/ui/button";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getToolBySlug, updateTool, deleteTool } from "./actions";
import EditForm from "./form";
import { useFormStore } from "./store";
import StoreInitializer from "./store-initialzer";

export default async function DashboardPage({
  params,
}: {
  params: { slug: string };
}) {
  const { tool, available_categories } = await getToolBySlug(params.slug);
  if (tool === null) return notFound();

  useFormStore.setState({
    tool: tool,
  });
  console.log("Tool", tool);

  return (
    <div className="space-y-6 my-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Edit Tool</h1>
        <Button variant="link" asChild>
          <Link href="/admin/tools">
            <ArrowLeft />
            Back to Tools
          </Link>
        </Button>
      </div>

      <div className="glassmorphism p-5 rounded-lg">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <LoaderCircle className="animate-spin h-16 w-16 text-primary" />
            </div>
          }
        >
          <StoreInitializer tool={tool} />
          <EditForm
            updateTool={updateTool.bind(null, tool._id)}
            deleteTool={deleteTool.bind(null, tool._id)}
            available_categories={available_categories}
          />
        </Suspense>
      </div>
    </div>
  );
}
