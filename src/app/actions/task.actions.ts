/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { connectDB } from "@/lib/db.config";
import { ColumnModel } from "@/lib/schema/column.schema";
import { ITask, TaskModel } from "@/lib/schema/task.schema";
import { startOfDay, subDays, subMonths } from "date-fns";
import mongoose from "mongoose";
// Helper function to convert MongoDB document to plain object
const toPlainObject = (doc: any) => {
  if (!doc) return null;
  return {
    _id: doc._id.toString(),
    title: doc.title,
    description: doc.description,
    status: doc.status,
    columnId: doc.columnId?.toString(),
    column: doc.column
      ? {
          _id: doc.column._id.toString(),
          title: doc.column.title,
          createdAt: doc.column.createdAt?.toISOString(),
          updatedAt: doc.column.updatedAt?.toISOString(),
        }
      : undefined,
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
  };
};

export async function createTask(payload: ITask) {
  try {
    await connectDB();
    const newTask = await TaskModel.create({
      ...payload,
      columnId: new mongoose.Types.ObjectId(String(payload.columnId)!),
    });

    return {
      status: true,
      message: "Success",
      task: toPlainObject(newTask),
    };
  } catch (error: any) {
    return { status: false, message: error.message };
  }
}

export async function updateTask(taskId: string, payload: Task) {
  console.log("🚀 ~ updateTask ~ payload:", payload);
  console.log("🚀 ~ updateTask ~ taskId:", taskId);
  try {
    await connectDB();
    const updatedTask = await TaskModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(taskId),
      },
      {
        $set: {
          ...payload,
          columnId: new mongoose.Types.ObjectId(String(payload.columnId)),
        },
      },
      { new: true }
    );

    return {
      status: true,
      message: "Success",
      task: toPlainObject(updatedTask),
    };
  } catch (error: any) {
    return { status: false, message: error.message };
  }
}

export async function deleteTask(taskId: string) {
  try {
    await connectDB();
    await TaskModel.deleteOne({
      _id: new mongoose.Types.ObjectId(taskId),
    });
    return { status: true, message: "Success" };
  } catch (error: any) {
    return { status: false, message: error.message };
  }
}

export async function getAllTasks(
  searchQuery: string,
  date?: "alltime" | "today" | "lastmonth" | "lastweek"
) {
  try {
    await connectDB();

    const matchConditions: any = {
      $or: [
        { title: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search in title
        { description: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search in description
      ],
    };

    // Apply date filtering if a date filter is provided
    if (date && date !== "alltime") {
      let startDate: Date | null = null;

      switch (date) {
        case "today":
          startDate = startOfDay(new Date());
          break;
        case "lastweek":
          startDate = subDays(new Date(), 7);
          break;
        case "lastmonth":
          startDate = subMonths(new Date(), 1);
          break;
      }

      if (startDate) {
        matchConditions.createdAt = { $gte: startDate };
      }
    }

    const tasks = await TaskModel.aggregate([
      { $match: matchConditions },
      {
        $lookup: {
          from: ColumnModel.collection.name,
          localField: "columnId",
          foreignField: "_id",
          as: "column",
        },
      },
      { $unwind: "$column" },
    ]).exec();

    const plainTasks = tasks.map((task) => ({
      _id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      columnId: task.columnId.toString(),
      column: {
        _id: task.column._id.toString(),
        title: task.column.title,
        createdAt: task.column.createdAt?.toISOString(),
        updatedAt: task.column.updatedAt?.toISOString(),
      },
      createdAt: task.createdAt?.toISOString(),
      updatedAt: task.updatedAt?.toISOString(),
    }));

    return { status: true, data: plainTasks };
  } catch (error: any) {
    return { status: false, message: error.message };
  }
}
