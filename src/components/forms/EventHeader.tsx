import React from "react";
import { Eye, EyeOff } from "lucide-react";

interface EventHeaderProps {
  isPublished: boolean;
  title?: string;
}

export const EventHeader: React.FC<EventHeaderProps> = ({
  isPublished,
  title = "",
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl mb-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {title ? `Edit: ${title}` : "Publish Event"}
          </h1>
          <p className="text-slate-600">Create and manage your event details</p>
        </div>
        <div className="flex items-center space-x-3">
          <div
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              isPublished
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {isPublished ? (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Published
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Draft
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
