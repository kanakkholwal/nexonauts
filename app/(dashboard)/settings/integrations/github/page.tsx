
import { Badge } from "@/components/ui/badge";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { Suspense } from "react";
import dbConnect from "src/lib/dbConnect";
import User from "src/models/user";
import { sessionType } from "src/types/session";
import { fetchRepositories, saveAccessToken } from "./actions";
import Authorisor from "./authorisor";

interface Props {
    searchParams?: {
        code?: string;
    };
}
export default async function GithubPage({ searchParams }: Props) {

    const code = searchParams?.code as string;
    const session = await getServerSession(authOptions) as sessionType;

    await dbConnect();
    const user = await User.findById(session.user._id).select('-_id integrations').exec();
    // const integrations = JSON.parse(JSON.stringify(user.integrations))

    const repos = await fetchRepositories(user.integrations.github.access_token);

    // console.log(repos);





    return (<div className="space-y-6 p-4 md:p-10 mt-5">

        <Suspense fallback={<div>Loading...</div>}>
            {repos.map((repo) => {
                return <div className="flex items-center justify-center [&>div]:w-full" key={repo.id}>
                    <div className="rounded-xl border bg-card text-card-foreground shadow">
                        <div className="flex-col p-6 grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                            <div className="space-y-1">
                                <h3 className="font-semibold leading-none tracking-tight">{repo.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {repo.description}
                                </p>
                            </div>
                            <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
                                <Badge
                                    variant={"secondary"}>
                                    {repo.stargazers_count}
                                </Badge>

                            </div>
                            <div>
                                <Link href={repo.html_url} target="_blank" rel="noreferrer" className="text-primary">View on Github</Link>
                            </div>
                        </div>
                    </div>
                </div>

            })}

        </Suspense>


        {code && <Authorisor code={code} saveToken={saveAccessToken} />}
    </div>)
}