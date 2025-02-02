/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import * as mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017";
// if (!MONGODB_URI) {
//   throw new Error("Missing MONGODB_URI environment variable");
// }

// const cached = (global as any).mongoose || { conn: null, promise: null };

// export async function connectDB() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(MONGODB_URI!, {
//         dbName: "Kanban_task",
//         bufferCommands: false,
//       })
//       .then((mongoose) => {
//         console.log("Connected to db");
//         return mongoose;
//       });
//     cached.conn = await cached.promise;

//     return cached.conn;
//   }
// }
"use server";
import * as mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://localhost:27017/kanban_task";

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI environment variable");
}

const cached: any = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("✅ Connected to MongoDB");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
