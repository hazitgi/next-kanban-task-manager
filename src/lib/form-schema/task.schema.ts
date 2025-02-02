//  title: string;
//   description?: string;
//   status?: "low" | "medium" | "high";
//   columnId: Types.ObjectId;

import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(2).max(22),
  description: z.string().min(5),
  status: z.enum(["low", "medium", "high"]),
  columnId: z.string(),
});
