import { fail, type Actions } from "@sveltejs/kit";
import { getAdminTools } from "$lib/server/management";
import { deleteToolAsAdmin, setToolStatus, setToolVerification } from "$lib/server/moderation";
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

function requireAdmin(locals: App.Locals) {
	return locals.session?.user?.role === "admin";
}

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		if (!requireAdmin(locals)) return fail(403, { message: "Forbidden" });
		const data = await request.formData();
		const toolId = String(data.get("toolId") ?? "");
		if (!toolId) return fail(400, { message: "Missing toolId" });
		const result = await deleteToolAsAdmin(toolId);
		if (!result.success) return fail(400, { message: result.message });
		return result;
	},
	verify: async ({ request, locals }) => {
		if (!requireAdmin(locals)) return fail(403, { message: "Forbidden" });
		const data = await request.formData();
		const toolId = String(data.get("toolId") ?? "");
		const verified = data.get("verified") === "true";
		if (!toolId) return fail(400, { message: "Missing toolId" });
		const result = await setToolVerification(toolId, verified);
		if (!result.success) return fail(400, { message: result.message });
		return result;
	},
	status: async ({ request, locals }) => {
		if (!requireAdmin(locals)) return fail(403, { message: "Forbidden" });
		const data = await request.formData();
		const toolId = String(data.get("toolId") ?? "");
		const status = String(data.get("status") ?? "");
		if (!toolId || !["draft", "published", "archived"].includes(status)) {
			return fail(400, { message: "Invalid status update" });
		}
		const result = await setToolStatus(toolId, status as "draft" | "published" | "archived");
		if (!result.success) return fail(400, { message: result.message });
		return result;
	}
};
