import { client } from "../contentfulClient";
import { organizerList } from "../data";
import globalSettings from "../setting";
import type { AuthorEntry } from "../types/contentful";

export const getAuthors = async () => {
  if (globalSettings.renderStaticData) {
    return organizerList;
  }

  try {
    const response = await client.getEntries<AuthorEntry>({
      content_type: "author",
      include: 1,
    });

    return response.items.map((item) => ({
      id: item.sys.id,
      name: item.fields.name,
      email: item.fields.email,
      avatar: item.fields.image,
    }));
  } catch (error) {
    console.error("Error fetching authors:", error);
    return [];
  }
};
