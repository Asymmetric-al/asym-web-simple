import { GRAPHQL_POST, REST_OPTIONS } from "@payloadcms/next/routes";
import { NextResponse } from "next/server";
import config from "@payload-config";
import type { NextRequest } from "next/server";

const isPayloadConfigured = (): boolean =>
  Boolean(process.env.DATABASE_URI?.trim() && process.env.PAYLOAD_SECRET?.trim());

const unconfigured = (): NextResponse =>
  NextResponse.json({ error: "GraphQL API is not configured." }, { status: 503 });

const postHandler = GRAPHQL_POST(config);
const optionsHandler = REST_OPTIONS(config);

export const POST = (request: NextRequest) =>
  isPayloadConfigured() ? postHandler(request) : Promise.resolve(unconfigured());

export const OPTIONS = (request: NextRequest) =>
  isPayloadConfigured()
    ? optionsHandler(request, { params: Promise.resolve({ slug: [] }) })
    : Promise.resolve(unconfigured());
