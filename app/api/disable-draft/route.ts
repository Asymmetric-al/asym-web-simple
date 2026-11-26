import { draftMode } from "next/headers";
import { connection, NextResponse } from "next/server";

// eslint-disable-next-line sonarjs/function-name -- Next.js route handlers must be named after the HTTP method.
export const GET = async (): Promise<NextResponse> => {
  await connection();
  const expectedSecret = process.env.PAYLOAD_DRAFT_SECRET?.trim();
  if (!expectedSecret) {
    return NextResponse.json(
      { error: "Draft mode is not configured." },
      { status: 503 }
    );
  }

  const draft = await draftMode();
  draft.disable();

  return new NextResponse(null, {
    status: 303,
    headers: { Location: "/" },
  });
};
