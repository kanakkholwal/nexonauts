import dbConnect from "lib/dbConnect";
import Post from "models/post";
import { getAllApps } from "src/utils/app";
import { getAllPublicTools } from "src/utils/public-tool";

const URL = process.env.WEBSITE_URL || "https://nexonauts.com";


// Function to escape special XML characters
function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case "'": return '&apos;';
            case '"': return '&quot;';
        }
    });
}
// This function will generate the robots.txt
function generateSiteMap(pages) {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Add the static URLs manually -->
      ${pages.map((page) => {
        return `
            <url>
              <loc>${URL + escapeXml(page.path)}</loc>
              <lastmod>${escapeXml(page.date)}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>0.8</priority>
            </url>
          `}).join("")}
    </urlset>
    `;
}
export async function GET(request: Request) {
    // const posts = getSortedPostsData();

    await dbConnect();
    const posts = await Post.find({
        state: "published",
    }).sort({ publishedAt: -1 })
        .select("slug publishedAt")
        .exec()
    const { apps } = await getAllApps();
    const manualRoutes = [
        {
        path: "/",
        date: new Date().toISOString(),
    },
    {
        path: "/contact",
        date: new Date().toISOString(),
    },
    {
        path: "/about",
        date: new Date().toISOString(),
    },
    {
        path: "/copyright",
        date: new Date().toISOString(),
    },
    {
        path: "/pricing",
        date: new Date().toISOString(),
    },
    {
        path: "/privacy",
        date: new Date().toISOString(),
    },
    {
        path: "/tos",
        date: new Date().toISOString(),
    },
    {
        path: "/login",
        date: new Date().toISOString(),
    },
    {
        path: "/signup",
        date: new Date().toISOString(),
    },
    {
        path: "/blog",
        date: new Date().toISOString(),
    },
    {
        path: "/apps",
        date: new Date().toISOString(),
    },
    {
        path: "/dev-tools",
        date: new Date().toISOString(),
    },
    {
        path: `/toolzen/`,
        date: new Date().toISOString(),
    },
    {
        path: `/toolzen/browse`,
        date: new Date().toISOString(),
    },
    ]
    const publicTools = await getAllPublicTools();
    // Generate the XML sitemap with the blog data
    const sitemap = generateSiteMap([
        ...manualRoutes,
        ...posts.map((post) => ({
            path: `/blog/posts/${post.slug}`,
            date: new Date(post.publishedAt).toISOString(),
        }), 
        ...apps.map((app) => {
            return {
                path: app.path,
                date: new Date(app?.createdAt || Date.now()).toISOString(),
            }
        })),
        ...publicTools.map((tool) => {
            return {
                path: `/toolzen/tools/${tool.slug}`,
                date: new Date(tool?.createdAt || Date.now()).toISOString(),
            }
        }),
    ]);

    // Send the XML to the browser
    return new Response(sitemap, {
        status: 200,
        headers: {
            "Content-Type": "text/xml",
        },
    })

}

