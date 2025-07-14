import React from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/Button";

interface DashboardHeaderProps {
  total: number;
  onCreateEvent?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  total,
  onCreateEvent,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl mb-8 p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Events Dashboard
          </h1>
          <p className="text-slate-600">Manage and monitor your events</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-slate-500">Total: {total} events</div>
          <Button onClick={onCreateEvent} icon={<Plus className="w-5 h-5" />}>
            Create Event
          </Button>
        </div>
      </div>
    </div>
  );
};
