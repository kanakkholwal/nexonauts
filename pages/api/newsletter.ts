import dbConnect from "lib/dbConnect";
import handler from 'lib/handler';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

export default nextConnect(handler)
    .post(async (req: NextApiRequest, res: NextApiResponse,next) => {
        try{
            await dbConnect();

            const {email,type} = req.body as {
                email:string,
                type?:string
            }
            console.log(email,type);

            return res.status(200).json({
                success:true,
                message:"Successfully registered for Newsletter"
            })
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })
