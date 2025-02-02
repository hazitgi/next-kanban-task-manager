/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"; // Ensures all functions in this file run on the server

import { connectDB } from "@/lib/db.config";
import { ColumnModel } from "@/lib/schema/column.schema";

export async function getColumns() {
  try {
    await connectDB();
    const columns = await ColumnModel.find({});
    return { status: true, data: columns };
  } catch (error: any) {
    return { status: false, message: `${error.message}` };
  }
}

export async function createColumn(title: string) {
  console.log("🚀 ~ createColumn ~ title:", title);
  try {
    await connectDB();
    const newColumn = await ColumnModel.create({ title });
    return { status: true, data: newColumn };
  } catch (error: any) {
    console.log("🚀 ~ createColumn ~ error:", error);
    return { status: false, message: `${error.message}` };
  }
}
