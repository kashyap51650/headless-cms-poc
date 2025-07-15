import client from "../contentfulClient";
import { dummyEvents } from "../data";
import globalSettings from "../setting";
import type { EventEntry } from "../types/contentful";
import type { Event } from "../types/event";

// Helper function to transform Contentful entry to Event object
const transformEventEntry = (entry: any): Event => {
  return {
    id: entry.sys.id,
    title: entry.fields.title ?? "",
    slug: entry.fields.slug || "",
    date: entry.fields.date || "",
    description: entry.fields.description || "",
    banner: entry.fields.banner?.fields?.file?.url || undefined,
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
        items: dummyEvents,
        total: dummyEvents.length,
      };
    }

    try {
      const queryParams: any = {
        content_type: "event",
        limit: options.limit || 50,
        skip: options.skip || 0,
        include: 2, // Include linked entries (organizer, categories, speakers)
      };

      // Filter by published status if specified
      if (options.published !== undefined) {
        queryParams["fields.isPublished"] = options.published;
      }

      // Add ordering
      if (options.orderBy) {
        queryParams.order = [options.orderBy];
      } else {
        queryParams.order = ["-fields.date"]; // Default: newest first
      }

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
        items: this.getFallbackEvents(),
        total: this.getFallbackEvents().length,
      };
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
   * Fetch a single event by slug
   */
  static async getEventBySlug(slug: string): Promise<Event | null> {
    try {
      const response = await client.getEntries<any>({
        content_type: "event",
        "fields.slug": slug,
        limit: 1,
        include: 2,
      });

      if (response.items.length > 0) {
        return transformEventEntry(response.items[0]);
      }
      return null;
    } catch (error) {
      console.error("Error fetching event by slug:", error);
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
      const response = await client.getEntries<EventEntry>({
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

  /**
   * Create a new event (placeholder - requires Contentful Management API)
   */
  static async createEvent(eventData: any): Promise<Event> {
    // This would require Contentful Management API
    console.log("Creating event:", eventData);
    throw new Error(
      "Create event not implemented - requires Contentful Management API"
    );
  }

  /**
   * Update an event (placeholder - requires Contentful Management API)
   */
  static async updateEvent(id: string, eventData: any): Promise<Event> {
    console.log("Updating event:", id, eventData);
    throw new Error(
      "Update event not implemented - requires Contentful Management API"
    );
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
export const getEventBySlug = EventService.getEventBySlug;
export const searchEvents = EventService.searchEvents;
export const getEventsByCategory = EventService.getEventsByCategory;
export const createEvent = EventService.createEvent;
export const updateEvent = EventService.updateEvent;
export const deleteEvent = EventService.deleteEvent;
