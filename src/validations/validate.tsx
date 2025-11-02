import { ZodSchema } from "zod";
import { NextRequest } from "next/server";

export async function validateRequest<T>(
  data: unknown,
  schema: ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const result = schema.safeParse(data);

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || "Invalid input";
      return { success: false, error: firstError };
    }

    return { success: true, data: result.data };
  } catch (err) {
    return { success: false, error: "Invalid input" };
  }
}

