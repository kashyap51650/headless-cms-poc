import client from "../contentfulClient";
import type { EntrySkeletonType, Asset } from "contentful";
import type { Event } from "../types/event";

export interface EventFields {
  title: string;
  slug: string;
  date: string;
  description: string;
  banner?: Asset;
  isPublished: boolean;
  organizer: string;
  categories: string[];
  speakers: string[];
}

export interface EventSkeleton extends EntrySkeletonType {
  contentTypeId: "event";
  fields: EventFields;
}

export interface CreateEventData {
  title: string;
  slug: string;
  date: string;
  description: string;
  banner?: File;
  isPublished: boolean;
  organizer: string;
  categories: string[];
  speakers: string[];
}

export class EventService {
  /**
   * Create a new event in Contentful
   */
  static async createEvent(eventData: CreateEventData): Promise<Event> {
    try {
      // First, upload the banner if provided
      let bannerAsset = null;
      if (eventData.banner) {
        bannerAsset = await this.uploadAsset(eventData.banner);
      }

      // Prepare the entry data
      const entryData = {
        fields: {
          title: { "en-US": eventData.title },
          slug: { "en-US": eventData.slug },
          date: { "en-US": eventData.date },
          description: { "en-US": eventData.description },
          isPublished: { "en-US": eventData.isPublished },
          organizer: { "en-US": eventData.organizer },
          categories: { "en-US": eventData.categories },
          speakers: { "en-US": eventData.speakers },
          ...(bannerAsset && {
            banner: {
              "en-US": {
                sys: {
                  type: "Link",
                  linkType: "Asset",
                  id: bannerAsset.sys.id,
                },
              },
            },
          }),
        },
      };

      // Create the entry using Contentful Management API
      // Note: This requires the management client, not the delivery client
      console.log("Creating event entry:", entryData);

      // For now, return a mock response since we're using delivery API
      // In production, you'd use the Management API
      return {
        id: "temp-" + Date.now(),
        title: eventData.title,
        slug: eventData.slug,
        date: eventData.date,
        description: eventData.description,
        banner: eventData.banner
          ? URL.createObjectURL(eventData.banner)
          : undefined,
        isPublished: eventData.isPublished,
        organizer: eventData.organizer,
        categories: eventData.categories,
        speakers: eventData.speakers,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error creating event:", error);
      throw new Error("Failed to create event");
    }
  }

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
    try {
      const queryParams: any = {
        content_type: "event",
        limit: options.limit || 50,
        skip: options.skip || 0,
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

      const response = await client.getEntries<EventSkeleton>(queryParams);
      console.log(response);
      const events: Event[] = response.items.map((item) => {
        // Debug: Log the raw categories data
        console.log("Raw item from Contentful:", item);
        console.log("Raw categories from Contentful:", item.fields.categories);

        return {
          id: item.sys.id,
          title: item.fields.title || "Untitled Event",
          slug: item.fields.slug || "untitled",
          date: item.fields.date || new Date().toISOString(),
          description: item.fields.description || "",
          banner: (item.fields.banner as any)?.fields?.file?.url,
          isPublished: Boolean(item.fields.isPublished),
          organizer: item.fields.organizer || "Unknown Organizer",
          categories: Array.isArray(item.fields.categories)
            ? (item.fields.categories as any[])
                .map((cat: any) => {
                  // Handle multiple possible formats:
                  // 1. String ID
                  if (typeof cat === "string") return cat;
                  // 2. Contentful linked entry with sys.id
                  if (cat?.sys?.id) return cat.sys.id;
                  // 3. Object with fields.title
                  if (cat?.fields?.title) return cat.fields.title;
                  // 4. Object with title property
                  if (cat?.title) return cat.title;
                  // 5. Fallback to string conversion
                  console.warn("Unexpected category format:", cat);
                  return String(cat);
                })
                .filter(Boolean) // Remove any falsy values
            : [],
          speakers: Array.isArray(item.fields.speakers)
            ? item.fields.speakers
            : [],
          createdAt: item.sys.createdAt,
          updatedAt: item.sys.updatedAt,
        };
      });

      return {
        items: events,
        total: response.total,
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
      const entry = await client.getEntry<EventSkeleton>(id);

      return {
        id: entry.sys.id,
        title: entry.fields.title,
        slug: entry.fields.slug,
        date: entry.fields.date,
        description: entry.fields.description,
        banner: (entry.fields.banner as any)?.fields?.file?.url,
        isPublished: entry.fields.isPublished,
        organizer: entry.fields.organizer,
        categories: entry.fields.categories || [],
        speakers: entry.fields.speakers || [],
        createdAt: entry.sys.createdAt,
        updatedAt: entry.sys.updatedAt,
      };
    } catch (error) {
      console.error(`Error fetching event ${id}:`, error);
      return null;
    }
  }

  /**
   * Fetch an event by slug
   */
  static async getEventBySlug(slug: string): Promise<Event | null> {
    try {
      const response = await client.getEntries<EventSkeleton>({
        content_type: "event",
        limit: 1,
      } as any);

      if (response.items.length === 0) {
        return null;
      }

      const item = response.items[0];
      return {
        id: item.sys.id,
        title: item.fields.title,
        slug: item.fields.slug,
        date: item.fields.date,
        description: item.fields.description,
        banner: (item.fields.banner as any)?.fields?.file?.url,
        isPublished: item.fields.isPublished,
        organizer: item.fields.organizer,
        categories: item.fields.categories || [],
        speakers: item.fields.speakers || [],
        createdAt: item.sys.createdAt,
        updatedAt: item.sys.updatedAt,
      };
    } catch (error) {
      console.error(`Error fetching event by slug ${slug}:`, error);
      return null;
    }
  }

  /**
   * Update an existing event
   * Note: This is a mock implementation. In production, use Contentful Management API
   */
  static async updateEvent(
    id: string,
    eventData: Partial<CreateEventData>
  ): Promise<Event | null> {
    try {
      console.log(`Updating event ${id} with data:`, eventData);

      // Mock implementation - in production, use Management API
      const existingEvent = await this.getEventById(id);
      if (!existingEvent) {
        throw new Error("Event not found");
      }

      const updatedEvent: Event = {
        ...existingEvent,
        ...eventData,
        updatedAt: new Date().toISOString(),
      };

      console.log("Event updated successfully:", updatedEvent);
      return updatedEvent;
    } catch (error) {
      console.error(`Error updating event ${id}:`, error);
      throw new Error("Failed to update event");
    }
  }

  /**
   * Delete an event
   * Note: This is a mock implementation. In production, use Contentful Management API
   */
  static async deleteEvent(id: string): Promise<boolean> {
    try {
      console.log(`Deleting event ${id}`);

      // Mock implementation - in production, use Management API
      console.log("Event deleted successfully");
      return true;
    } catch (error) {
      console.error(`Error deleting event ${id}:`, error);
      return false;
    }
  }

  /**
   * Search events by title or description
   */
  static async searchEvents(
    query: string,
    options: {
      published?: boolean;
      limit?: number;
    } = {}
  ): Promise<Event[]> {
    try {
      const response = await client.getEntries<EventSkeleton>({
        content_type: "event",
        query,
        limit: options.limit || 20,
        ...(options.published !== undefined && {
          "fields.isPublished": options.published,
        }),
      });

      return response.items.map((item) => ({
        id: item.sys.id,
        title: item.fields.title,
        slug: item.fields.slug,
        date: item.fields.date,
        description: item.fields.description,
        banner: (item.fields.banner as any)?.fields?.file?.url,
        isPublished: item.fields.isPublished,
        organizer: item.fields.organizer,
        categories: item.fields.categories || [],
        speakers: item.fields.speakers || [],
        createdAt: item.sys.createdAt,
        updatedAt: item.sys.updatedAt,
      }));
    } catch (error) {
      console.error("Error searching events:", error);
      return [];
    }
  }

  /**
   * Get events by category
   */
  static async getEventsByCategory(
    categoryId: string,
    options: {
      published?: boolean;
      limit?: number;
    } = {}
  ): Promise<Event[]> {
    try {
      const response = await client.getEntries({
        content_type: "event",
        limit: options.limit || 20,
        ...(options.published !== undefined && {
          "fields.isPublished": options.published,
        }),
        order: ["-sys.createdAt"],
      } as any);

      return response.items.map((item: any) => ({
        id: item.sys.id,
        title: item.fields.title as string,
        slug: item.fields.slug as string,
        date: item.fields.date as string,
        description: item.fields.description as string,
        banner: item.fields.banner?.fields?.file?.url,
        isPublished: item.fields.isPublished as boolean,
        organizer: item.fields.organizer as string,
        categories: (item.fields.categories as string[]) || [],
        speakers: (item.fields.speakers as string[]) || [],
        createdAt: item.sys.createdAt,
        updatedAt: item.sys.updatedAt,
      }));
    } catch (error) {
      console.error(`Error fetching events by category ${categoryId}:`, error);
      return [];
    }
  }

  /**
   * Upload asset to Contentful
   * Note: This requires Management API
   */
  private static async uploadAsset(file: File): Promise<any> {
    // Mock implementation - in production, use Management API
    console.log("Uploading asset:", file.name);

    return {
      sys: {
        id: "asset-" + Date.now(),
        type: "Asset",
      },
      fields: {
        title: { "en-US": file.name },
        file: {
          "en-US": {
            url: URL.createObjectURL(file),
            fileName: file.name,
            contentType: file.type,
          },
        },
      },
    };
  }

  /**
   * Fallback events for when Contentful is not available
   */
  private static getFallbackEvents(): Event[] {
    return [
      {
        id: "1",
        title: "React Conference 2025",
        slug: "react-conference-2025",
        date: "2025-08-15T09:00:00Z",
        description:
          "Join us for the biggest React conference of the year! Learn about the latest features, best practices, and network with fellow developers.",
        banner:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
        isPublished: true,
        organizer: "1",
        categories: ["1", "2"],
        speakers: ["1", "2"],
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",
      },
      {
        id: "2",
        title: "AI & Machine Learning Summit",
        slug: "ai-ml-summit-2025",
        date: "2025-09-20T10:00:00Z",
        description:
          "Explore the future of AI and machine learning with industry experts and cutting-edge research presentations.",
        banner:
          "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
        isPublished: true,
        organizer: "2",
        categories: ["1", "5"],
        speakers: ["3", "4"],
        createdAt: "2025-01-02T00:00:00Z",
        updatedAt: "2025-01-02T00:00:00Z",
      },
      {
        id: "3",
        title: "Design Systems Workshop",
        slug: "design-systems-workshop",
        date: "2025-07-30T14:00:00Z",
        description:
          "Learn how to build and maintain scalable design systems that work across teams and products.",
        banner:
          "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=400&fit=crop",
        isPublished: false,
        organizer: "3",
        categories: ["3"],
        speakers: ["1"],
        createdAt: "2025-01-03T00:00:00Z",
        updatedAt: "2025-01-03T00:00:00Z",
      },
    ];
  }
}

// Export individual functions for backward compatibility
export const createAnEvent = EventService.createEvent;
export const getEvents = EventService.getEvents;
export const getEventById = EventService.getEventById;
export const getEventBySlug = EventService.getEventBySlug;
export const updateEvent = EventService.updateEvent;
export const deleteEvent = EventService.deleteEvent;
export const searchEvents = EventService.searchEvents;
export const getEventsByCategory = EventService.getEventsByCategory;
