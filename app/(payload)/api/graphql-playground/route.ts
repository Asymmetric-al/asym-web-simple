import "@payloadcms/next/css";
import { GRAPHQL_PLAYGROUND_GET } from "@payloadcms/next/routes";
import { connection, NextResponse } from "next/server";
import config from "@payload-config";
import type { NextRequest } from "next/server";

const isPayloadConfigured = (): boolean =>
  Boolean(process.env.DATABASE_URI?.trim() && process.env.PAYLOAD_SECRET?.trim());

const getHandler = GRAPHQL_PLAYGROUND_GET(config);

export const GET = async (request: NextRequest) => {
  await connection();
  return isPayloadConfigured()
    ? getHandler(request)
    : NextResponse.json(
        { error: "GraphQL playground is not configured." },
        { status: 503 }
      );
};
