
import dbConnect from "lib/dbConnect";
import handler from 'lib/handler';
import { hasTokenMiddleware } from 'middleware/checkUser';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import Product from 'src/models/product';
import User from 'src/models/user';

export default nextConnect(handler)
    .use(hasTokenMiddleware)
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await dbConnect();

            const {
                title,
                short_description,
                description,
                price,
                product_type,
                category,
                coverImage,
                creator
            } = req.body;
            const isCreator = await User.findById(creator.userId);
            if (!isCreator) {
                return res.status(404).json({ success: false, message: "Creator not found" });
            }
            const product = new Product({
                title,
                short_description,
                description,
                price,
                product_type,
                category,
                coverImage,
                creator
            });
            await product.save();
            return res.status(200).json({ success: true, message: "Product created successfully", product });



        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })