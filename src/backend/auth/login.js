import clientPromise from "@libs/mongodb";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


export default async function handler(req, res) {

    const client = await clientPromise;
    const db = await client.db("kkupgrader");
    const collection = await db.collection('users');

    const { method } = req;
    const { email, password } = req.body;

    try {

        if (method === "POST") {

            // Validate user input
            if (!(email && password)) {
                res.status(400).send("All input is required");
            }
            // Validate if user exist in our database

            const user = await collection.find({ email: email });
            console.log(user);
            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: process.env.AUTH_EXPIRE_DURATION,
                    }
                );

                // save user token
                user.token = token;

                // user
                res.status(200).json(user);
            }
            res.status(400).send("Invalid Credentials");
        }
        else {
            res.status(405).send({ message: 'Only POST requests allowed' })
        }
    }
    catch (err) {
        console.log(err);
        res.status(405).send({ message: `${err.message}` })
    }
}