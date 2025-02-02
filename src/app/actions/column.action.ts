/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"; // Ensures all functions in this file run on the server

import { connectDB } from "@/lib/db.config";
import { ColumnModel } from "@/lib/schema/column.schema";
import { TaskModel } from "@/lib/schema/task.schema";

export async function getColumns() {
  try {
    await connectDB();
    const columns = await ColumnModel.find({}).lean(); // Ensures that documents are converted to plain objects
    // console.log("🚀 ~ getColumns ~ columns:", columns);

    const plainColumns = columns.map(({ _id, createdAt, updatedAt, title }) => {
      return {
        _id: String(_id.toString()),
        createdAt: createdAt?.toISOString(),
        updatedAt: updatedAt?.toISOString(),
        title: title,
      };
    });

    return { status: true, data: plainColumns };
  } catch (error: any) {
    return { status: false, message: `${error.message}` };
  }
}

export async function createColumn(title: string) {
  console.log("🚀 ~ createColumn ~ title:", title);
  try {
    await connectDB();
    const newColumn = await ColumnModel.create({ title });
    const plainColumn = {
      _id: (newColumn._id as any).toString(),
      title: newColumn.title,
      createdAt: newColumn.createdAt?.toISOString(),
      updatedAt: newColumn.updatedAt?.toISOString(),
    };
    return { status: true, data: plainColumn };
  } catch (error: any) {
    console.log("🚀 ~ createColumn ~ error:", error);
    return { status: false, message: `${error.message}` };
  }
}

export async function deleteColumn(colId: string) {
  try {
    await connectDB();

    const tasks = await TaskModel.find({ columnId: colId });
    if (tasks.length > 0) {
      return {
        status: false,
        message: "Please Move or delete existing task from this column",
      };
    } else {
      await ColumnModel.deleteOne({ _id: colId });
    }
    return { status: true, message: "Success" };
  } catch (error: any) {
    console.log("🚀 ~ createColumn ~ error:", error);
    return { status: false, message: `${error.message}` };
  }
}

export async function updateColumn(colId: string, title: string) {
  try {
    await connectDB();
    await ColumnModel.updateOne({ _id: colId }, { $set: { title: title } });

    return { status: true, message: `Success` };
  } catch (error: any) {
    
    return { status: false, message: `${error.message}` };
  }
}
