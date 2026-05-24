import crypto from "node:crypto";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
	try {
		const start = Date.now();
		const length = parseInt(url.searchParams.get("length") ?? "32");
		if (length > 512) throw new Error("Secret key length should be less than 512");

		const encoding = url.searchParams.get("encoding") ?? "hex";
		if (encoding !== "hex" && encoding !== "base64") {
			throw new Error("Encoding should be either hex or base64");
		}

		const token = crypto.randomBytes(length).toString(encoding as "hex" | "base64");

		return json(
			{
				result: "success",
				message: `Time taken : ${(Date.now() - start) / 100}seconds`,
				data: { token }
			},
			{ status: 200 }
		);
	} catch (err) {
		return json(
			{ result: "fail", message: err instanceof Error ? err.message : "Internal Server Error" },
			{ status: 500 }
		);
	}
};
