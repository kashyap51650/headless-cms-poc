import React, { useEffect } from "react";
import { X, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { TextArea } from "../ui/TextArea";
import { FormField } from "../ui/FormField";
import {
  speakerSchema,
  type SpeakerFormData,
} from "../../schemas/speakerSchema";

interface SpeakerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  speaker?: any;
  onSave: (data: any) => void;
}

export const SpeakerFormModal: React.FC<SpeakerFormModalProps> = ({
  isOpen,
  onClose,
  speaker,
  onSave,
}) => {
  const isEditing = !!speaker;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SpeakerFormData>({
    resolver: zodResolver(speakerSchema),
    defaultValues: speaker
      ? {
          name: speaker.name,
          bio: speaker.bio || "",
        }
      : undefined,
  });

  useEffect(() => {
    if (speaker) {
      reset({
        name: speaker.name || "",
        bio: speaker.bio || "",
      });
    } else {
      reset({
        name: "",
        bio: "",
      });
    }
  }, [speaker, reset]);

  const onSubmit = (data: SpeakerFormData) => {
    const speakerData = {
      name: data.name,
      bio: data.bio,
      id: isEditing ? speaker.id : undefined,
    };

    onSave(speakerData);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 ">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <User className="w-6 h-6" />
              {isEditing ? "Edit Speaker" : "Add New Speaker"}
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
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-primary-600" />
              Speaker Information
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
                placeholder="John Doe"
                error={!!errors.name}
              />
            </FormField>

            <FormField label="Bio" error={errors.bio?.message} htmlFor="bio">
              <TextArea
                {...register("bio")}
                id="bio"
                rows={4}
                placeholder="Tell us about this speaker..."
                error={!!errors.bio}
              />
            </FormField>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-primary-500 to-primary-600"
            >
              {(() => {
                if (isSubmitting) return "Saving...";
                if (isEditing) return "Update Speaker";
                return "Add Speaker";
              })()}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
