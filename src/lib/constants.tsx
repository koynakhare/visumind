if (!process.env.MONGODB_URI) throw new Error("⚠️ MONGODB_URI is not defined");
if (!process.env.NEXTAUTH_SECRET) throw new Error("⚠️ NEXTAUTH_SECRET is not defined");
if (!process.env.JWT_SECRET) throw new Error("⚠️ JWT_SECRET is not defined");

export const MONGODB_URI = process.env.MONGODB_URI as string;
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;

// Optional: You can add other constants here
export const MAX_UPLOAD_SIZE_MB = 50; 
