import { fail, type Actions } from "@sveltejs/kit";
import { getAdminMessages } from "$lib/server/management";
import { deleteMessage, setMessageRead } from "$lib/server/moderation";
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

function requireAdmin(locals: App.Locals) {
	return locals.session?.user?.role === "admin";
}

export const actions: Actions = {
	toggleRead: async ({ request, locals }) => {
		if (!requireAdmin(locals)) return fail(403, { message: "Forbidden" });
		const data = await request.formData();
		const messageId = String(data.get("messageId") ?? "");
		const read = data.get("read") === "true";
		if (!messageId) return fail(400, { message: "Missing messageId" });
		const result = await setMessageRead(messageId, read);
		if (!result.success) return fail(400, { message: result.message });
		return result;
	},
	delete: async ({ request, locals }) => {
		if (!requireAdmin(locals)) return fail(403, { message: "Forbidden" });
		const data = await request.formData();
		const messageId = String(data.get("messageId") ?? "");
		if (!messageId) return fail(400, { message: "Missing messageId" });
		const result = await deleteMessage(messageId);
		if (!result.success) return fail(400, { message: result.message });
		return result;
	}
};
