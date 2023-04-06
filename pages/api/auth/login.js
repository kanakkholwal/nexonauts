import dbConnect from "lib/dbConnect";
import User from "models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import handler from 'lib/handler';
import nextConnect from 'next-connect';


export default nextConnect(handler).post(checkUser)

async function checkUser(req, res) {




    try {
        await dbConnect();
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: 'Email is not registered',
            })
        }

        if (!bcrypt.compareSync(password, user.password))
            return res.status(401).json({
                message: 'Authentication failed',
            })

        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id,
            }
        );

        return res.status(200).json({
            token,
            _id: user._id,
            message: "Login success"
        });



    } catch (error) {
        return res.status(401).json({
            message: 'Authentication failed',
        })
    }

}

