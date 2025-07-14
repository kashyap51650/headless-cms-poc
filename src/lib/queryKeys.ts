export const queryKeys = {
  // Events
  events: ["events"] as const,
  eventsWithOptions: (options: any) => ["events", options] as const,
  event: (id: string) => ["events", id] as const,
  eventBySlug: (slug: string) => ["events", "slug", slug] as const,
  eventsByCategory: (categoryId: string) =>
    ["events", "category", categoryId] as const,
  eventSearch: (query: string) => ["events", "search", query] as const,

  // Categories
  categories: ["categories"] as const,
  category: (id: string) => ["categories", id] as const,
  categoryBySlug: (slug: string) => ["categories", "slug", slug] as const,
} as const;
