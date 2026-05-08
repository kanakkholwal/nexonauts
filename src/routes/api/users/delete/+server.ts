import { json } from "@sveltejs/kit";
import dbConnect from "$lib/db";
import ProfileModel from "src/models/profile";
import UserModel from "src/models/user";
import type { RequestHandler } from "./$types";

export const DELETE: RequestHandler = async ({ url, locals }) => {
	try {
		const userId = url.searchParams.get("userId");
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

		const target = await UserModel.findById(userId);
		if (target?.role === "admin") {
			const adminCount = await UserModel.countDocuments({ role: "admin" });
			if (adminCount === 1) {
				return json(
					{ result: "fail", message: "Cannot delete the only admin" },
					{ status: 400 }
				);
			}
		}

		await UserModel.findById(userId).deleteOne();
		await ProfileModel.findOneAndDelete({ user: userId });

		return json({ result: "success", message: "User deleted" }, { status: 200 });
	} catch (err) {
		return json(
			{ result: "fail", message: err instanceof Error ? err.message : "Internal Server Error" },
			{ status: 500 }
		);
	}
};
