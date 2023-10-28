import dbConnect from "lib/dbConnect";
import Post from "models/post";

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
export async function getServerSideProps({ res }) {
    // const posts = getSortedPostsData();
  
    await dbConnect();
    const posts = await Post.find({
        state: "published",
    }).sort({ publishedAt: -1 })
    .select("slug publishedAt")
    .exec()
    const manualRoutes = [{
        path: "/",
        date: new Date().toISOString(),
    },
    {
        path: "/apps",
        date: new Date().toISOString(),
    },
    {
        path: "/blog",
        date: new Date().toISOString(),
    },
    ]
    // Generate the XML sitemap with the blog data
    const sitemap = generateSiteMap([...manualRoutes,...posts.map((post) => ({
      path: `/blog/posts/${post.slug}`,
      date: new Date(post.publishedAt).toISOString(),
  }))]);
  
    res.setHeader("Content-Type", "text/xml");
    // Send the XML to the browser
    res.write(sitemap);
    res.end();
  
    return {
      props: {},
    };
  }
  
export default function SiteMap() {}
