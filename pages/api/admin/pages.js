import handler from 'lib/handler';
import Page from "models/page";
import dbConnect from "lib/dbConnect";
import { isAdminMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';


export default nextConnect(handler).use(isAdminMiddleware)
    .post(async (req, res, next) => {
        try {
            await dbConnect();
            // get all pages from db in paginated way and sorted by type
            const { page, limit, type } = req.body;
            const options = {
                page: page || 1,
                limit: limit || 10,
                sort: { type: 1 },
                collation: {
                    locale: 'en',
                },
            };
            const pages = await Page.paginate({}, options);
            pages.docs.forEach(page => {
                page.type = page.type.toLowerCase();
            });
            pages.docs.sort((a, b) => {
                if (a.type < b.type) return -1;
                if (a.type > b.type) return 1;
                return 0;
            });
            pages.docs = pages.docs.slice(0, limit);
            pages.total = pages.docs.length;
            pages.pages = pages.docs.map(page => {
                return {
                    slug: page.slug,
                    type: page.type,
                    views: page.views,
                    shares: page.shares,
                }
            });
            pages.message = "Pages fetched successfully";
            return res.status(200).json(pages);





        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error", message: error.message });
        }
    })

