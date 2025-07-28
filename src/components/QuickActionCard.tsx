import { Card } from "./ui/Card";
import { Activity, BarChart3, Clock, Plus, Star } from "lucide-react";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router";

const QuickActionCard = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
        <Activity className="w-5 h-5 text-slate-400" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Button
          className="h-12 justify-start"
          onClick={() => navigate("/createEvent")}
        >
          <Plus className="w-5 h-5 mr-3" />
          Create New Event
        </Button>

        <Button
          variant="outline"
          className="h-12 justify-start"
          onClick={() => navigate("/draftEvents")}
        >
          <Clock className="w-5 h-5 mr-3" />
          View Draft Events
        </Button>

        <Button
          variant="outline"
          className="h-12 justify-start"
          onClick={() => navigate("/publishedEvents")}
        >
          <BarChart3 className="w-5 h-5 mr-3" />
          View Published Events
        </Button>

        <div className="mt-4 p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl border border-primary-200">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-5 h-5 text-primary-600" />
            <span className="font-medium text-primary-900">Pro Tip</span>
          </div>
          <p className="text-sm text-primary-700">
            Use categories to better organize your events and help attendees
            find what they're looking for!
          </p>
        </div>
      </div>
    </Card>
  );
};

export default QuickActionCard;
