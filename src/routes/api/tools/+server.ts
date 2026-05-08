import { Worker } from "node:worker_threads";
import { json } from "@sveltejs/kit";
import dbConnect from "$lib/db";
import PublicTool from "src/models/tool";
import type { RequestHandler } from "./$types";

export const PUT: RequestHandler = async () => {
	try {
		await dbConnect();
		const start = Date.now();

		const allTools = await PublicTool.find({}).select("name link").lean().exec();

		for (const tool of allTools) {
			const worker = new Worker("./worker.ts", { workerData: { tool } });
			worker.on("message", (m) => console.log(m));
			worker.on("error", (e) => console.error(e));
			worker.on("exit", () => console.log(`Worker ${tool.name} stopped working.`));
		}

		return json(
			{ result: "success", message: `Time taken : ${(Date.now() - start) / 100}seconds` },
			{ status: 200 }
		);
	} catch (err) {
		return json(
			{ result: "fail", message: err instanceof Error ? err.message : "Internal Server Error" },
			{ status: 500 }
		);
	}
};
