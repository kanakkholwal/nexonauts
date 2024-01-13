import mongoose from "mongoose";



const MONGODB_URI = process.env.MONGODB_URI


if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable'
    )
}
let newVersion = false;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect(db = "main") {
    if (cached.conn) {
        return cached.conn
    }
    const collectionName = (newVersion ? (process.env.NODE_ENV !== "production" ? "test_":"prod_").concat(db ? db :"main") : "kkupgrader")

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        mongoose.set('strictQuery', false);
        cached.promise = mongoose.connect(MONGODB_URI + collectionName + "?retryWrites=true&w=majority", opts).then(mongoose => {
            console.log("Connected to MongoDB");
            return mongoose
        }).catch(error => console.log(error));
    }
    cached.conn = await cached.promise
    return cached.conn
}


export default dbConnect;