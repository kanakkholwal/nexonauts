import dbConnect from "lib/dbConnect";
import Post from "models/Post";

const URL = process.env.WEBSITE_URL || "https://kkupgrader.eu.org";

// This function will generate the robots.txt
function generateSiteMap(pages) {
    return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
       <!-- Add the static URLs manually -->
       ${pages
         .map((page) => {
           return `
             <url>
                 <loc>${URL + page.path}</loc>
                <lastmod>${page.date}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
             </url>
           `;
         })
         .join("")}
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
      date: post.publishedAt,
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
