import { client } from "../contentfulClient";
import { speakerList } from "../data";
import globalSettings from "../setting";
import type { SpeakerEntry } from "../types/contentful";
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
    }));

    return speakers;
  } catch (error) {
    console.error("Error fetching speakers:", error);
    return [];
  }
};
