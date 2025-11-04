import { z } from "zod";

export const addProjectSchema = z.object({
  name: z.string().min(1, "Name is required"), // `name` is required and must be non-empty
  description: z.string().optional(),
  newFiles: z.array(z.any()).optional(), // Adjust based on your file structure
  oldFiles: z.array(z.string()).optional(),
});
