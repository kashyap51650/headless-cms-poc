import { Edit2, Star, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { ConfirmationModal } from "./modals/ConfirmationModal";
import { useDeleteSpeaker } from "../hooks/useSpeakers";

interface SpeakerCardProps {
  speaker: {
    id: string;
    name: string;
    bio?: string;
    avatar?: string;
  };
  onEdit: (speaker: any) => void;
  onDelete?: (id: string) => void;
}

export const SpeakerCard: React.FC<SpeakerCardProps> = ({
  speaker,
  onEdit,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { mutate, isPending } = useDeleteSpeaker();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    mutate(speaker.id, {
      onSuccess: () => {
        setShowDeleteModal(false);
      },
      onError: (error) => {
        console.error("Error deleting speaker:", error);
      },
    });
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Speaker Avatar & Basic Info */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          {speaker.avatar ? (
            <img
              src={speaker.avatar}
              alt={speaker.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-primary-100"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center border-4 border-primary-100">
              <span className="text-white font-bold text-lg">
                {getInitials(speaker.name)}
              </span>
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-500 rounded-full border-2 border-white flex items-center justify-center">
            <Star className="w-3 h-3 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-slate-900 mb-1 truncate">
            {speaker.name}
          </h3>
          {/* Bio */}
          {speaker.bio && (
            <p className="text-slate-600 text-sm mb-4 line-clamp-3">
              {speaker.bio}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(speaker)}
            className="p-2 rounded-lg bg-primary-100 hover:bg-primary-200 text-primary-600 hover:text-primary-800 transition-colors"
            title="Edit Speaker"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDeleteClick}
            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800 transition-colors"
            title="Delete Speaker"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer with ID */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="text-xs text-slate-400">
          Speaker ID: {speaker.id.slice(0, 8)}...
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Speaker"
        message={`Are you sure you want to delete "${speaker.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isPending}
      />
    </div>
  );
};
