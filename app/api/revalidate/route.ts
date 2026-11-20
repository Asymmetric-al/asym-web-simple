import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isBufferEqual = (a: string, b: string): boolean => {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
};

const isTokenEqual = (a: string, b: string): boolean => {
  try {
    return isBufferEqual(a, b);
  } catch {
    return false;
  }
};

// eslint-disable-next-line sonarjs/function-name -- Next.js route handlers must be named after the HTTP method.
export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const expectedSecret = process.env.REVALIDATION_SECRET?.trim();
  if (!expectedSecret) {
    return NextResponse.json(
      { error: "Revalidation is not configured." },
      { status: 503 }
    );
  }

  const authHeader = request.headers.get("authorization") ?? "";
  const expectedToken = `Bearer ${expectedSecret}`;

  if (!isTokenEqual(authHeader, expectedToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { tag, path } = body as { tag?: string; path?: string };

  if (tag) {
    revalidateTag(tag, "default");
    return NextResponse.json({ revalidated: true, tag });
  }

  if (path) {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  }

  return NextResponse.json(
    { error: "Provide either tag or path in the request body." },
    { status: 422 }
  );
};
