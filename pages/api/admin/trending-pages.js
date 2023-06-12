import handler from 'lib/handler';
import Page from "models/page";
import dbConnect from "lib/dbConnect";
import { isAdminMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';


export default nextConnect(handler)
    .use(isAdminMiddleware)
    .post(async (req, res) => {
        try {
            const { period, from, to,limit } = req.body;
            let startDate, endDate;

            await dbConnect();
            // Determine the time range based on the provided period or custom dates
            if (period === 'daily') {
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 1);
            } else if (period === 'weekly') {
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 7);
            } else if (period === 'monthly') {
                startDate = new Date();
                startDate.setMonth(startDate.getMonth() - 1);
            } else if (from && to) {
                startDate = new Date(from);
                endDate = new Date(to);
            } else {
                return res.status(400).json({ error: 'Invalid parameters' });
            }

            // Calculate the previous period's start and end dates
            let previousStartDate, previousEndDate;
            if (period) {
                previousStartDate = new Date(startDate);
                previousStartDate.setDate(previousStartDate.getDate() - 1);
                previousEndDate = new Date(startDate);
                previousEndDate.setDate(previousEndDate.getDate() - 1);
            } else {
                previousStartDate = new Date(startDate);
                previousStartDate.setFullYear(previousStartDate.getFullYear() - 1);
                previousEndDate = new Date(previousStartDate);
                previousEndDate.setFullYear(previousEndDate.getFullYear() + 1);
                previousEndDate.setDate(previousEndDate.getDate() - 1);
            }

            const trendingPagesPipeline = [
                {
                    $match: {
                        'analytics.timestamp': {
                            $gte: startDate,
                            $lte: endDate || new Date(),
                        },
                    },
                },
                {
                    $project: {
                        title: 1,
                        slug: 1,
                        type: 1,
                        analytics: {
                            $filter: {
                                input: '$analytics',
                                as: 'action',
                                cond: {
                                    $and: [
                                        { $gte: ['$$action.timestamp', startDate] },
                                        { $lte: ['$$action.timestamp', endDate || new Date()] },
                                    ],
                                },
                            },
                        },
                    },
                },
                {
                    $project: {
                        title: 1,
                        slug: 1,
                        type: 1,
                        analytics: 1,
                        actionCount: { $size: '$analytics' },
                    },
                },
                {
                    $addFields: {
                        previousAnalytics: {
                            $filter: {
                                input: '$analytics',
                                as: 'action',
                                cond: {
                                    $and: [
                                        { $gte: ['$$action.timestamp', previousStartDate] },
                                        { $lte: ['$$action.timestamp', previousEndDate] },
                                    ],
                                },
                            },
                        },
                    },
                },
                {
                    $project: {
                        title: 1,
                        slug: 1,
                        type: 1,
                        analytics: 1,
                        actionCount: 1,
                        previousActionCount: { $size: '$previousAnalytics' },
                        actionCountDiff: { $subtract: ['$actionCount', { $size: '$previousAnalytics' }] },
                    },
                },
                {
                    $sort: { actionCount: -1 },
                },
                {
                  $sort: { actionCount: -1 },
                },
              ];
              
              if (limit) {
                trendingPagesPipeline.push({ $limit: limit });
              }
              
            const trendingPages = await Page.aggregate(trendingPagesPipeline);
        
            res.json({ trendingPages });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message ?? 'Server error' });
        }
    })

