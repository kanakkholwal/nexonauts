import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleDashed, TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import { getSession } from "src/lib/auth";
import { sessionType } from "src/types/session";
import { tools_CountAndGrowth, users_CountAndGrowth } from "./actions";

export default async function DashboardPage() {
  const session = (await getSession()) as sessionType;

  console.log(session);
  const {
    count: userCount,
    growth: userGrowth,
    trend: userTrend,
  } = await users_CountAndGrowth("this_month");

  const {
    count: toolCount,
    growth: toolGrowth,
    trend: toolTrend,
  } = await tools_CountAndGrowth("this_month");

  return (
    <div className="space-y-6 my-5">
      <div>
        <h2 className="text-3xl font-semibold mb-2">Hi, {session.user.name}</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Let's check out your Platform today!
        </p>
      </div>
      <div className="flex justify-between gap-2 w-full flex-col lg:flex-row">
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
                <CardDescription>
                  <span
                    className={
                      (userTrend === "increase"
                        ? "text-green-500"
                        : userTrend === "decrease"
                          ? "text-red-500"
                          : "text-primary/80") + " text-base"
                    }
                  >
                    {userTrend === "increase" ? (
                      <TrendingUp size={20} className="inline-block mr-2" />
                    ) : userTrend === "decrease" ? (
                      <TrendingDown size={20} className="inline-block mr-2" />
                    ) : (
                      <CircleDashed size={20} className="inline-block mr-2" />
                    )}
                    {userGrowth?.toFixed(2)}%
                  </span>{" "}
                  from last month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-5xl font-semibold">{userCount}</h3>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Tools</CardTitle>
                <CardDescription>
                  <span
                    className={
                      (toolTrend === "increase"
                        ? "text-green-500"
                        : toolTrend === "decrease"
                          ? "text-red-500"
                          : "text-primary/80") + " text-base"
                    }
                  >
                    {toolTrend === "increase" ? (
                      <TrendingUp size={20} className="inline-block mr-2" />
                    ) : toolTrend === "decrease" ? (
                      <TrendingDown size={20} className="inline-block mr-2" />
                    ) : (
                      <CircleDashed size={20} className="inline-block mr-2" />
                    )}
                    {toolGrowth?.toFixed(2)}%
                  </span>{" "}
                  from last month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-5xl font-semibold">{toolCount}</h3>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="lg:w-1/3 p-3">
          {/* messages */}
          <h3 className="text-2xl font-semibold mb-2">Messages</h3>
          <div className="bg-white dark:bg-slate-800 px-4 py-10 rounded-lg text-center w-full">
            <p className="text-slate-600 dark:text-slate-400 mb-3">
              You have no new messages.
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              <Link
                href="/admin/messages"
                className="text-primary hover:underline"
              >
                View all messages
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
