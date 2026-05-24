import { Db, MongoClient } from "mongodb";
import mongoose, { type ConnectOptions, type Mongoose } from "mongoose";
import { env } from "$env/dynamic/private";

declare const global: {
	mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
	mongoClient: {
		client: MongoClient | null;
		promise: Promise<MongoClient> | null;
	};
};

const defaultDb = () => (env.NODE_ENV === "production" ? "production" : "development");

let mongooseCache = global.mongoose;
if (!mongooseCache) {
	mongooseCache = global.mongoose = { conn: null, promise: null };
}

let mongoClientCache = global.mongoClient;
if (!mongoClientCache) {
	mongoClientCache = global.mongoClient = { client: null, promise: null };
}

const mongoOptions: ConnectOptions = {
	retryWrites: true,
	w: "majority",
	appName: "nexonauts"
};

function requireMongoUri(): string {
	const uri = env.MONGODB_URI;
	if (!uri) {
		throw new Error("MONGODB_URI is not set in the environment.");
	}
	return uri;
}

export default async function dbConnect(dbName: string = defaultDb()): Promise<Mongoose> {
	if (mongooseCache.conn) {
		return mongooseCache.conn;
	}

	if (!mongooseCache.promise) {
		const opts: ConnectOptions = { ...mongoOptions, dbName };
		try {
			mongoose.set("strictQuery", false);
			mongooseCache.promise = mongoose.connect(requireMongoUri(), opts).then((m) => {
				console.log("Connected to MongoDB to database:", dbName);
				return m;
			});
		} catch (err) {
			console.error("Error connecting to MongoDB:", err);
			throw err;
		}
	}

	mongooseCache.conn = await mongooseCache.promise;
	return mongooseCache.conn;
}

async function getMongoClient(
	dbName: string = defaultDb()
): Promise<{ client: MongoClient; db: Db }> {
	if (mongoClientCache.client) {
		return {
			client: mongoClientCache.client,
			db: mongoClientCache.client.db(dbName)
		};
	}

	if (!mongoClientCache.promise) {
		try {
			const c = new MongoClient(requireMongoUri(), mongoOptions);
			mongoClientCache.promise = c.connect().then((connected) => {
				console.log("Connected to MongoDB via native client");
				return connected;
			});
		} catch (err) {
			console.error("Native client connection error:", err);
			throw err;
		}
	}

	mongoClientCache.client = await mongoClientCache.promise;
	return {
		client: mongoClientCache.client,
		db: mongoClientCache.client.db(dbName)
	};
}

export { dbConnect, getMongoClient };

let _client: MongoClient | null = null;
function getClient(): MongoClient {
	if (_client) return _client;
	_client = new MongoClient(requireMongoUri(), mongoOptions);
	return _client;
}

export const client: MongoClient = new Proxy({} as MongoClient, {
	get(_target, prop, receiver) {
		const c = getClient();
		const value = Reflect.get(c, prop, receiver);
		return typeof value === "function" ? value.bind(c) : value;
	}
});

export const db: Db = new Proxy({} as Db, {
	get(_target, prop, receiver) {
		const value = Reflect.get(getClient().db(defaultDb()), prop, receiver);
		return typeof value === "function" ? value.bind(getClient().db(defaultDb())) : value;
	}
});
