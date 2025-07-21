import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EventService } from "../services/eventService";
import { queryKeys } from "../lib/queryKeys";
import { queryClient } from "../lib/queryClient";

interface UseEventsOptions {
  published?: boolean;
  limit?: number;
  skip?: number;
  orderBy?: string;
}

export const useEvents = (options: UseEventsOptions = {}) => {
  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.eventsWithOptions(options),
    queryFn: () => EventService.getEvents(options),
    select: (data) => {
      return {
        events: data.items,
        total: data.total,
      };
    },
  });

  return {
    events: data?.events ?? [],
    total: data?.total ?? 0,
    loading,
    error: error?.message ?? null,
    refetch,
  };
};

export const useEvent = (id: string) => {
  const {
    data: event,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: queryKeys.event(id),
    queryFn: () => EventService.getEventById(id),
    enabled: !!id,
  });

  return {
    event: event ?? null,
    loading,
    error: error?.message ?? null,
  };
};

export const useDraftEvents = () => {
  const {
    data: events,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: queryKeys.previewEvents,
    queryFn: () => EventService.getPreviewEvents(),
  });

  return {
    events: events ?? [],
    loading,
    error: error?.message ?? null,
  };
};

export const useEventSearch = (query: string) => {
  const {
    data: events,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: queryKeys.eventSearch(query),
    queryFn: () => EventService.searchEvents(query),
    enabled: !!query && query.trim().length > 0,
  });

  return {
    events: events ?? [],
    total: events?.length ?? 0,
    loading,
    error: error?.message ?? null,
  };
};

export const useEventsByCategory = (categoryId: string) => {
  const {
    data: events,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: queryKeys.eventsByCategory(categoryId),
    queryFn: () => EventService.getEventsByCategory(categoryId),
    enabled: !!categoryId,
  });

  return {
    events: events ?? [],
    total: events?.length ?? 0,
    loading,
    error: error?.message ?? null,
  };
};

// Mutations
export const useCreateEvent = () => {
  return useMutation({
    mutationFn: EventService.createEvent,
    onSuccess: () => {
      // Invalidate and refetch events list
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
    },
  });
};

export const useUpdateEvent = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      EventService.updateEvent(id, data),
    onSuccess: (updatedEvent) => {
      // Update the specific event in cache
      if (updatedEvent?.id) {
        queryClient.setQueryData(
          queryKeys.event(updatedEvent.id),
          updatedEvent
        );
      }
      // Invalidate events list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: EventService.deleteEvent,
    onSuccess: (_, deletedEventId) => {
      // Remove the event from cache
      queryClient.removeQueries({ queryKey: queryKeys.event(deletedEventId) });
      // Invalidate events list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
    },
  });
};
