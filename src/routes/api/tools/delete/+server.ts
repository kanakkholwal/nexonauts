import { json } from "@sveltejs/kit";
import dbConnect from "$lib/db";
import PublicTool from "src/models/tool";
import UserModel from "src/models/user";
import type { RequestHandler } from "./$types";

export const DELETE: RequestHandler = async ({ url, locals }) => {
	try {
		const toolId = url.searchParams.get("toolId");
		if (!locals.session?.user) {
			return json({ result: "fail", message: "Unauthorized" }, { status: 401 });
		}

		await dbConnect();
		const adminUser = await UserModel.findById(locals.session.user.id);
		if (!adminUser) {
			return json({ result: "fail", message: "User not found" }, { status: 404 });
		}
		if (adminUser.role !== "admin") {
			return json({ result: "fail", message: "Unauthorized" }, { status: 401 });
		}

		await PublicTool.findById(toolId).deleteOne();
		return json({ result: "success", message: "Tool deleted" }, { status: 200 });
	} catch (err) {
		return json(
			{ result: "fail", message: err instanceof Error ? err.message : "Internal Server Error" },
			{ status: 500 }
		);
	}
};
