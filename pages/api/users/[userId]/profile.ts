import handler from 'lib/handler';
import User from "models/user";
import Page from "models/page";
import App from "models/app";
import {Comment}  from "models/post";
import dbConnect from "lib/dbConnect";
import { hasSsrMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';

export default nextConnect(handler)
    .get(async (req, res, next) => {
        try {
            await hasSsrMiddleware(req, res, next);
            await dbConnect();

            const { userId: username } = req.query;
            const user = await User.findOne({ username: username });

            if (!user) {
                return res.status(404).json({ message: 'User not found!', success: false });
            }
            // find pages where userId is in the array of analytics
            const userId = user._id.toString();
            const pages = await Page.find({}).populate('analytics');

     

            const userApps = await App.aggregate([
              { $match: {} },
              {
                $project: {
                  usage: {
                    $filter: {
                      input: "$usage",
                      as: "usageItem",
                      cond: { $eq: ["$$usageItem.userId", userId] }
                    }
                  }
                }
              },
              {
                $project: {
                  _id: 0,
                  userApps: "$usage"
                }
              }
            ]);
            
            const userReviews = await App.aggregate([
              { $match: {} },
              {
                $project: {
                  review: {
                    $filter: {
                      input: "$review",
                      as: "reviewItem",
                      cond: { $eq: ["$$reviewItem.userId", userId] }
                    }
                  }
                }
              },
              {
                $project: {
                  _id: 0,
                  userReviews: "$review"
                }
              }
            ]);
            
            const userComments = await Comment.find({ userId: userId });





            return res.status(200).json({ message: 'User fetched successfully!', success: true, user: {
                ...user._doc,
                appsUsage: userApps.length,
                reviews: userReviews.length,
                comments: userComments.length,
            } });
        } catch (err) {
            console.log(err);
            return res.status(401).json({
                message: err.message || "Something went wrong", 
                success: false
            });
        }
    })