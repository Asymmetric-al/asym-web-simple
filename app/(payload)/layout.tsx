import "@payloadcms/next/css";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import React from "react";
import config from "@payload-config";
import { importMap } from "./admin/importMap.js";
import type { Metadata } from "next";
import type { ServerFunctionClient } from "payload";

import "./custom.css";

interface Args {
  readonly children: React.ReactNode;
}

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const serverFunction: ServerFunctionClient = async function payloadServerFunction(
  args
) {
  "use server";
  return await handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const isPayloadConfigured = (): boolean =>
  Boolean(process.env.DATABASE_URI?.trim() && process.env.PAYLOAD_SECRET?.trim());

const Layout = ({ children }: Args) => {
  if (!isPayloadConfigured()) {
    return <>{children}</>;
  }
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  );
};

export default Layout;
