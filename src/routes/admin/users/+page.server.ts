import { fail, type Actions } from "@sveltejs/kit";
import { getAdminUsers } from "$lib/server/management";
import { deleteUserAsAdmin } from "$lib/server/moderation";
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

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		const adminId = locals.session?.user?.id;
		if (!adminId) return fail(401, { message: "Unauthorized" });

		const data = await request.formData();
		const userId = String(data.get("userId") ?? "");
		if (!userId) return fail(400, { message: "Missing userId" });

		const result = await deleteUserAsAdmin(adminId, userId);
		if (!result.success) return fail(400, { message: result.message });
		return result;
	}
};
