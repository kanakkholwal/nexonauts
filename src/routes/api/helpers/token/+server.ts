import crypto from "node:crypto";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const MAX_LENGTH = 512;
const ENCODINGS = new Set(["hex", "base64"]);

export const GET: RequestHandler = async ({ url }) => {
	// parseInt returns NaN for junk and randomBytes throws on NaN or a negative,
	// so both bounds are checked before it is reached.
	const length = Number.parseInt(url.searchParams.get("length") ?? "32", 10);
	if (!Number.isInteger(length) || length < 1 || length > MAX_LENGTH) {
		return json(
			{ result: "fail", message: `length must be an integer between 1 and ${MAX_LENGTH}` },
			{ status: 400 }
		);
	}

	const encoding = url.searchParams.get("encoding") ?? "hex";
	if (!ENCODINGS.has(encoding)) {
		return json({ result: "fail", message: "encoding must be hex or base64" }, { status: 400 });
	}

	try {
		const token = crypto.randomBytes(length).toString(encoding as "hex" | "base64");
		return json({ result: "success", data: { token } }, { status: 200 });
	} catch {
		// The internal message is never surfaced to the caller.
		return json({ result: "fail", message: "Could not generate a token" }, { status: 500 });
	}
};
