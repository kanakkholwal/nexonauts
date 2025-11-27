import { NumberTicker } from "@/components/animation/number-ticker";
import { StatsCard } from "@/components/application/stats-card";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { CircleDashed, TrendingDown, TrendingUp } from "lucide-react";
import { getSession } from "~/auth/server";

import { changeCase } from "src/utils/string";
import { tools_CountAndGrowth, users_CountAndGrowth } from "./actions";
import { Session } from "~/auth";

export default async function DashboardPage() {
  const session = (await getSession()) as Session;

  console.log(session);
  const usersStats = await users_CountAndGrowth("this_month");

  const toolsStats = await tools_CountAndGrowth("this_month");

  return (
    <div className="space-y-6 my-5">
      <div>
        <h2 className="text-3xl font-semibold mb-2">Hi, {session.user.name}</h2>
        <p className="text-muted-foreground">
          Let{`'`}s check out your Platform today!
        </p>
      </div>
      <div className="flex justify-between gap-2 w-full flex-col @4xl:flex-row divide-y @4xl:divide-x divide-border">
        <div className="w-full grid grid-cols-1 @lg:grid-cols-2 @4xl:grid-cols-12 gap-4 pr-1.5 @4xl:pr-0">
          <StatsCard
            className="col-span-1   @4xl:col-span-4"
            title="Total Users"
            Icon={<Icon name="users" className="inline-block mr-2 size-4" />}
          >
            <NumberTicker
              value={usersStats.count}
              className={cn(
                "text-3xl font-bold text-primary after:text-xs",
                usersStats.trend === "increase"
                  ? "after:text-green-500"
                  : usersStats.trend === "decrease"
                    ? "after:text-red-500"
                    : "after:text-primary/80"
              )}
              suffix={
                usersStats.trend === "increase"
                  ? "↑" + usersStats.growth
                  : usersStats.trend === "decrease"
                    ? "↓" + usersStats.growth
                    : ""
              }
            />

            <p className="text-xs text-muted-foreground">
              <span
                className={`${usersStats.trend === "increase"
                  ? "text-green-500"
                  : usersStats.trend === "decrease"
                    ? "text-red-500"
                    : "text-primary/80"
                  } text-base`}
              >
                {usersStats.trend === "increase" ? (
                  <TrendingUp className="inline-block mr-2 size-4" />
                ) : usersStats.trend === "decrease" ? (
                  <TrendingDown className="inline-block mr-2 size-4" />
                ) : (
                  <CircleDashed className="inline-block mr-2 size-4" />
                )}
                {usersStats.growth?.toFixed(2)}%
              </span>{" "}
              from {changeCase("this_month", "title")}
            </p>

          </StatsCard>
          <StatsCard
            className="col-span-1   @4xl:col-span-4"
            title="Total Tools"
            Icon={<Icon name="tools" className="inline-block mr-2 size-4" />}
            >
            <NumberTicker
              value={toolsStats.count}
              className={cn(
                "text-3xl font-bold text-primary after:text-xs",
                toolsStats.trend === "increase"
                  ? "after:text-green-500"
                  : toolsStats.trend === "decrease"
                    ? "after:text-red-500"
                    : "after:text-primary/80"
              )}
              suffix={
                toolsStats.trend === "increase"
                  ? "↑" + toolsStats.growth
                  : toolsStats.trend === "decrease"
                    ? "↓" + toolsStats.growth
                    : ""
              }
            />
            <p className="text-xs text-muted-foreground">
              <span
                className={`${toolsStats.trend === "increase"
                  ? "text-green-500"
                  : toolsStats.trend === "decrease"
                    ? "text-red-500"
                    : "text-primary/80"
                  } text-base`}
              >
                {toolsStats.trend === "increase" ? (
                  <TrendingUp className="inline-block mr-2 size-4" />
                ) : toolsStats.trend === "decrease" ? (
                  <TrendingDown className="inline-block mr-2 size-4" />
                ) : (
                  <CircleDashed className="inline-block mr-2 size-4" />
                )}
                {toolsStats.growth?.toFixed(2)}%
              </span>{" "}
              from {changeCase("this_month", "title")}
            </p>
            </StatsCard>

         
        </div>
      </div>

    </div>
  );
}
