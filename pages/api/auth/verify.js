// pages/api/auth/verify.js
import handler from 'lib/handler';

import dbConnect from "lib/dbConnect";
import User from "models/user";
import nextConnect from 'next-connect';


export default nextConnect(handler)
    .get(async (req, res, next) => {
        try {
            await dbConnect();
            const { token } = req.query;

            if (!token) {
                return res.status(400).json({ message: 'Invalid verification token' });
            }

            await dbConnect();

            const user = await User.findOne({ verificationToken: token });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update user status as verified
            await User.updateOne(
                { _id: user._id },
                { $set: { verified: true, verificationToken: null } }
            );

            return res.status(200).json({ message: 'User verified successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error", message: error.message });
        }
    })


