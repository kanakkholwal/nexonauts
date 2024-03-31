import { DataTable } from "@/components/ui/data-table";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { Suspense } from "react";
import { sessionType } from "src/types/session";
import { getUsers } from './actions';
import { columns } from "./columns";
import { getSession } from "src/lib/auth";



export default async function DashboardPage() {
    const session = await getSession() as sessionType;


    const { users } = await getUsers('', 1, {});
    console.log(users);


    return (<div className="space-y-6 my-5">
        <div className="container mx-auto py-10 px-2">
            <Suspense fallback={<div>Loading...</div>}>
                <DataTable columns={columns} data={users} />
            </Suspense>
        </div>


    </div>)
}