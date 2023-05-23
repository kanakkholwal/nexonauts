import handler from 'lib/handler';
import Page from "models/page";
import dbConnect from "lib/dbConnect";

import nextConnect from 'next-connect';


export default nextConnect(handler)
    .post(async (req, res, next) => {
        try {
            await dbConnect();
            const { slug,name, type, increase } = req.body;
            if (!slug || !type) {
                return res.status(400).json({ error: "Missing slug or type" });
            }
            let page = await Page.findOne({ slug, type });
            if (!page) {
                page = new Page({ slug,name, type });
            }
            if (increase.includes("view"))
                page.views++;
            if (increase.includes("share"))
                page.shares++;

            await page.save();

            return res.status(200).json({ message: "View updated successfully", page });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error", message: error.message });
        }
    }).get(async (req, res, next) => {
        try{
            await dbConnect();
            const { slug, type } = req.query;
            if (!slug || !type) {
                return res.status(400).json({ error: "Missing slug or type" });
            }
            const page = await Page.findOne({ slug, type });
            if (!page) {
                return res.status(404).json({ error: "Page not found" });
            }
            
            return res.status(200).json({ message: "Page fetched successfully", page });


        }
        catch(error){
            console.log(error);
            return res.status(500).json({ error: "Internal server error", message: error.message });
        }

    });

