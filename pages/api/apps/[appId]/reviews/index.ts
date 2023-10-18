import { checkUser } from 'lib/checkUser';
import dbConnect from "lib/dbConnect";
import handler from 'lib/handler';
import App, { Review } from "models/app";
import User from "models/user";
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

export default nextConnect(handler)
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await dbConnect();
            const { appId, page = '1', limit = '10' } = req.query as {
                appId: string;
                page: string;
                limit: string;
            };

            const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

            // console.log({ appId, page, limit, skip });
            // Find app by ID
            const reviews = await Review.find({ appId })
                .populate('userId', 'name username profileURL')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit, 10));

            // Return application
            return res.status(200).json({
                message: "Reviews fetched successfully",
                result: reviews,
                success: true,
            });

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await dbConnect();
            const { userId } = req.body;
            const existingUser = await User.findById(userId);
            if (!existingUser) {
                return res.status(404).json({ message: 'User not found!' });
            }

            const result = await checkUser(req, existingUser);
            if (!result.verified) {
                return res.status(401).json({ verified: result.verified, message: result.message });
            }
            // user is verified
            const { appId, rating, review } = req.body;
            // find app by id
            const currentApp = await App.findById(appId);
            if (!currentApp) {
                return res.status(403).json({ message: `App not found!` });
            }
            // check if user has already reviewed this app
            const existingReview = await Review.findOne({ appId, userId });
            if (existingReview) {
                return res.status(403).json({ message: `You have already reviewed this app!` });
            }
            // create new review
            const newReview = new Review({
                appId,
                userId,
                rating,
                review,
                createdAt: new Date(),
            });
            if (!newReview) {
                return res.status(403).json({ message: `Review could not be created!` });
            }
            // save review
            await newReview.save();
            return res.status(200).json({ success: true, result: newReview, message: "Review created successfully" });

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })
