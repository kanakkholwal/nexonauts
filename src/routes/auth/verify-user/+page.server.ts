import dbConnect from "$lib/db";
import UserModel from "src/models/user";
import { verifyToken } from "$lib/server/jwt-tokens";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, locals }) => {
	const token = url.searchParams.get("token");
	const loggedIn = !!locals.session?.user;

	if (!token) {
		return {
			loggedIn,
			result: null,
			meta: { title: "Verify Email — Nexonauts" }
		};
	}

	const payload = verifyToken(token);
	if (!payload || typeof payload !== "object" || !payload.email) {
		return {
			loggedIn,
			result: { success: false as const, message: "Invalid token." },
			meta: { title: "Verify Email — Nexonauts" }
		};
	}

	if (payload.exp && Date.now() >= payload.exp * 1000) {
		return {
			loggedIn,
			result: { success: false as const, message: "Token expired." },
			meta: { title: "Verify Email — Nexonauts" }
		};
	}

	try {
		await dbConnect();
		const user = await UserModel.findOneAndUpdate(
			{ email: payload.email },
			{ verified: true, verificationToken: null }
		).exec();

		if (!user) {
			return {
				loggedIn,
				result: { success: false as const, message: "User not found." },
				meta: { title: "Verify Email — Nexonauts" }
			};
		}

		return {
			loggedIn,
			result: { success: true as const, message: "Email verified successfully!" },
			meta: { title: "Verify Email — Nexonauts" }
		};
	} catch (err) {
		console.error("[verify-user] failed:", err);
		return {
			loggedIn,
			result: { success: false as const, message: "Verification failed." },
			meta: { title: "Verify Email — Nexonauts" }
		};
	}
};
