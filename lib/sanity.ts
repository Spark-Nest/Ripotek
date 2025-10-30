import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!projectId) {
  console.warn(
    "[Sanity] Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Create .env.local with projectId and dataset."
  );
}

export const sanity = createClient({
  projectId: projectId!,           // we warn above; non-null here
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});
