import handler from 'lib/handler';
import dbConnect from "lib/dbConnect";
import { hasTokenMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';
import App from "models/app";
import type { App as AppType } from "types/app";

export default nextConnect(handler)
    // .use(hasTokenMiddleware)
    .get(async (req, res) => {
        try {
            await dbConnect();
            const { query, page, limit } = req.query;

            // Pagination configuration
            const pageNumber = parseInt(page) || 1;
            const pageSize = parseInt(limit) || 10;
            const skip = (pageNumber - 1) * pageSize;



            // Build the search query
            const searchQuery = {
                $or: [
                  { name: { $regex: query, $options: 'i' } },
                  { description: { $regex: query, $options: 'i' } },
                  { shortDescription: { $regex: query, $options: 'i' } },
                  { category: { $regex: query, $options: 'i' } },
                  { type: { $regex: query, $options: 'i' } },
                  { keywords: { $in: [query] } },
                  { tags: { $in: [query] } },
                ],
              };

            // Perform the search with pagination and sorting
            const apps = await App.find(searchQuery)
                .select('name shortDescription appId type path coverImage recommended version ratings membership category tags author createdAt averageRating')  
                .skip(skip)
                .limit(pageSize);

            // Count total matching documents for pagination
            const total = await App.countDocuments(searchQuery);

            res.json({
                success: true,
                apps,
                pagination: {
                    currentPage: pageNumber,
                    pageSize: pageSize,
                    totalPages: Math.ceil(total / pageSize),
                    totalItems: total,
                },
            });



        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })