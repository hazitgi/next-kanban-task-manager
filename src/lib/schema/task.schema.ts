import mongoose, { Schema, Document, Model, Types } from "mongoose";

// Define an interface for the Task document
export interface ITask extends Document {
  _id?: string;
  title: string;
  description?: string;
  status?: "low" | "medium" | "high";
  columnId: Types.ObjectId;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema
const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["low", "medium", "high"] },
    columnId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Column", // Reference to Column model
    },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

// Define and export the model
export const TaskModel: Model<ITask> =
  mongoose.models?.Task || mongoose.model<ITask>("Task", TaskSchema);
