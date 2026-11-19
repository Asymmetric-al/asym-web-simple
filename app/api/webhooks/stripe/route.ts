import { NextResponse } from "next/server";

const retired = (): NextResponse =>
  NextResponse.json(
    { ok: false, error: "retired", message: "This endpoint is retired." },
    { status: 410 }
  );

// eslint-disable-next-line sonarjs/function-name -- Next.js route handlers must be named after the HTTP method.
export const POST = (): NextResponse => retired();
