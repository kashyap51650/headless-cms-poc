import { Calendar, Crown, Edit2, Mail, Trash2 } from "lucide-react";
import React from "react";
import type { Organizer } from "../types/event";

interface OrganizerCardProps {
  organizer: Organizer;
  eventsCount: number;
  onEdit: (organizer: Organizer) => void;
  onDelete: (id: string) => void;
}

export const OrganizerCard: React.FC<OrganizerCardProps> = ({
  organizer,
  eventsCount,
  onEdit,
  onDelete,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Organizer Avatar & Basic Info */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          {organizer.avatar ? (
            <img
              src={organizer.avatar}
              alt={organizer.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-amber-100"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center border-4 border-primary-100">
              <span className="text-white font-bold text-lg">
                {getInitials(organizer.name)}
              </span>
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-500 rounded-full border-2 border-white flex items-center justify-center">
            <Crown className="w-3 h-3 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-slate-900 mb-1 truncate">
            {organizer.name}
          </h3>
          <p className="text-primary-600 font-medium text-sm mb-1">
            Event Organizer
          </p>
          {organizer.email && (
            <div className="flex items-center gap-1 text-slate-600 text-sm">
              <Mail className="w-3 h-3" />
              <span className="truncate">{organizer.email}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(organizer)}
            className="p-2 rounded-lg bg-primary-100 hover:bg-primary-200 text-primary-600 hover:text-primary-800 transition-colors"
            title="Edit Organizer"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(organizer.id)}
            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800 transition-colors"
            title="Delete Organizer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-600">
            {eventsCount} {eventsCount === 1 ? "Event" : "Events"}
          </span>
        </div>

        <div className="text-xs text-slate-400">
          ID: {organizer.id.slice(0, 8)}...
        </div>
      </div>

      {/* Quick Actions */}
      {organizer.email && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          {" "}
          <a
            href={`mailto:${organizer.email}`}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-200 text-primary-700 rounded-lg transition-all duration-200"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">Send Email</span>
          </a>
        </div>
      )}
    </div>
  );
};
