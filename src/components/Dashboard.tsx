import React from "react";
import { Calendar, Users, Tag, UserCheck } from "lucide-react";
import { useEvents } from "../hooks/useEvents";
import { useCategories } from "../hooks/useCategories";
import { useSpeakers } from "../hooks/useSpeakers";
import { useAuthors } from "../hooks/useAuthors";
import PageHeader from "./PageHeader";
import StatCard from "./StatCard";
import TopCategories from "./TopCategories";
import EventStatus from "./EventStatus";
import QuickActionCard from "./QuickActionCard";
import RecentEventsList from "./RecentEventsList";

export const Dashboard: React.FC = () => {
  const { events, loading: eventsLoading } = useEvents({ published: true });
  const { categories, loading: categoriesLoading } = useCategories();
  const { speakers, loading: speakersLoading } = useSpeakers();
  const { authors, loading: authorsLoading } = useAuthors();

  // Calculate statistics
  const totalEvents = events.length;
  const totalCategories = categories.length;
  const totalSpeakers = speakers.length;
  const totalOrganizers = authors.length;

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
                title="Published Events"
                value={eventsLoading ? "..." : totalEvents}
                icon={<Calendar className="w-6 h-6 text-white" />}
                changeType="positive"
                gradient="from-primary-500 to-primary-600"
              />

              <StatCard
                title="Categories"
                value={categoriesLoading ? "..." : totalCategories}
                icon={<Tag className="w-6 h-6 text-white" />}
                changeType="positive"
                gradient="from-orange-500 to-red-500"
              />

              <StatCard
                title="Speakers"
                value={speakersLoading ? "..." : totalSpeakers}
                icon={<Users className="w-6 h-6 text-white" />}
                changeType="positive"
                gradient="from-green-500 to-emerald-500"
              />

              <StatCard
                title="Organizers"
                value={authorsLoading ? "..." : totalOrganizers}
                icon={<UserCheck className="w-6 h-6 text-white" />}
                changeType="positive"
                gradient="from-purple-500 to-indigo-500"
              />
            </div>
            <RecentEventsList />
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
      </div>
    </div>
  );
};
