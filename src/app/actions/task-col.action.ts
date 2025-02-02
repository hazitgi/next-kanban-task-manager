import { connectDB } from "@/lib/db.config";
import { ColumnModel } from "@/lib/schema/column.schema";
import { TaskModel } from "@/lib/schema/task.schema";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class ColumnAndTaskAction {
  static async getFullData() {
    try {
      await connectDB();
      const tasks = await ColumnModel.aggregate([
        {
          $lookup: {
            from: TaskModel.collection.name, // Join with the Task collection
            localField: "_id", // Column's _id field
            foreignField: "columnId", // Task's columnId field
            as: "tasks", // Store the joined tasks in the "tasks" array
          },
        },
        {
          $project: {
            _id: 0, // Exclude the default _id field
            column: {
              title: "$title", // Include the column title
              _id: "$_id", // Include the column ID
              createdAt: "$createdAt", // Include the column creation date
              updatedAt: "$updatedAt", // Include the column update date
            },
            tasks: {
              $map: {
                input: "$tasks",
                as: "task",
                in: {
                  _id: "$$task._id",
                  title: "$$task.title",
                  description: "$$task.description",
                  status: "$$task.status",
                  dueDate: "$$task.dueDate",
                  createdAt: "$$task.createdAt",
                  updatedAt: "$$task.updatedAt",
                },
              },
            },
          },
        },
      ]);
      return { status: true, data: tasks };
    } catch (error: any) {
      return { status: false, message: `Error: ${error.message}` };
    }
  }
}
