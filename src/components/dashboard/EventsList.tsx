import React from "react";
import type { Event } from "../../types/event";
import { EventCard } from "./EventCard";

interface EventsListProps {
  events: Event[];
  loading: boolean;
}

export const EventsList: React.FC<EventsListProps> = ({ events, loading }) => {
  if (loading) {
    const skeletonItems = Array.from({ length: 6 }, (_, i) => `skeleton-${i}`);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skeletonItems.map((id) => (
          <div
            key={id}
            className="bg-white rounded-2xl shadow-xl animate-pulse"
          >
            <div className="h-48 bg-slate-200 rounded-t-xl" />
            <div className="p-6">
              <div className="h-6 bg-slate-200 rounded mb-4" />
              <div className="h-4 bg-slate-200 rounded mb-2" />
              <div className="h-4 bg-slate-200 rounded mb-4 w-3/4" />
              <div className="flex space-x-2">
                <div className="h-8 bg-slate-200 rounded flex-1" />
                <div className="h-8 bg-slate-200 rounded flex-1" />
                <div className="h-8 bg-slate-200 rounded flex-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <div className="text-6xl mb-4">📅</div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          No events found
        </h3>
        <p className="text-slate-600 mb-6">
          Get started by creating your first event or try adjusting your search
          filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
