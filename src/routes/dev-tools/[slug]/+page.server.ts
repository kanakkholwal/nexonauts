import { error } from "@sveltejs/kit";
import { findDevTool } from "../tools";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const tool = findDevTool(params.slug);
	if (!tool) throw error(404, "Tool not found.");
	return {
		tool,
		meta: {
			title: `${tool.title} — Dev Tools`,
			description: tool.description.substring(0, 160)
		}
	};
};
