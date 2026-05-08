import { env } from "$env/dynamic/private";
import dbConnect from "$lib/db";
import Post from "src/models/post";
import { getAllPublicTools } from "src/utils/public-tool";
import { devTools } from "../dev-tools/tools";
import type { RequestHandler } from "./$types";

const SITE_URL = env.WEBSITE_URL ?? env.BASE_URL ?? "https://nexonauts.com";

function escapeXml(unsafe: string) {
	return unsafe.replace(/[<>&'"]/g, (c) => {
		switch (c) {
			case "<":
				return "&lt;";
			case ">":
				return "&gt;";
			case "&":
				return "&amp;";
			case "'":
				return "&apos;";
			case '"':
				return "&quot;";
			default:
				return "";
		}
	});
}

function generateSiteMap(pages: { path: string; date: string }[]) {
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(p) => `  <url>
    <loc>${SITE_URL + escapeXml(p.path)}</loc>
    <lastmod>${escapeXml(p.date)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
	)
	.join("\n")}
</urlset>`;
}

export const GET: RequestHandler = async () => {
	await dbConnect();
	const now = new Date().toISOString();

	const posts = await Post.find({ state: "published" })
		.sort({ publishedAt: -1 })
		.select("slug createdAt")
		.exec();

	const publicTools = await getAllPublicTools();

	const manualRoutes = [
		{ path: "/", date: now },
		{ path: "/contact", date: now },
		{ path: "/about", date: now },
		{ path: "/copyright", date: now },
		{ path: "/pricing", date: now },
		{ path: "/privacy", date: now },
		{ path: "/tos", date: now },
		{ path: "/auth/sign-in", date: now },
		{ path: "/auth/signup", date: now },
		{ path: "/dev-tools", date: now },
		...devTools.map((t) => ({ path: `/dev-tools/${t.slug}`, date: now })),
		{ path: "/scout/", date: now },
		{ path: "/scout/browse", date: now }
	];

	const sitemap = generateSiteMap([
		...manualRoutes,
		...posts.map((p) => ({
			path: `/blog/articles/${p.slug}`,
			date: new Date(p.createdAt).toISOString()
		})),
		...publicTools.map((t) => ({
			path: `/scout/tools/${t.slug}`,
			date: new Date(t?.createdAt ?? Date.now()).toISOString()
		}))
	]);

	return new Response(sitemap, {
		status: 200,
		headers: { "Content-Type": "application/xml; charset=utf-8" }
	});
};
