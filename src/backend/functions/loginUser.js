import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const handler = async (req, res) => {


    if (req.method === "POST") {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            const User = {
                username: req.body.username,
                password: hashedPass,
            }
            const client = await MongoClient.connect(
                `${process.env.DATABASE_URL}`
            );
            const db = client.db();
            const userCollection = db.collection("users");

            const user = await userCollection.findOne({ username: req.body.username });
            !user && res.status(400).json("Wrong credentials!");

            const validated = await bcrypt.compare(req.body.password, user.password);
            !validated && res.status(400).json("Wrong credentials!");

            client.close();
            const { password, ...others } = user._doc;
            res.status(200).json(others);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
};

export default handler;