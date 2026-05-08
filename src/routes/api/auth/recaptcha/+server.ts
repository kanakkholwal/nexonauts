import axios from "axios";
import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { token } = await request.json();
		const secretKey = env.RECAPTCHA_SECRET_KEY;
		const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
		const { data } = await axios.post(verificationUrl);

		return json(
			{
				result: data.success ? "success" : "fail",
				message: data.success
					? "recaptcha verification successful"
					: "recaptcha verification failed",
				...data
			},
			{ status: 200 }
		);
	} catch (err) {
		return json({ result: "fail", message: (err as Error)?.message }, { status: 500 });
	}
};
