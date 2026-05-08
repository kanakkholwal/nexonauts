import { json } from "@sveltejs/kit";
import dbConnect from "$lib/db";
import UserModel from "src/models/user";
import { mailFetch } from "$lib/server-fetch";
import { generateToken } from "$lib/server/jwt-tokens";
import { env } from "$env/dynamic/private";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals }) => {
	try {
		if (!locals.session?.user) {
			return json({ result: "fail", message: "User is not authenticated" }, { status: 401 });
		}

		await dbConnect();
		const user = await UserModel.findOne({ email: locals.session.user.email }).select(
			"name email verificationToken"
		);

		if (!user) {
			return json({ result: "fail", message: "User not found" }, { status: 404 });
		}

		user.verificationToken = generateToken({ email: user.email });
		await user.save();

		const response = await mailFetch<{
			data: string[] | null;
			error?: string | null | object;
		}>("/api/send", {
			method: "POST",
			body: JSON.stringify({
				template_key: "reset-password",
				targets: [user.email],
				subject: "Reset Password",
				payload: {
					name: user.name,
					email: user.email,
					resetUrl: `${env.BASE_URL ?? env.NEXTAUTH_URL ?? ""}/auth/verify-user?token=${user.verificationToken}`
				}
			})
		});

		if (response.error) {
			return json({ result: "fail", message: "Error sending email" }, { status: 500 });
		}

		return json(
			{ result: "success", message: "Please check your Email Now!!!" },
			{ status: 200 }
		);
	} catch (err) {
		return json(
			{
				result: "fail",
				message: err instanceof Error ? err.message : "Internal Server Error"
			},
			{ status: 500 }
		);
	}
};
