import { fail } from "@sveltejs/kit";
import { z } from "zod";
import dbConnect from "$lib/db";
import User from "src/models/user";
import { generateSlug } from "src/utils/string";
import type { Actions, PageServerLoad } from "./$types";

const waitlistSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Name must be at least 3 characters long" })
		.max(100, { message: "Name cannot exceed 100 characters" }),
	email: z
		.string()
		.email({ message: "Please enter a valid email address" })
		.min(5, { message: "Email must be at least 5 characters long" })
		.max(100, { message: "Email cannot exceed 100 characters" })
});

export const load: PageServerLoad = async () => ({
	meta: {
		title: "Waitlist — Nexonauts",
		description: "Join the Nexonauts waitlist."
	}
});

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const parsed = waitlistSchema.safeParse({
			name: data.get("name"),
			email: data.get("email")
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
					email: data.get("email")?.toString() ?? ""
				}
			});
		}

		try {
			await dbConnect();
			const existing = await User.findOne({ email: parsed.data.email.toLowerCase() });
			if (existing) {
				return fail(409, {
					errors: { email: "Email already on waitlist." },
					values: parsed.data
				});
			}

			const user = new User({
				name: parsed.data.name,
				email: parsed.data.email.toLowerCase(),
				username: generateSlug(8),
				role: "waitlist",
				account_type: "free",
				verificationToken: null,
				password: generateSlug(8),
				verified: false,
				providers: [],
				additional_info: {}
			});
			await user.save();

			return { success: true as const };
		} catch (err) {
			console.error("[waitlist] save failed:", err);
			return fail(500, {
				errors: { _: "Could not add to waitlist. Try again later." },
				values: parsed.data
			});
		}
	}
};
