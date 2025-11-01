import mongoose from "mongoose";
import { MONGODB_URI } from "./constants";

// Type declaration for global cached object
declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Use global cache to prevent multiple connections in dev
const cached = global.mongooseCache || (global.mongooseCache = { conn: null, promise: null });

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

let gfsBucket;


export async function getGfs() {
if (gfsBucket) return gfsBucket;
const client = new MongoClient(MONGODB_URI);
await client.connect();
const dbName = MONGODB_URI.split("/").pop();
const db = client.db(dbName);
gfsBucket = new GridFSBucket(db, { bucketName: "uploads" });
return gfsBucket;
}
