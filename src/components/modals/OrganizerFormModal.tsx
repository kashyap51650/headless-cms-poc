import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCheck, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useCreateAuthor, useUpdateAuthor } from "../../hooks/useAuthors";
import {
  organizerSchema,
  type OrganizerFormData,
} from "../../schemas/organizerSchema";
import { Button } from "../ui/Button";
import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import type { Organizer } from "../../types/event";

interface OrganizerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizer?: Organizer;
}

export const OrganizerFormModal: React.FC<OrganizerFormModalProps> = ({
  isOpen,
  onClose,
  organizer,
}) => {
  const { mutate, error, isPending } = useCreateAuthor();
  const {
    mutate: updateOrganizer,
    error: updateError,
    isPending: isUpdating,
  } = useUpdateAuthor();
  const isEditing = !!organizer;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrganizerFormData>({
    resolver: zodResolver(organizerSchema),
    defaultValues: organizer
      ? {
          name: organizer.name,
          email: organizer.email || "",
          avatar: organizer.avatar || "",
        }
      : undefined,
  });

  useEffect(() => {
    if (organizer) {
      reset({
        name: organizer.name || "",
        email: organizer.email || "",
        avatar: organizer.avatar || "",
      });
    } else {
      reset({
        name: "",
        email: "",
        avatar: "",
      });
    }
  }, [organizer, reset]);

  const onSubmit = async (data: OrganizerFormData) => {
    if (isEditing) {
      updateOrganizer(
        {
          authorId: organizer.id,
          authorData: {
            name: data.name,
            email: data.email,
            avatar: data.avatar,
          },
        },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
    } else {
      mutate(data, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <UserCheck className="w-6 h-6" />
              {isEditing ? "Edit Organizer" : "Add New Organizer"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-primary-600" />
              Organizer Information
            </h3>

            <FormField
              label="Full Name"
              error={errors.name?.message}
              htmlFor="name"
              required
            >
              <Input
                {...register("name")}
                id="name"
                placeholder="Jane Smith"
                error={!!errors.name}
              />
            </FormField>

            <FormField
              label="Email"
              error={errors.email?.message}
              htmlFor="email"
              required
            >
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="jane@example.com"
                error={!!errors.email}
              />
            </FormField>

            <FormField
              label="Avatar URL"
              error={errors.avatar?.message}
              htmlFor="avatar"
            >
              <Input
                {...register("avatar")}
                id="avatar"
                type="url"
                placeholder="https://example.com/avatar.jpg"
                error={!!errors.avatar}
              />
            </FormField>
          </div>

          {(error || updateError) && (
            <div className="mt-4 p-4 bg-gradient-to-r from-error-50 to-error-100 rounded-xl border border-error-200">
              <p className="text-sm text-error-700">
                {error?.message ||
                  updateError?.message ||
                  "An error occurred while saving the speaker."}
              </p>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending || isUpdating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || isUpdating}
              className="bg-gradient-to-r from-primary-500 to-primary-600"
            >
              {(() => {
                if (isPending || isUpdating) return "Saving...";
                if (isEditing) return "Update Organizer";
                return "Add Organizer";
              })()}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")!
  );
};
