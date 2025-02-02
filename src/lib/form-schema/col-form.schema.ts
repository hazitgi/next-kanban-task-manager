import { z } from "zod";
export const colForm = z.object({
  title: z.string().min(2).max(22),
});
