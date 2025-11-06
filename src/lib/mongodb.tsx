import mongoose from "mongoose";
import { MONGODB_URI } from "./constants";
import { MongoClient, GridFSBucket } from "mongodb"; // ✅ import both

// Type declaration for global cached object
declare global {
  // Prevent TypeScript from complaining about redeclarations
  // (it merges into NodeJS.GlobalThis)
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// ✅ Global connection cache for Mongoose (important for dev hot reloads)
const cached = global.mongooseCache || (global.mongooseCache = { conn: null, promise: null });

export default async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// ✅ Properly typed GridFSBucket instance (can be null before initialization)
let gfsBucket: GridFSBucket | null = null;

export async function getGfs(): Promise<GridFSBucket> {
  if (gfsBucket) return gfsBucket;

  const client = new MongoClient(MONGODB_URI);
  await client.connect();

  // Extract the database name from the URI (e.g., "mongodb+srv://.../mydb" → "mydb")
  const dbName = MONGODB_URI.split("/").pop();
  if (!dbName) throw new Error("Invalid MONGODB_URI: missing database name.");

  const db = client.db(dbName);

  // ✅ Create and cache GridFS bucket instance
  gfsBucket = new GridFSBucket(db, { bucketName: "uploads" });
  return gfsBucket;
}
