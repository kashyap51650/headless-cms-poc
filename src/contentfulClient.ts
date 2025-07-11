import { createClient } from "contentful";

const client = createClient({
  accessToken: import.meta.env.VITE_CONTENT_DELIVERY_API_KEY, // Replace with your Content Delivery API Access Token
  space: import.meta.env.VITE_SPACE_ID, // Replace with your Contentful Space ID
});

export default client;
