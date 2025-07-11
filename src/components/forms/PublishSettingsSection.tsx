import React from "react";
import type { UseFormRegister } from "react-hook-form";
import { CheckCircle } from "lucide-react";
import { Card } from "../ui/Card";
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
    <Card title="Publish Settings" icon={<CheckCircle className="w-6 h-6" />}>
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
    </Card>
  );
};
