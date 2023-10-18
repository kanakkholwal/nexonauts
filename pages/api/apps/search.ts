import dbConnect from "lib/dbConnect";
import handler from 'lib/handler';
import App from "models/app";
import nextConnect from 'next-connect';

export default nextConnect(handler)
    // .use(hasTokenMiddleware)
    .get(async (req, res) => {
        try {
            await dbConnect();
            const { query = '', page = '1', limit = '10' } = req.query as {
                page: string;
                limit: string;
                query: string;
            }

            const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

            const QUERY = {
                $or: [
                    { name: { $regex: new RegExp(query, 'i') } },
                    { shortDescription: { $regex: new RegExp(query, 'i') } },
                    { tags: { $regex: new RegExp(query, 'i') } },
                    { category: { $regex: new RegExp(query, 'i') } },
                ],
            }

            const apps = await App.find(QUERY).sort({createdAt:-1}) 
                .select('name shortDescription appId type path coverImage recommended version ratings membership category tags author createdAt averageRating')
                .skip(skip)
                .limit(parseInt(limit, 10));

            // Count the total number of matching apps for pagination
            const totalApps = await App.countDocuments(QUERY);

            // Return the search results
            return res.status(200).json({
                message: "Apps fetched successfully",
                result: apps,
                total: totalApps,
                success: true,
            });




        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })