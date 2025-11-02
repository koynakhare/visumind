import { z } from "zod";

export const addProjectSchema = z.object({
  name: z.string().min(1, "Name is required"), // `name` is required and must be non-empty
  description: z.string().optional(),
  files: z.array(z.any()).optional(), // Adjust based on your file structure
});
