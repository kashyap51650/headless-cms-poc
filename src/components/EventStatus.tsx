import { Card } from "./ui/Card";
import { BarChart3 } from "lucide-react";
import { useDraftEvents } from "../hooks/useEvents";

const EventStatus = () => {
  const { events } = useDraftEvents();
  const totalEvents = events.length;
  const publishedEvents = events.filter((event) => event.isPublished).length;
  const draftEvents = totalEvents - publishedEvents;
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Draft Events Status
        </h3>
        <BarChart3 className="w-5 h-5 text-slate-400" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <span className="font-medium text-amber-900">Drafts</span>
          </div>
          <span className="text-2xl font-bold text-amber-700">
            {draftEvents}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span>Completion Rate</span>
          <span>
            {totalEvents > 0
              ? Math.round((publishedEvents / totalEvents) * 100)
              : 0}
            %
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${totalEvents > 0 ? (publishedEvents / totalEvents) * 100 : 0}%`,
            }}
          ></div>
        </div>
      </div>
    </Card>
  );
};

export default EventStatus;
