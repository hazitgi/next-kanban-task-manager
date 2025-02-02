/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
// type E = any;
import { connectDB } from "@/lib/db.config";
import { ColumnModel } from "@/lib/schema/column.schema";
import { ITask, TaskModel } from "@/lib/schema/task.schema";
import mongoose from "mongoose";
// import { revalidatePath } from "next/cache";

export async function createTask(payload: ITask) {
  console.log("🚀 ~ createTask ~ payload:", payload);
  try {
    await connectDB();

    const newTask = new TaskModel({
      ...payload,
      columnId: new mongoose.Types.ObjectId(String(payload.columnId)!),
    });
    await newTask.save();
    //   revalidatePath("/");
    return { status: true, message: "Success", task: newTask };
  } catch (error: any) {
    return { status: false, message: `${error.message}` };
  }
}

//    updating tasks
export async function updateTask(taskId: string, payload: ITask) {
  try {
    await connectDB();
    await TaskModel.updateOne(
      {
        _id: new mongoose.Types.ObjectId(taskId),
      },
      {
        $set: {
          ...payload,
          columnId: new mongoose.Types.ObjectId(String(payload.columnId)),
        },
      }
    );
    return { stats: true, message: "Success" };
  } catch (error: any) {
    return { status: false, message: `${error.message}` };
  }
}

// deleting tasks
export async function deleteTask(taskId: string) {
  try {
    await connectDB();
    await TaskModel.deleteOne({
      _id: new mongoose.Types.ObjectId(taskId),
    });
    return { status: true, message: "Success" };
  } catch (error: any) {
    return { status: false, message: `${error.message}` };
  }
}

//   get all tasks
export async function getAllTasks() {
  try {
    await connectDB();
    const tasks = await TaskModel.aggregate([
      {
        $lookup: {
          from: ColumnModel.collection.name,
          localField: "columnId",
          foreignField: "_id",
          as: "column",
        },
      },
      {
        $unwind: "$column",
      },
    ]);
    return { status: true, data: tasks };
  } catch (error: any) {
    return { status: false, message: `${error.message}` };
  }
}
