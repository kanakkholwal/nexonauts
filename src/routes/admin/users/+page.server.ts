import { getAdminUsers } from "$lib/server/management";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	return {
		users: await getAdminUsers(),
		meta: {
			title: "Users - Admin",
			description: "Review the latest users in the Nexonauts admin console."
		}
	};
};
