import handler from 'lib/handler';
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
// import { hasSsrMiddleware } from 'middleware/checkUser';
import PublicTool from 'models/public-tool';


const origin = process.env.NODE_ENV === 'production' ? process.env.WEBSITE_URL : 'http://localhost:3000'
if(!origin) throw new Error("WEBSITE_URL is not defined in .env.local");

export default nextConnect(handler)
    .post(async (req: NextApiRequest, res: NextApiResponse,next) => {
        try{

            res.setHeader('Access-Control-Allow-Origin', origin);

            await dbConnect();
            
     
            const query = req.query.query as string;
            const page = req.query.page as string;
            const limit = req.query.limit as string;

            // Pagination configuration
            const pageNumber = parseInt(page) || 1;
            const pageSize = parseInt(limit) || 10;
            const skip = (pageNumber - 1) * pageSize;



            // Build the search query
            const searchQuery = {
                $or: [
                  { name: { $regex: query, $options: 'i' } },
                  { description: { $regex: query, $options: 'i' } },
                  { category: { $regex: query, $options: 'i' } },
                  { tags: { $in: [query] } },
                ],
               
              };

            // Perform the search with pagination and sorting
            const tools = await PublicTool.find(searchQuery)
                .skip(skip)
                .limit(pageSize);

            // Count total matching documents for pagination
            const total = await PublicTool.countDocuments(searchQuery, {status:"published"});

           return  res.json({
                success: true,
                message: "Tools fetched successfully",
                tools,
                categories: [],
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
 
