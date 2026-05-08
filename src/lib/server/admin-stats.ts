import dbConnect from "$lib/db";
import PublicToolModel from "src/models/tool";
import UserModel from "src/models/user";

export type StatsResult = {
	count: number;
	growth: number;
	trend: "increase" | "decrease" | "stable";
};

function intervalStart(interval: string): Date {
	const now = new Date();
	switch (interval) {
		case "last_hour":
			return new Date(now.getTime() - 60 * 60 * 1000);
		case "last_24_hours":
			return new Date(now.getTime() - 24 * 60 * 60 * 1000);
		case "this_week":
			return new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
		case "this_month":
			return new Date(now.getFullYear(), now.getMonth(), 1);
		case "this_year":
			return new Date(now.getFullYear(), 0, 1);
		default:
			throw new Error(`Invalid time interval: ${interval}`);
	}
}

function trendOf(growth: number): StatsResult["trend"] {
	if (growth > 0) return "increase";
	if (growth < 0) return "decrease";
	return "stable";
}

export async function users_CountAndGrowth(timeInterval: string): Promise<StatsResult> {
	await dbConnect();
	const startTime = intervalStart(timeInterval);
	const prevStart = new Date(startTime);
	prevStart.setFullYear(prevStart.getFullYear() - 1);

	const count = await UserModel.countDocuments({});
	const prevCount = await UserModel.countDocuments({
		createdAt: { $gte: prevStart, $lt: startTime }
	});
	const growth = prevCount === 0 ? 100 : ((count - prevCount) / prevCount) * 100;
	return { count, growth, trend: trendOf(growth) };
}

export async function tools_CountAndGrowth(timeInterval: string): Promise<StatsResult> {
	await dbConnect();
	const startTime = intervalStart(timeInterval);
	const prevStart = new Date(startTime);
	prevStart.setFullYear(prevStart.getFullYear() - 1);

	const count = await PublicToolModel.countDocuments({});
	const prevCount = await PublicToolModel.countDocuments({
		createdAt: { $gte: prevStart, $lt: startTime }
	});
	const growth = prevCount === 0 ? 100 : ((count - prevCount) / prevCount) * 100;
	return { count, growth, trend: trendOf(growth) };
}
