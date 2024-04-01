import { Button } from "@/components/ui/button";
import { ArrowBigRightDash, LoaderCircle, Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { BiSad } from "react-icons/bi";
import { getToolsByUser } from "./actions";
import ToolList from "./toolLists";

const INITIAL_NUMBER_OF_USERS = 10;

export default async function Page() {

    const initialtools = await getToolsByUser(0, INITIAL_NUMBER_OF_USERS)



    return (<>
        <div className="flex justify-between items-center flex-wrap gap-4  mt-10">

            <h1 className="text-3xl font-bold">My Tools</h1>

            <Button variant="link" asChild>
                <Link href={`/tools/submit`} >
                    <Plus />
                    New Tool
                </Link>
            </Button>
        </div>
        <div id="results" className="@container">
            <hr className="my-4" />
            {initialtools.length === 0 && <div className="flex justify-center items-center h-64 flex-col gap-4 text-center">
                <BiSad className="h-20 w-20 mx-auto text-primary mt-3" />
                <h3 className="text-xl font-semibold">No Tools Found</h3>
                <p className="text-gray-500">You have not submitted any tools yet.</p>
                <Button width="xs" asChild>
                    <Link href="/tools/submit">
                        Submit a Tool Now
                        <ArrowBigRightDash />
                    </Link>
                </Button>
            </div>}
            <Suspense fallback={<div className="flex justify-center items-center h-64">
                <LoaderCircle className="animate-spin h-14 w-14 text-primary" />
            </div>}>
                <ToolList initialTools={initialtools} />
            </Suspense>
        </div>

    </>)
}