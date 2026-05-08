import { getAdminMessages } from "$lib/server/management";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	return {
		messages: await getAdminMessages(),
		meta: {
			title: "Messages - Admin",
			description: "Review inbound contact submissions in the Nexonauts admin console."
		}
	};
};
