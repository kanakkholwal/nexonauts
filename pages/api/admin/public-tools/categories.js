import handler from 'lib/handler';
import {Category} from "models/public-tool";
import dbConnect from "lib/dbConnect";

import nextConnect from 'next-connect';

export default nextConnect(handler)
    .get(async (req, res) => {
    try {
        await dbConnect();
        const categories = await Category.find({});
        return res.status(200).json({ categories });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message || "Something went wrong" });
    }
})
.post(async (req, res) => {
    try{
        await dbConnect();
        const {name,slug} = req.body;
        const category = await Category.create({name,slug});
        return res.status(200).json({ message: "Category added successfully" ,category});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: error.message || "Something went wrong" });
    }
})