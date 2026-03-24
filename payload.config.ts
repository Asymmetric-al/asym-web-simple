import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import type { CollectionConfig } from "payload";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/** Auth collection for Payload admin (`admin.user` must match slug). */
const users: CollectionConfig = {
  slug: "users",
  auth: true,
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
    // - SiteSettings (name, description, email, EIN, location, CTA config)
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
  plugins: [
    vercelBlobStorage({
      collections: {
        // TODO Phase 2: Add media collection once defined
        // media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN ?? "",
    }),
  ],
});
