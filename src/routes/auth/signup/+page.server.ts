import { fail, redirect } from "@sveltejs/kit";
import { customAlphabet } from "nanoid";
import { z } from "zod";
import dbConnect from "$lib/db";
import UserModel from "src/models/user";
import { mailFetch } from "$lib/server-fetch";
import { generateToken } from "$lib/server/jwt-tokens";
import { env } from "$env/dynamic/private";
import type { Actions, PageServerLoad } from "./$types";

const registerSchema = z.object({
	name: z.string().min(4, "Name must be at least 4 characters"),
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[A-Z]/, "Must contain an uppercase letter")
		.regex(/[0-9]/, "Must contain a number")
});

const usernameAlphabet = customAlphabet(
	"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
	10
);

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session) redirect(303, "/dashboard");
	return {
		meta: {
			title: "Sign Up — Nexonauts",
			description: "Join the developer ecosystem."
		}
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const parsed = registerSchema.safeParse({
			name: data.get("name"),
			email: data.get("email"),
			password: data.get("password")
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
			const existing = await UserModel.exists({ email: parsed.data.email });
			if (existing) {
				return fail(409, {
					errors: { email: "An account with this email already exists." },
					values: { name: parsed.data.name, email: parsed.data.email }
				});
			}

			const newUser = new UserModel({
				name: parsed.data.name,
				email: parsed.data.email,
				password: parsed.data.password,
				username: usernameAlphabet(),
				verificationToken: generateToken({ email: parsed.data.email })
			});
			await newUser.save();

			const baseUrl = env.BASE_URL ?? env.NEXTAUTH_URL ?? "";
			const verifyUrl = `${baseUrl}/auth/verify-user?token=${newUser.verificationToken}`;

			try {
				await mailFetch<{ data: string[] | null; error?: string | null | object }>("/api/send", {
					method: "POST",
					body: JSON.stringify({
						template_key: "welcome_verify",
						targets: [newUser.email],
						subject: "🌟 Welcome to Nexonauts - Verify Your Account! 🌟",
						payload: {
							name: newUser.name,
							email: newUser.email,
							verifyUrl,
							platform_name: "Nexonauts"
						}
					})
				});
			} catch (err) {
				console.warn("[signup] mail dispatch failed:", err);
			}

			return {
				success: true,
				email: parsed.data.email,
				name: parsed.data.name
			};
		} catch (err) {
			console.error("[signup] register failed:", err);
			return fail(500, {
				errors: { _: "Something went wrong. Please try again." },
				values: { name: parsed.data.name, email: parsed.data.email }
			});
		}
	}
};
