import { fail, redirect, type Actions } from "@sveltejs/kit";
import { getDashboardTools } from "$lib/server/management";
import { deleteToolAsAuthor } from "$lib/server/moderation";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = locals.session;
	if (!session?.user) {
		redirect(303, "/auth/sign-in?callbackUrl=/dashboard/tools");
	}

	return {
		tools: session.user.profile ? await getDashboardTools(session.user.profile) : [],
		meta: {
			title: "Tools - Dashboard",
			description: "Manage tools you've submitted to the directory."
		}
	};
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		const profileId = locals.session?.user?.profile;
		if (!profileId) return fail(401, { message: "Unauthorized" });

		const data = await request.formData();
		const toolId = String(data.get("toolId") ?? "");
		if (!toolId) return fail(400, { message: "Missing toolId" });

		const result = await deleteToolAsAuthor(toolId, profileId);
		if (!result.success) return fail(400, { message: result.message });
		return result;
	}
};
