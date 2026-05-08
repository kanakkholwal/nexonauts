import { GoogleGenerativeAI, type GenerativeModel } from "@google/generative-ai";
import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import type { RequestHandler } from "./$types";

async function generateDescription(model: GenerativeModel, toolName: string, toolSite: string) {
	const generationConfig = {
		temperature: 0.9,
		topK: 1,
		topP: 1,
		maxOutputTokens: 2048
	};
	const prompt = `
Write a description and an overview of ${toolName}, which has a website at ${toolSite}, providing details about the tool, its pricing model, and any other basic information I should know before using it. Please ensure the generated summary is comprehensive and includes relevant details.
`;
	const result = await model.generateContent({
		contents: [{ role: "user", parts: [{ text: prompt }] }],
		generationConfig
	});
	return result.response.text();
}

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		const { name, link } = await request.json();
		if (!locals.session?.user) {
			return json({ result: "fail", message: "Unauthorized" }, { status: 401 });
		}

		const apiKey = env.GEMINI_API_KEY;
		if (!apiKey) {
			return json(
				{ result: "fail", message: "GEMINI_API_KEY is not configured." },
				{ status: 500 }
			);
		}

		const genAI = new GoogleGenerativeAI(apiKey);
		const model = genAI.getGenerativeModel({ model: "gemini-pro" });
		const description = await generateDescription(model, name, link);

		return json(
			{
				result: "success",
				message: "Description generated successfully",
				data: description
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
