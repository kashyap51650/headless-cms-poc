import { client, managementClient } from "../contentfulClient";
import { speakerList } from "../data";
import type { SpeakerFormData } from "../schemas/speakerSchema";
import globalSettings from "../setting";
import type { ContentfulError, SpeakerEntry } from "../types/contentful";
import type { Speaker } from "../types/event";

export const getSpeakers = async (): Promise<Speaker[]> => {
  if (globalSettings.renderStaticData) {
    return speakerList;
  }

  try {
    const response = await client.getEntries<SpeakerEntry>({
      content_type: "speaker",
      include: 1,
    });

    const speakers = response.items.map((item) => ({
      id: item.sys.id,
      name: item.fields.name,
      bio: item.fields.bio,
      avatar: item.fields.avtarUrl,
    }));

    return speakers;
  } catch (error) {
    console.error("Error fetching speakers:", error);
    return [];
  }
};

export const addSpeaker = async (speakerData: SpeakerFormData) => {
  if (globalSettings.renderStaticData) {
    console.log("Static data mode: addSpeaker not implemented");
    return "12435678";
  }

  try {
    const space = await managementClient.getSpace(
      import.meta.env.VITE_SPACE_ID
    );
    const environment = await space.getEnvironment(
      import.meta.env.VITE_APP_ENVIRONMENT
    );

    const entry = await environment.createEntry("speaker", {
      fields: {
        name: { "en-US": speakerData.name },
        bio: { "en-US": speakerData.bio || "" },
        avtarUrl: { "en-US": speakerData.avtarUrl }, // Assuming avatar URL is optional
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

export const updateSpeaker = async (
  speakerId: string,
  speakerData: SpeakerFormData
): Promise<string> => {
  if (globalSettings.renderStaticData) {
    console.log("Static data mode: updateSpeaker not implemented");
    return speakerId;
  }

  try {
    const space = await managementClient.getSpace(
      import.meta.env.VITE_SPACE_ID
    );
    const environment = await space.getEnvironment(
      import.meta.env.VITE_APP_ENVIRONMENT
    );

    const entry = await environment.getEntry(speakerId);

    entry.fields.name["en-US"] = speakerData.name;
    entry.fields.bio["en-US"] = speakerData.bio || "";
    entry.fields.avtarUrl["en-US"] = speakerData.avtarUrl;

    const updatedEntry = await entry.update();
    await updatedEntry.publish();

    return updatedEntry.sys.id;
  } catch (error: unknown) {
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as Error).message
        : String(error);

    const contentfulError = JSON.parse(errorMessage) as ContentfulError;

    throw contentfulError;
  }
};

export const deleteSpeaker = async (speakerId: string): Promise<void> => {
  if (globalSettings.renderStaticData) {
    console.log("Static data mode: deleteSpeaker not implemented");
    return;
  }

  try {
    const space = await managementClient.getSpace(
      import.meta.env.VITE_SPACE_ID
    );
    const environment = await space.getEnvironment(
      import.meta.env.VITE_APP_ENVIRONMENT
    );

    const entry = await environment.getEntry(speakerId);
    await entry.unpublish();
    await entry.delete();
  } catch (error) {
    console.error("Error deleting speaker:", error);
  }
};
