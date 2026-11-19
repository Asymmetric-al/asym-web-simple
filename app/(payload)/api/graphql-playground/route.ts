import "@payloadcms/next/css";
import { GRAPHQL_PLAYGROUND_GET } from "@payloadcms/next/routes";
import { NextResponse } from "next/server";
import config from "@payload-config";
import type { NextRequest } from "next/server";

const isPayloadConfigured = (): boolean =>
  Boolean(process.env.DATABASE_URI?.trim() && process.env.PAYLOAD_SECRET?.trim());

const getHandler = GRAPHQL_PLAYGROUND_GET(config);

export const GET = (request: NextRequest) =>
  isPayloadConfigured()
    ? getHandler(request)
    : Promise.resolve(
        NextResponse.json(
          { error: "GraphQL playground is not configured." },
          { status: 503 }
        )
      );
