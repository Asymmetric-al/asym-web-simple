import { request } from "@playwright/test";
import type { FullConfig } from "@playwright/test";

const BYPASS_COOKIE = "_vercel_jwt";

const isStorageStatePath = (
  value: FullConfig["projects"][number]["use"]["storageState"]
): value is string => typeof value === "string";

/**
 * Trades the Vercel Protection Bypass for Automation secret for Vercel's bypass cookie and saves it as Playwright storage state.
 *
 * Tests then reach the protected preview with the cookie, which is scoped to the preview host, rather than sending the secret as a header on every request, third parties included.
 *
 * @see https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
 */
const vercelBypassSetup = async (config: FullConfig) => {
  const [project] = config.projects;
  const { baseURL, storageState } = project?.use ?? {};
  const secret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  if (!baseURL || !secret || !isStorageStatePath(storageState)) {
    return;
  }

  await using context = await request.newContext({
    extraHTTPHeaders: {
      "x-vercel-protection-bypass": secret,
      "x-vercel-set-bypass-cookie": "true",
    },
  });
  const response = await context.get(baseURL);
  const state = await context.storageState({ path: storageState });
  if (
    !response.ok() ||
    state.cookies.every((cookie) => cookie.name !== BYPASS_COOKIE)
  ) {
    throw new Error(
      `Vercel bypass failed for ${baseURL} (HTTP ${response.status()}). Check VERCEL_AUTOMATION_BYPASS_SECRET matches this project.`
    );
  }
};

export default vercelBypassSetup;
