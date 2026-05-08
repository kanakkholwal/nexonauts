import { fail } from "@sveltejs/kit";
import dbConnect from "$lib/db";
import MessageModel from "src/models/message";
import type { Actions, PageServerLoad } from "./$types";

type SubmitValues = {
	name: string;
	email: string;
	website: string;
	github_username: string;
	github_repo: string;
};

export const load: PageServerLoad = async ({ locals }) => ({
	defaults: {
		name: locals.session?.user?.name ?? "",
		email: locals.session?.user?.email ?? "",
		website: "",
		github_username: locals.session?.user?.username ?? "",
		github_repo: ""
	}
});

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const values: SubmitValues = {
			name: String(formData.get("name") ?? "").trim(),
			email: String(formData.get("email") ?? "").trim(),
			website: String(formData.get("website") ?? "").trim(),
			github_username: String(formData.get("github_username") ?? "").trim(),
			github_repo: String(formData.get("github_repo") ?? "").trim()
		};

		const errors: Partial<Record<keyof SubmitValues | "_", string>> = {};

		if (!values.name) errors.name = "Name is required.";
		if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
			errors.email = "Enter a valid email address.";
		}
		if (!values.website && !values.github_repo) {
			errors._ = "Provide a public website/social URL or a repository URL.";
		}
		if (values.website && !/^https?:\/\//i.test(values.website)) {
			errors.website = "Website must start with http:// or https://.";
		}
		if (values.github_repo && !/^https?:\/\/(www\.)?github\.com\//i.test(values.github_repo)) {
			errors.github_repo = "Repository must be a valid GitHub URL.";
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, { success: false, errors, values });
		}

		try {
			await dbConnect();
			await MessageModel.create({
				name: values.name,
				email: values.email,
				subject: "Dev tool submission",
				message:
					`${values.name} submitted a dev tool for review.\n\n` +
					`Website: ${values.website || "n/a"}\n` +
					`GitHub username: ${values.github_username || "n/a"}\n` +
					`GitHub repo: ${values.github_repo || "n/a"}`,
				type: "contact",
				additional_info: {
					submission_type: "dev-tool",
					website: values.website || null,
					github_username: values.github_username || null,
					github_repo: values.github_repo || null
				}
			});

			return { success: true };
		} catch (err) {
			return fail(500, {
				success: false,
				values,
				errors: {
					_: err instanceof Error ? err.message : "Could not submit the tool."
				}
			});
		}
	}
};

