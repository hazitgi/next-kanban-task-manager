/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI environment variable");
}

const cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!, {
        dbName: "Kanban_task",
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("Connected to db");
        return mongoose;
      });
    cached.conn = await cached.promise;

    return cached.conn;
  }
}
