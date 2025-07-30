import { client, managementClient } from "../contentfulClient";
import { organizerList } from "../data";
import globalSettings from "../setting";
import type { AuthorEntry, ContentfulError } from "../types/contentful";
import type { OrganizerFormData } from "../schemas/organizerSchema";

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
      avatar: item.fields.avtarUrl,
    }));
  } catch (error) {
    console.error("Error fetching authors:", error);
    return [];
  }
};

export const addAuthor = async (authorData: OrganizerFormData) => {
  if (globalSettings.renderStaticData) {
    console.log("Static data mode: addAuthor not implemented");
    return;
  }

  try {
    const space = await managementClient.getSpace(
      import.meta.env.VITE_SPACE_ID
    );
    const environment = await space.getEnvironment(
      import.meta.env.VITE_APP_ENVIRONMENT
    );

    const entry = await environment.createEntry("author", {
      fields: {
        name: { "en-US": authorData.name },
        email: { "en-US": authorData.email || "" },
        avtarUrl: { "en-US": authorData.avatar || "" },
      },
    });
    await entry.publish();
    return entry.sys.id;
  } catch (error: unknown) {
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as Error).message
        : String(error);

    const contentfulError = JSON.parse(errorMessage) as ContentfulError;

    throw contentfulError;
  }
};

export const updateAuthor = async (
  authorId: string,
  authorData: OrganizerFormData
) => {
  if (globalSettings.renderStaticData) {
    console.log("Static data mode: updateAuthor not implemented");
    return;
  }

  try {
    const space = await managementClient.getSpace(
      import.meta.env.VITE_SPACE_ID
    );
    const environment = await space.getEnvironment(
      import.meta.env.VITE_APP_ENVIRONMENT
    );

    const entry = await environment.getEntry(authorId);

    entry.fields.name["en-US"] = authorData.name;
    entry.fields.email["en-US"] = authorData.email || "";
    entry.fields.avtarUrl["en-US"] = authorData.avatar;

    console.table(authorData);
    console.log(authorId);

    const updatedEntry = await entry.update();

    await updatedEntry.publish();

    return entry.sys.id;
  } catch (error: unknown) {
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as Error).message
        : String(error);

    const contentfulError = JSON.parse(errorMessage) as ContentfulError;

    throw contentfulError;
  }
};

export const deleteAuthor = async (authorId: string) => {
  if (globalSettings.renderStaticData) {
    console.log("Static data mode: deleteAuthor not implemented");
    return;
  }

  try {
    const space = await managementClient.getSpace(
      import.meta.env.VITE_SPACE_ID
    );
    const environment = await space.getEnvironment(
      import.meta.env.VITE_APP_ENVIRONMENT
    );

    const entry = await environment.getEntry(authorId);

    // Unpublish first if it's published
    if (entry.isPublished()) {
      await entry.unpublish();
    }

    await entry.delete();

    return authorId;
  } catch (error: unknown) {
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as Error).message
        : String(error);

    const contentfulError = JSON.parse(errorMessage) as ContentfulError;

    throw contentfulError;
  }
};
