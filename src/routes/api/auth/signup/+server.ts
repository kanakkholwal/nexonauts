import { json } from "@sveltejs/kit";
import { z } from "zod";
import dbConnect from "$lib/db";
import { mailFetch } from "$lib/server-fetch";
import UserModel from "src/models/user";
import { generateToken } from "$lib/server/jwt-tokens";
import { env } from "$env/dynamic/private";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { name, email, password } = await request.json();

		if (!name || !email || !password) {
			return json(
				{ result: "fail", message: "name, email and password are required" },
				{ status: 400 }
			);
		}
		if (!z.string().email().safeParse(email).success) {
			return json({ result: "fail", message: "invalid email" }, { status: 400 });
		}
		if (password.length < 6) {
			return json(
				{ result: "fail", message: "password must be at least 6 characters long" },
				{ status: 400 }
			);
		}

		await dbConnect();
		if (await UserModel.findOne({ email }).exec()) {
			return json({ result: "fail", message: "user already exists" }, { status: 400 });
		}

		const newUser = new UserModel({
			name,
			email,
			password,
			username: email.split("@")[0],
			providers: ["email"],
			verificationToken: generateToken({ email })
		});
		await newUser.save();

		try {
			const response = await mailFetch<{
				data: string[] | null;
				error?: string | null | object;
			}>("/api/send", {
				method: "POST",
				body: JSON.stringify({
					template_key: "welcome_verify",
					targets: [newUser.email],
					subject: "🌟 Welcome to Nexonauts - Verify Your Account! 🌟",
					payload: {
						platform_name: "Nexonauts",
						name: newUser.name,
						email: newUser.email,
						verifyUrl: `${env.BASE_URL ?? env.NEXTAUTH_URL ?? ""}/auth/verify-user?token=${newUser.verificationToken}`
					}
				})
			});

			if (response.error) {
				return json(
					{
						result: "fail",
						message: "User is registered successfully but Error sending email"
					},
					{ status: 500 }
				);
			}
		} catch (mailErr) {
			console.warn("[api/auth/signup] mail dispatch failed:", mailErr);
		}

		return json(
			{
				result: "success",
				message: "User is registered Successfully, Please verify your Email Now!!!"
			},
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
