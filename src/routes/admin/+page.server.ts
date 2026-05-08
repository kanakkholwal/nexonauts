import { tools_CountAndGrowth, users_CountAndGrowth } from "$lib/server/admin-stats";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const [usersStats, toolsStats] = await Promise.all([
		users_CountAndGrowth("this_month"),
		tools_CountAndGrowth("this_month")
	]);
	return { usersStats, toolsStats };
};
