import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { mcpPlugin } from "@payloadcms/plugin-mcp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import type { CollectionConfig } from "payload";

// eslint-disable-next-line unicorn/prefer-import-meta-properties -- import.meta.dirname is undefined once Next bundles this config, which breaks `next build`.
const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
Auth collection for Payload admin (`admin.user` must match slug).
*/
const users: CollectionConfig = {
  slug: "users",
  auth: true,
  versions: false,
  admin: {
    useAsTitle: "email",
  },
  fields: [],
};

export default buildConfig({
  admin: {
    user: users.slug,
  },
  collections: [
    users,
    // TODO Phase 2: Add collections
    // - Pages (slug, hero, sections, metadata, draft/publish)
    // - Media (file, alt, caption, sizes)
    // - Redirects (from, to, permanent)
    // - Posts (Phase 3)
    // - TeamMembers (Phase 3)
  ],
  globals: [
    // TODO Phase 2: Add globals
    // - SiteSettings (name, description, email, location, CTA config)
    // - Navigation (primary nav, support links)
    // - Footer (link groups, copyright)
    // - SEODefaults (default OG image, description, site name)
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? "",
    },
  }),
  storage: [
    vercelBlobStorage({
      collections: {
        // TODO Phase 2: Add media collection once defined
        // media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN ?? "",
    }),
  ],
  plugins: [
    mcpPlugin({
      // Payload v4 MCP plugin exposes collections by default (opt-out).
      // Explicitly disable all built-in tools on `users` so auth records are never
      // reachable over `/api/mcp`. Expose public content collections intentionally
      // when Phase 2 schemas (pages, media, site settings) are added.
      collections: {
        users: {
          tools: {
            count: false,
            create: false,
            delete: false,
            duplicate: false,
            find: false,
            findDistinct: false,
            getCollectionSchema: false,
            update: false,
          },
        },
      },
    }),
  ],
});
