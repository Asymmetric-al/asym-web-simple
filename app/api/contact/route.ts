import { NextResponse } from "next/server";

// eslint-disable-next-line sonarjs/function-name -- Next.js route handlers must be named after the HTTP method.
export const POST = (): NextResponse =>
  NextResponse.json(
    {
      ok: false,
      error: "retired",
      message: "This endpoint is retired. Use /api/early-access instead.",
    },
    { status: 410 }
  );
