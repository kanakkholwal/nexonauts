import { fail } from "@sveltejs/kit";
import { z } from "zod";
import dbConnect from "$lib/db";
import Message from "src/models/message";
import type { Actions, PageServerLoad } from "./$types";

const contactSchema = z.object({
	name: z.string().min(1).max(100),
	email: z.string().email().min(5).max(100),
	message: z.string().min(30).max(5000),
	category: z.string().min(1, { message: "Please select a topic" }),
	companyName: z.string().max(100).optional(),
	website: z.string().max(100).optional()
});

export const load: PageServerLoad = async ({ locals }) => ({
	meta: {
		title: "Contact — Nexonauts",
		description: "Get in touch with the Nexonauts team."
	},
	defaults: {
		name: locals.session?.user?.name ?? "",
		email: locals.session?.user?.email ?? ""
	}
});

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const parsed = contactSchema.safeParse({
			name: data.get("name"),
			email: data.get("email"),
			message: data.get("message"),
			category: data.get("category"),
			companyName: data.get("companyName") ?? undefined,
			website: data.get("website") ?? undefined
		});

		if (!parsed.success) {
			const fieldErrors: Record<string, string> = {};
			for (const issue of parsed.error.issues) {
				const key = issue.path[0]?.toString();
				if (key) fieldErrors[key] = issue.message;
			}
			return fail(400, {
				errors: fieldErrors,
				values: {
					name: data.get("name")?.toString() ?? "",
					email: data.get("email")?.toString() ?? "",
					message: data.get("message")?.toString() ?? "",
					category: data.get("category")?.toString() ?? "",
					companyName: data.get("companyName")?.toString() ?? "",
					website: data.get("website")?.toString() ?? ""
				}
			});
		}

		try {
			await dbConnect();
			await new Message({
				name: parsed.data.name,
				email: parsed.data.email,
				message: parsed.data.message,
				type: "contact",
				aditional_info: {
					category: parsed.data.category,
					companyName: parsed.data.companyName,
					website: parsed.data.website
				}
			}).save();

			return { success: true as const };
		} catch (err) {
			console.error("[contact] save failed:", err);
			return fail(500, {
				errors: { _: "Could not send your message. Try again later." },
				values: parsed.data
			});
		}
	}
};
