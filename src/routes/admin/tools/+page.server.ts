import { getAdminTools } from "$lib/server/management";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	return {
		tools: await getAdminTools(),
		meta: {
			title: "Tools - Admin",
			description: "Review developer tools in the Nexonauts admin console."
		}
	};
};
