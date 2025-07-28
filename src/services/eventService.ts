import { client, managementClient, previewClient } from "../contentfulClient";
import { dummyEvents } from "../data";
import type { EventFormData } from "../schemas/eventSchema";
import globalSettings from "../setting";
import type { EventEntry } from "../types/contentful";
import type { Event, MutationResponse } from "../types/event";

// Helper function to transform Contentful entry to Event object
const transformEventEntry = (entry: any): Event => {
  return {
    id: entry.sys.id,
    title: entry.fields.title ?? "",
    slug: entry.fields.slug || "",
    date: entry.fields.date || "",
    description: entry.fields.description || "",
    banner: entry.fields.banner?.fields?.file?.url || undefined,
    bannerUrl: entry.fields.bannerURL || "",
    isPublished: Boolean(entry.fields.isPublished),
    organizer: {
      id: entry.fields.organizer?.sys?.id || "unknown",
      name: entry.fields.organizer?.fields?.name || "Unknown Organizer",
      email: entry.fields.organizer?.fields?.email,
      avatar: entry.fields.organizer?.fields?.image?.fields?.file?.url,
    },
    categories: (entry.fields.categories || []).map((cat: any) => ({
      id: cat.sys?.id || "unknown",
      title: cat.fields?.title || "Unknown Category",
      slug: cat.fields?.slug || "unknown",
      color: cat.fields?.color,
    })),
    speakers: (entry.fields.speakers || []).map((speaker: any) => ({
      id: speaker.sys?.id || "unknown",
      name: speaker.fields?.name || "Unknown Speaker",
      bio: speaker.fields?.bio,
      avatar: speaker.fields?.avatar?.fields?.file?.url,
    })),
    createdAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
  };
};

export class EventService {
  /**
   * Fetch all events from Contentful
   */
  static async getEvents(
    options: {
      published?: boolean;
      limit?: number;
      skip?: number;
      orderBy?: string;
    } = {}
  ): Promise<{ items: Event[]; total: number }> {
    if (globalSettings.renderStaticData) {
      return {
        items: this.getFallbackEvents().filter((event) => event.isPublished),
        total: this.getFallbackEvents().length,
      };
    }

    try {
      const queryParams: any = {
        content_type: "event",
        limit: options.limit || 50,
        skip: options.skip || 0,
        include: 2, // Include linked entries (organizer, categories, speakers)
      };

      const response = await client.getEntries<EventEntry>(queryParams);

      const transformedEvents = response.items.map(transformEventEntry);

      return {
        items: transformedEvents,
        total: transformedEvents.length,
      };
    } catch (error) {
      console.error("Error fetching events:", error);

      // Return fallback data
      return {
        items: this.getFallbackEvents().filter((event) => event.isPublished),
        total: this.getFallbackEvents().length,
      };
    }
  }

  /**
   * Fetch draft events from Contentful
   */
  static async getPreviewEvents(): Promise<Event[]> {
    if (globalSettings.renderStaticData) {
      return this.getFallbackEvents().filter((event) => !event.isPublished);
    }

    try {
      // Get unpublished events (drafts)
      const response = await previewClient.getEntries({
        content_type: "event",
        include: 2,
      });

      return (
        response.items
          // .filter((item) => item.fields.isPublished === false)
          .map(transformEventEntry)
      );
    } catch (error) {
      console.error("Error fetching preview events:", error);
      // Return draft events from fallback data
      return this.getFallbackEvents().filter((event) => !event.isPublished);
    }
  }

  /**
   * Fetch a single event by ID
   */
  static async getEventById(id: string): Promise<Event | null> {
    try {
      const entry = await client.getEntry<any>(id, { include: 2 });
      return transformEventEntry(entry);
    } catch (error) {
      console.error("Error fetching event:", error);
      return null;
    }
  }

  /**
   * Search events
   */
  static async searchEvents(
    query: string,
    options: { published?: boolean; limit?: number } = {}
  ): Promise<Event[]> {
    try {
      const response = await client.getEntries<any>({
        content_type: "event",
        query,
        limit: options.limit || 20,
        include: 2,
        ...(options.published !== undefined && {
          "fields.isPublished": options.published,
        }),
      });

      return response.items.map(transformEventEntry);
    } catch (error) {
      console.error("Error searching events:", error);
      return [];
    }
  }

  /**
   * Get events by category
   */
  static async getEventsByCategory(categoryId: string): Promise<Event[]> {
    try {
      const response = await client.getEntries<any>({
        content_type: "event",
        "fields.categories.sys.id": categoryId,
        include: 2,
      });

      return response.items.map(transformEventEntry);
    } catch (error) {
      console.error("Error fetching events by category:", error);
      return [];
    }
  }

  static async uploadAsset(file: File): Promise<string> {
    try {
      const space = await managementClient.getSpace(
        import.meta.env.VITE_SPACE_ID
      );
      const environment = await space.getEnvironment("master");

      const upload = await environment.createUpload({ file: new Blob([file]) });

      const uploadId = upload.sys.id;

      // 1. Prepare the file (example: fetching from a URL)
      const assetData = {
        fields: {
          title: {
            "en-US": "Event Banner",
          },
          file: {
            "en-US": {
              contentType: file.type,
              fileName: file.name,
              uploadFrom: {
                // This is the crucial change: linking to the upload ID
                sys: {
                  type: "Link",
                  linkType: "Upload",
                  id: uploadId,
                },
              },
            },
          },
        },
      };

      // 2. Create the Asset entry
      const asset = await environment.createAsset(assetData);
      console.log("Created Asset Entry:", asset);

      // 3. Process the Asset
      const processedAsset = await asset.processForAllLocales();
      console.log("Processed Asset:", processedAsset);

      // 4. Publish the Asset (optional)
      const publishedAsset = await processedAsset.publish();
      console.log("Published Asset:", publishedAsset);

      return publishedAsset.sys.id; // Return the asset ID for linking to the event entry
    } catch (error) {
      console.error("Error uploading banner:", error);
      return "";
    }
  }

  /**
   * Create a new event (placeholder - requires Contentful Management API)
   */
  static async createEvent(
    eventData: EventFormData
  ): Promise<MutationResponse<EventFormData>> {
    if (globalSettings.renderStaticData) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return {
        data: eventData,
        message: "Event created successfully",
        error: false,
      };
    }

    try {
      const space = await managementClient.getSpace(
        import.meta.env.VITE_SPACE_ID
      );
      const environment = await space.getEnvironment("master");

      let assetId = "";

      if (eventData.banner) {
        assetId = await EventService.uploadAsset(eventData.banner);
      }

      const data: { fields: Record<string, any> } = {
        fields: {
          title: { "en-US": eventData.title },
          slug: { "en-US": eventData.slug },
          date: { "en-US": eventData.date },
          description: { "en-US": eventData.description },
          isPublished: { "en-US": eventData.isPublished },
          organizer: {
            "en-US": {
              sys: {
                type: "Link",
                linkType: "Entry",
                id: eventData.organizer,
              },
            },
          },
          categories: {
            "en-US": eventData.categories.map((cat) => ({
              sys: {
                type: "Link",
                linkType: "Entry",
                id: cat,
              },
            })),
          },
          speakers: {
            "en-US": eventData.speakers.map((speaker) => ({
              sys: {
                type: "Link",
                linkType: "Entry",
                id: speaker,
              },
            })),
          },
          ...(eventData.bannerUrl && {
            bannerURL: { "en-US": eventData.bannerUrl },
          }),
          ...(assetId && {
            banner: {
              "en-US": {
                sys: {
                  type: "Link",
                  linkType: "Asset",
                  id: assetId,
                },
              },
            },
          }),
        },
      };

      const entry = await environment.createEntry("event", data);

      if (eventData.isPublished) {
        await entry.publish();
      }

      return {
        data: eventData,
        message: "Event created successfully",
        error: false,
      };
    } catch (error: any) {
      console.error("Error creating event:", error);
      return {
        message: error?.message || "Failed to create event",
        error: true,
      };
    }
  }

  static async updateEvent(
    id: string,
    eventData: EventFormData
  ): Promise<MutationResponse<EventFormData>> {
    if (globalSettings.renderStaticData) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Updating event:", eventData);
      return {
        data: eventData,
        message: "Event updated successfully",
      };
    }

    try {
      const space = await managementClient.getSpace(
        import.meta.env.VITE_SPACE_ID
      );
      const environment = await space.getEnvironment("master");

      const entry = await environment.getEntry(id);

      console.log("Fetched Event Entry for Update", entry);

      // Update fields
      entry.fields.title["en-US"] = eventData.title;
      entry.fields.slug["en-US"] = eventData.slug;
      entry.fields.date["en-US"] = eventData.date;
      entry.fields.description["en-US"] = eventData.description;
      entry.fields.isPublished["en-US"] = eventData.isPublished;
      entry.fields.organizer["en-US"] = {
        sys: {
          type: "Link",
          linkType: "Entry",
          id: eventData.organizer,
        },
      };
      entry.fields.categories["en-US"] = eventData.categories.map(
        (catId: string) => ({
          sys: {
            type: "Link",
            linkType: "Entry",
            id: catId,
          },
        })
      );
      entry.fields.speakers["en-US"] = eventData.speakers.map(
        (speakerId: string) => ({
          sys: {
            type: "Link",
            linkType: "Entry",
            id: speakerId,
          },
        })
      );

      if (eventData.bannerUrl) {
        entry.fields.bannerURL["en-US"] = eventData.bannerUrl;
      }

      if (eventData.banner) {
        console.log("Uploading banner for event:", eventData.banner);
        const assetId = await EventService.uploadAsset(eventData.banner);
        entry.fields.banner["en-US"] = {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: assetId,
          },
        };
      }

      const updatedEntry = await entry.update();

      if (eventData.isPublished) {
        const publishedEntry = await updatedEntry.publish();
        console.log("Published Updated Event Entry:", publishedEntry);
      }

      return {
        data: eventData,
        message: "Event updated successfully",
      };
    } catch (error: any) {
      console.error("Error updating event:", error);
      return {
        message: error?.message || "Failed to update event",
      };
    }
  }

  /**
   * Delete an event (placeholder - requires Contentful Management API)
   */
  static async deleteEvent(id: string): Promise<void> {
    console.log("Deleting event:", id);
    throw new Error(
      "Delete event not implemented - requires Contentful Management API"
    );
  }

  /**
   * Fallback events for when Contentful is not available
   */
  private static getFallbackEvents(): Event[] {
    return dummyEvents;
  }
}

// Export individual functions for backward compatibility
export const getEvents = EventService.getEvents;
export const getEventById = EventService.getEventById;
export const searchEvents = EventService.searchEvents;
export const getEventsByCategory = EventService.getEventsByCategory;
export const createEvent = EventService.createEvent;
export const updateEvent = EventService.updateEvent;
export const deleteEvent = EventService.deleteEvent;
