import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface for the document
export interface IColumn extends Document {
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema
const ColumnSchema = new Schema<IColumn>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Define and export the model
export const ColumnModel: Model<IColumn> =
  mongoose.models?.Column || mongoose.model<IColumn>("Column", ColumnSchema);
