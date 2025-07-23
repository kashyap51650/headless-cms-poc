import React from "react";
import type { UseFormRegister } from "react-hook-form";
import type { EventFormData } from "../../schemas/eventSchema";

interface PublishSettingsSectionProps {
  register: UseFormRegister<EventFormData>;
  isPublished: boolean;
}

export const PublishSettingsSection: React.FC<PublishSettingsSectionProps> = ({
  register,
  isPublished,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r bg-primary-500 px-6 py-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Publish Settings
        </h3>
        <p className="text-indigo-100 text-sm mt-1">Control visibility</p>
      </div>
      <div className="p-6">
        <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
          <input
            {...register("isPublished")}
            type="checkbox"
            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
          />
          <div className="ml-4">
            <span className="text-slate-700 font-medium">
              Publish immediately
            </span>
            <p className="text-sm text-slate-500">
              Make this event visible on the frontend
            </p>
          </div>
        </label>

        <div className="mt-4">
          <div
            className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${
              isPublished
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full mr-2 ${
                isPublished ? "bg-green-500" : "bg-yellow-500"
              }`}
            />
            {isPublished ? "Will be published" : "Saved as draft"}
          </div>
        </div>
      </div>
    </div>
  );
};
