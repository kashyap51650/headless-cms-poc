import { createClient } from "contentful";

const client = createClient({
  space: import.meta.env.SPACE_ID, // Replace with your Contentful Space ID
  accessToken: import.meta.env.CONTENT_DELIVERY_API_KEY, // Replace with your Content Delivery API Access Token
});

export default client;
