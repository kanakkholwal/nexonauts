import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
// import User from "../models/user";

const handler = async (req, res) => {


    if (req.method === "POST") {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            const newUser = {
                username: req.body.username,
                name: req.body.name,
                email: req.body.email,
                password: hashedPass,
            }
            const client = await MongoClient.connect(
                `${process.env.DATABASE_URL}`
            );
            const db = client.db();
            const userCollection = db.collection("users");
            await userCollection.insertOne(newUser);

            client.close();

            res.status(201).send({ Message: newUser });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
};

export default handler;