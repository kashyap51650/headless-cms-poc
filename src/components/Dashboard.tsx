import React from "react";
import {
  Calendar,
  Users,
  Tag,
  UserCheck,
  Eye,
  Clock,
  Plus,
} from "lucide-react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { useEvents } from "../hooks/useEvents";
import { useCategories } from "../hooks/useCategories";
import { useSpeakers } from "../hooks/useSpeakers";
import { useAuthors } from "../hooks/useAuthors";
import type { Event } from "../types/event";
import PageHeader from "./PageHeader";
import StatCard from "./StatCard";
import TopCategories from "./TopCategories";
import EventStatus from "./EventStatus";
import QuickActionCard from "./QuickActionCard";

interface RecentEventProps {
  event: Event;
}

const RecentEventCard: React.FC<RecentEventProps> = ({ event }) => {
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
    <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all duration-200 hover:border-primary-300">
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
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const { events, loading: eventsLoading } = useEvents({ published: true });
  const { categories, loading: categoriesLoading } = useCategories();
  const { speakers, loading: speakersLoading } = useSpeakers();
  const { authors, loading: authorsLoading } = useAuthors();

  // Calculate statistics
  const totalEvents = events.length;
  const publishedEvents = events.filter((event) => event.isPublished).length;
  const totalCategories = categories.length;
  const totalSpeakers = speakers.length;
  const totalOrganizers = authors.length;

  // Get recent events (last 5)
  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(b.createdAt || "").getTime() -
      new Date(a.createdAt || "").getTime()
  );
  const recentEvents = sortedEvents.slice(0, 5);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <PageHeader
          title="Dashboard"
          description="Welcome back! Here's what's happening with your events."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Events"
                value={eventsLoading ? "..." : totalEvents}
                icon={<Calendar className="w-6 h-6 text-white" />}
                change="+12%"
                changeType="positive"
                gradient="from-primary-500 to-primary-600"
              />

              <StatCard
                title="Categories"
                value={categoriesLoading ? "..." : totalCategories}
                icon={<Tag className="w-6 h-6 text-white" />}
                change="+3"
                changeType="positive"
                gradient="from-orange-500 to-red-500"
              />

              <StatCard
                title="Speakers"
                value={speakersLoading ? "..." : totalSpeakers}
                icon={<Users className="w-6 h-6 text-white" />}
                change="+8%"
                changeType="positive"
                gradient="from-green-500 to-emerald-500"
              />

              <StatCard
                title="Organizers"
                value={authorsLoading ? "..." : totalOrganizers}
                icon={<UserCheck className="w-6 h-6 text-white" />}
                change="+2"
                changeType="positive"
                gradient="from-purple-500 to-indigo-500"
              />
            </div>
            {/* Recent Events */}
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
                          onClick={() =>
                            (window.location.href = "/create-event")
                          }
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
          </div>
          <div className="lg:col-span-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="col-span-1 flex flex-col gap-6">
                <EventStatus />
                <TopCategories />
              </div>
              <div className="col-span-1">
                <QuickActionCard />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Published vs Draft Events */}
          <div className="lg:col-span-1"></div>
        </div>

        {/* Bottom Row - Categories and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
        </div>
      </div>
    </div>
  );
};
