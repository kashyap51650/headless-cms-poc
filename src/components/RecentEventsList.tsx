import { Calendar, Clock, Eye, Plus, UserCheck } from "lucide-react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { useDraftEvents } from "../hooks/useEvents";
import type { Event } from "../types/event";
import { useNavigate } from "react-router";

interface RecentEventProps {
  event: Event;
}

const RecentEventCard: React.FC<RecentEventProps> = ({ event }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <button
      className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all duration-200 hover:border-primary-300 w-full cursor-pointer"
      onClick={() => navigate("/edit-event/" + event.id, { state: { event } })}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-slate-900 text-sm line-clamp-1">
          {event.title}
        </h4>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            event.isPublished
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {event.isPublished ? "Published" : "Draft"}
        </span>
      </div>

      <div className="flex items-center gap-2 text-slate-600 text-xs mb-2">
        <Clock className="w-3 h-3" />
        {formatDate(event.date)}
      </div>

      <div className="flex items-center gap-2 text-slate-600 text-xs mb-3">
        <UserCheck className="w-3 h-3" />
        {event.organizer.name}
      </div>

      <div className="flex flex-wrap gap-1">
        {event.categories.slice(0, 2).map((category) => (
          <span
            key={category.id}
            className="px-2 py-1 bg-primary-100 text-primary-700 rounded-md text-xs font-medium"
          >
            {category.title}
          </span>
        ))}
        {event.categories.length > 2 && (
          <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs">
            +{event.categories.length - 2}
          </span>
        )}
      </div>
    </button>
  );
};

const RecentEventsList = () => {
  const { events, loading: eventsLoading } = useDraftEvents();
  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(a.createdAt || "").getTime() -
      new Date(b.createdAt || "").getTime()
  );
  const recentEvents = sortedEvents.slice(0, 5);

  return (
    <div className="lg:col-span-2">
      <Card className="h-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Events
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => (window.location.href = "/")}
          >
            <Eye className="w-4 h-4 mr-2" />
            View All
          </Button>
        </div>

        {eventsLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={`recent-skeleton-${i}`}
                className="animate-pulse bg-slate-200 h-16 rounded-xl"
              ></div>
            ))}
          </div>
        ) : (
          <div>
            {recentEvents.length > 0 ? (
              <div className="space-y-3">
                {recentEvents
                  .filter((event: Event) => event.id) // Filter out events without id
                  .map((event: Event) => (
                    <RecentEventCard key={event.id} event={event} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No events yet</p>
                <Button
                  className="mt-3"
                  onClick={() => (window.location.href = "/create-event")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Event
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default RecentEventsList;
