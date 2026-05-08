import { json } from "@sveltejs/kit";
import dbConnect from "$lib/db";
import Message from "src/models/message";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		await dbConnect();

		const message = new Message({
			name: data.name,
			email: data.email,
			message: data.message,
			type: "contact",
			aditional_info: { ...data.aditional_info }
		});
		await message.save();

		return json({ result: "success" }, { status: 200 });
	} catch (err) {
		return json(
			{ result: "fail", message: (err as Error)?.message },
			{ status: 500 }
		);
	}
};
