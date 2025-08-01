import { createClient } from "contentful";
import { createClient as createMutationClient } from "contentful-management";

// The Content Delivery API (CDA) tokens used for fetching data are typically read-only, while Content Management API (CMA) tokens required for mutating data provide full read and write access.

export const client = createClient({
  accessToken: import.meta.env.VITE_CONTENT_DELIVERY_API_KEY,
  space: import.meta.env.VITE_SPACE_ID,
});

export const managementClient = createMutationClient({
  accessToken: import.meta.env.VITE_CONTENT_MANAGEMENT_API_KEY,
});

export const previewClient = createClient({
  accessToken: import.meta.env.VITE_CONTENT_PREVIEW_API_KEY,
  space: import.meta.env.VITE_SPACE_ID,
  host: "preview.contentful.com",
});
