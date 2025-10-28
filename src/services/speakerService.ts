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
    console.error("❌ Error fetching speakers:", error);
    return [];
  }
};

export const addSpeaker = async (speakerData: SpeakerFormData) => {
  if (globalSettings.renderStaticData) {
    const newSpeaker = {
      id: `static-speaker-${Date.now()}`,
      ...speakerData,
      avatar: speakerData.avtarUrl, // Map avtarUrl to avatar
    };

    return newSpeaker;
  }

  try {
    console.log("🌐 Creating speaker in Contentful...");
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
        avtarUrl: { "en-US": speakerData.avtarUrl || "" },
      },
    });

    const publishedEntry = await entry.publish();

    const newSpeaker = {
      id: publishedEntry.sys.id,
      name: speakerData.name,
      bio: speakerData.bio,
      avatar: speakerData.avtarUrl,
    };

    return newSpeaker;
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
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as Error).message
        : String(error);

    const contentfulError = JSON.parse(errorMessage) as ContentfulError;

    throw contentfulError;
  }
};
