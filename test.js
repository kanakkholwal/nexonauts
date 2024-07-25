
const fs = require("fs");

async function scrapeAndSaveTools() {
    const apiUrl = "https://www.futurepedia.io/api/search";
    let page = 0;
    const pageSize = 12; // Adjust if different
    let totalCount = 5733; // Set the initial total count
    const allTools = [];

    while (page * pageSize < totalCount) {
        const body = JSON.stringify({
            sort: "featured",
            feature: [],
            pricing: [],
            q: "",
            page: page,
        });

        try {
            const response = await fetch(apiUrl, {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "accept-language": "en,en-US;q=0.9",
                    "content-type": "application/json",
                },
                referrer: "https://www.futurepedia.io/",
                referrerPolicy: "strict-origin-when-cross-origin",
                body: body,
                method: "POST",
                mode: "cors",
                credentials: "include",
            });

            const data = await response.json();
            totalCount = data.count;
            console.log(`Scraping page ${page + 1} of ${Math.ceil(totalCount / pageSize)}`);
            console.log(allTools.length);
            for (const tool of data.data) {
                const toolData = {
                    name: tool.toolName,
                    coverImage: tool.thumbnailUrl || "https://via.placeholder.com/150",
                    bannerImage: tool.mainImage?.asset?._ref || "https://via.placeholder.com/920",
                    description: tool.toolShortDescription,
                    categories: tool.toolCategories.map((cat) => ({
                        name: cat.categoryName,
                        slug: cat.slug.current,
                    })),
                    tags: tool.tagsIndex,
                    link: tool.websiteUrl,
                    slug: tool.slug.current,
                    status: "published", // Assuming all scraped tools are published
                    pricing_type: tool.pricing[0]?.toLowerCase() || "other",
                    verified: tool.verified,
                    //   author: new Types.ObjectId(), // Replace with the appropriate author ID
                };

                allTools.push(toolData);

            }

            page++;
        } catch (error) {
            console.error(`Error on page ${page}:`, error);
            break;
        }
    }
    fs.writeFileSync("data.json", JSON.stringify(allTools));

    console.log("Scraping and saving completed.");
}

scrapeAndSaveTools().catch((error) => console.error("Error in scraping process:", error));
