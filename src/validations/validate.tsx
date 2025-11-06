import { ZodSchema, ZodError } from "zod";

export async function validateRequest<T>(
  data: unknown,
  schema: ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const result = schema.safeParse(data);

    if (!result.success) {
      const error = result.error as ZodError;
      const firstError = error.issues?.[0]?.message || "Invalid input";
      return { success: false, error: firstError };
    }

    return { success: true, data: result.data };
  } catch (err) {
    return { success: false, error: "Invalid input" };
  }
}
