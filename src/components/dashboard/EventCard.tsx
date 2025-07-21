import React from "react";
import { Calendar, Eye, Edit, Trash2, Users } from "lucide-react";
import { Button } from "../ui/Button";
import type { Event } from "../../types/event";
import { useNavigate } from "react-router";

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  const onEditButtonClick = () => {
    navigate(`/edit-event/${event.id}`, {
      state: { event },
    });
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return "Invalid Date";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-secondary-500 to-secondary-700 rounded-t-xl relative overflow-hidden">
          {event.banner && (
            <img
              src={event.banner}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-opacity-80" />
        </div>

        <div className={`p-6 ${!event.banner ? "pt-8" : ""}`}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                {event.title}
              </h3>
              <div className="flex items-center text-slate-600 text-sm mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(event.date)}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  event.isPublished
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {event.isPublished ? "Published" : "Draft"}
              </span>
            </div>
          </div>

          <p className="text-slate-600 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-slate-500 text-sm">
              <Users className="w-4 h-4 mr-2" />
              {event.organizer.name}
            </div>
            {event.categories && event.categories.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {event.categories.slice(0, 2).map((category) => {
                  const categoryText = category.title;
                  return (
                    <span
                      key={category.id}
                      className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                    >
                      {categoryText}
                    </span>
                  );
                })}
                {event.categories.length > 2 && (
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                    +{event.categories.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            {event.speakers && event.speakers.length > 0 ? (
              <div className="flex items-center space-x-2">
                {event.speakers.slice(0, 2).map((speaker) => (
                  <span
                    key={speaker.id}
                    className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
                  >
                    {speaker.name}
                  </span>
                ))}
                {event.speakers.length > 2 && (
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                    +{event.speakers.length - 2}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-slate-500 text-xs">
                No speakers assigned
              </span>
            )}
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={() => {}}
              variant="outline"
              size="sm"
              icon={<Eye className="w-4 h-4" />}
              className="flex-1"
            >
              View
            </Button>
            <Button
              onClick={onEditButtonClick}
              variant="outline"
              size="sm"
              icon={<Edit className="w-4 h-4" />}
              className="flex-1"
            >
              Edit
            </Button>
            <Button
              onClick={() => {}}
              variant="outline"
              size="sm"
              icon={<Trash2 className="w-4 h-4" />}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
