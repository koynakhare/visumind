import { NextResponse } from "next/server";

type SuccessOptions =
  | { message: string } // Custom message
  | { action: "created" | "fetched" | "updated" | "deleted"; model: string }; // Auto message

export function successResponse(
  data: any,
  options: SuccessOptions,
  status = 200
) {
  let message: string;

  if ("message" in options) {
    message = options.message;
  } else {
    // Capitalize first letter of model name
    const model = options.model.charAt(0).toUpperCase() + options.model.slice(1);
    message = `${model} ${options.action} successfully`;
  }

  return NextResponse.json({ success: true, message, data }, { status });
}

export function errorResponse(message = "Something went wrong", status = 500) {
  return NextResponse.json({ success: false, error: message }, { status });
}
