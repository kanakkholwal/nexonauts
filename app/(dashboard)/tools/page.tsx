import { Suspense } from "react";
import { getToolsByUser } from "./actions";
import ToolList from "./toolLists";
const INITIAL_NUMBER_OF_USERS = 10;
export default async function Page() {

    const initialtools = await getToolsByUser(0, INITIAL_NUMBER_OF_USERS)


    return (<>
        <div id="results" className="@container">
            <hr className="my-4" />
            <Suspense fallback={<div>Loading...</div>}>
                <ToolList initialTools={initialtools} />
            </Suspense>
        </div>

    </>)
}