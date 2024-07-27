import { Button } from "@/components/ui/button";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { getCategories, submitTool } from "./actions";
import EditForm from "./form";
import StoreInitializer from "./store-initialzer";

export default async function DashboardPage() {
  const { available_categories } = await getCategories();

  return (
    <div className="space-y-6 my-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Edit Tool</h1>
        <Button variant="link" asChild>
          <Link href="/tools">
            <ArrowLeft />
            Back to Tools
          </Link>
        </Button>
      </div>

      <div className="bg-glasss p-5 rounded-lg">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <LoaderCircle className="animate-spin h-16 w-16 text-primary" />
            </div>
          }
        >
          <StoreInitializer />
          <EditForm
            submitTool={submitTool}
            available_categories={available_categories}
          />
        </Suspense>
      </div>
    </div>
  );
}
