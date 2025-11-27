import { DataTable } from "@/components/ui/data-table";
import { Suspense } from "react";

import { getSession } from "~/auth/server";
import { getUsers } from "./actions";
import { columns } from "./columns";
import { Session } from "src/auth";

export default async function DashboardPage() {
  // const session = (await getSession()) as Session;

  const { users } = await getUsers("", 1, {});
  console.log(users);

  return (
    <div className="space-y-6 my-5">
      <div className="container mx-auto py-10 px-2">
        <Suspense fallback={<div>Loading...</div>}>
          <DataTable columns={columns} data={users} />
        </Suspense>
      </div>
    </div>
  );
}
