import { useState, useEffect, useCallback } from "react";
import { EventService } from "../services/eventService";
import type { Event } from "../types/event";

export const useEvents = (
  options: {
    published?: boolean;
    limit?: number;
    skip?: number;
    orderBy?: string;
  } = {}
) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await EventService.getEvents(options);
      setEvents(response.items);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }, [options.published, options.limit, options.skip, options.orderBy]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    total,
    loading,
    error,
    refetch: fetchEvents,
  };
};

export const useEvent = (id: string) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const fetchedEvent = await EventService.getEventById(id);
      setEvent(fetchedEvent);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch event");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return {
    event,
    loading,
    error,
    refetch: fetchEvent,
  };
};

export const useEventBySlug = (slug: string) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);
      const fetchedEvent = await EventService.getEventBySlug(slug);
      setEvent(fetchedEvent);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch event");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return {
    event,
    loading,
    error,
    refetch: fetchEvent,
  };
};

export const useEventSearch = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchEvents = useCallback(
    async (
      query: string,
      options: {
        published?: boolean;
        limit?: number;
      } = {}
    ) => {
      if (!query.trim()) {
        setEvents([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const results = await EventService.searchEvents(query, options);
        setEvents(results);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to search events"
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearSearch = useCallback(() => {
    setEvents([]);
    setError(null);
  }, []);

  return {
    events,
    loading,
    error,
    searchEvents,
    clearSearch,
  };
};

export const useEventsByCategory = (
  categoryId: string,
  options: {
    published?: boolean;
    limit?: number;
  } = {}
) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    if (!categoryId) return;

    try {
      setLoading(true);
      setError(null);
      const fetchedEvents = await EventService.getEventsByCategory(
        categoryId,
        options
      );
      setEvents(fetchedEvents);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch events by category"
      );
    } finally {
      setLoading(false);
    }
  }, [categoryId, options.published, options.limit]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    refetch: fetchEvents,
  };
};
