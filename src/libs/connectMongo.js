import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URL
const MONGODB_DB = process.env.MONGODB_DB

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env'
    )
}

if (!MONGODB_DB) {
    throw new Error(
        'Please define the MONGODB_DB environment variable inside .env'
    )
}

const connectMongo = async (db) => mongoose.connect(MONGODB_URI + "/" + db ?? MONGODB_DB);

export default connectMongo;