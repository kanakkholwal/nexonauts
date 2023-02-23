import clientPromise from "@libs/mongodb";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


export default async function handler(req, res) {


    const { method } = req;
    const { FirstName, LastName, email, password } = req.body;
    const client = await clientPromise;

    if (client)
        console.log("connection established")
    try {
        const db = await client.db("kkupgrader");
        const users = await db.collection('users');

        if (method === "POST") {


            if (!(email && email.includes('@') && password && FirstName && LastName)) {
                res.status(400).send("All input is required");
            }
            const oldUser = await users.find({ email: email });


            if (oldUser) {
                client.close();
                return res.status(409).send("User Already Exist. Please Login");
            }
            const encryptedPassword = await bcrypt.hash(password, 10);


            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: process.env.AUTH_EXPIRE_DURATION,
                }
            );
            const newUser = {
                FirstName, LastName, email, password: encryptedPassword, token
            }
            await users.insertOne(newUser);
            client.close()
            res.status(201).json(newUser);
        }
    }
    catch (err) {
        client.close();

        console.log(err);
    }
}