import React from "react";
import { Plus, Eye, FileText } from "lucide-react";
import { Button } from "../ui/Button";
import { useNavigate, useSearchParams } from "react-router";

interface DashboardHeaderProps {
  total: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ total }) => {
  const navigate = useNavigate();

  const searchParams = useSearchParams();
  const modeParam = searchParams[0].get("mode");
  const mode: "draft" | "published" =
    modeParam === "draft" || modeParam === "published"
      ? modeParam
      : "published";

  const isDraftMode = mode === "draft";

  const onCreateEvent = () => {
    navigate("/create-event");
  };

  const onModeToggle = () => {
    if (mode === "draft") {
      navigate("/?mode=published");
    } else {
      navigate("/?mode=draft");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl mb-8 p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Events Dashboard
            {isDraftMode && (
              <span className="ml-3 text-lg font-medium text-amber-600">
                (Draft Mode)
              </span>
            )}
          </h1>
          <p className="text-slate-600">
            {isDraftMode
              ? "Manage unpublished draft events"
              : "Manage and monitor your published events"}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-slate-500">
            Total: {total} {isDraftMode ? "drafts" : "events"}
          </div>
          {onModeToggle && (
            <Button
              variant="outline"
              onClick={onModeToggle}
              icon={
                isDraftMode ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <FileText className="w-5 h-5" />
                )
              }
            >
              {isDraftMode ? "View Published" : "View Drafts"}
            </Button>
          )}
          <Button onClick={onCreateEvent} icon={<Plus className="w-5 h-5" />}>
            Create Event
          </Button>
        </div>
      </div>
    </div>
  );
};
