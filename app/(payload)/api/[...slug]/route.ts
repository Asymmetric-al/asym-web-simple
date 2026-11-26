import config from "@payload-config";
import "@payloadcms/next/css";
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from "@payloadcms/next/routes";
import { connection, NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isPayloadConfigured = (): boolean =>
  Boolean(process.env.DATABASE_URI?.trim() && process.env.PAYLOAD_SECRET?.trim());

const unconfigured = (): NextResponse =>
  NextResponse.json({ error: "CMS API is not configured." }, { status: 503 });

type RouteContext = { params: Promise<{ slug: string[] }> };
type Handler = (request: NextRequest, context: RouteContext) => Promise<Response>;

const guard = (handler: Handler): Handler => async (request, context) => {
  await connection();
  return isPayloadConfigured() ? handler(request, context) : unconfigured();
};

export const GET = guard(REST_GET(config) as Handler);
export const POST = guard(REST_POST(config) as Handler);
export const DELETE = guard(REST_DELETE(config) as Handler);
export const PATCH = guard(REST_PATCH(config) as Handler);
export const PUT = guard(REST_PUT(config) as Handler);
export const OPTIONS = guard(REST_OPTIONS(config) as Handler);
