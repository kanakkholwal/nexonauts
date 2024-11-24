import mongoose, { ConnectOptions, Mongoose } from "mongoose";
// import "server-only";

const MONGODB_URI = process.env.MONGODB_URI as string;

declare const global: {
  mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
};

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose || { conn: null, promise: null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
const defaultDb =
  process.env.NODE_ENV === "production" ? "production" : "development";

async function dbConnect(dbName: string = defaultDb): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: ConnectOptions = {
      dbName,
    };

    try {
      mongoose.set("strictQuery", false);
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log("Connected to MongoDB to database:", dbName);
        return mongoose;
      });
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      throw err;
    }
  }

  return cached.conn ? cached.conn : await cached.promise;
}

export default dbConnect;
