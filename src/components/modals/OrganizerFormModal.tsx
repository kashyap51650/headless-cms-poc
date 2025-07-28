import React, { useEffect } from "react";
import { X, UserCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { FormField } from "../ui/FormField";

const organizerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().optional(),
  avatar: z.string().optional(),
});

type OrganizerFormData = z.infer<typeof organizerSchema>;

interface OrganizerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizer?: any;
  onSave: (data: any) => void;
}

export const OrganizerFormModal: React.FC<OrganizerFormModalProps> = ({
  isOpen,
  onClose,
  organizer,
  onSave,
}) => {
  const isEditing = !!organizer;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  const onSubmit = (data: OrganizerFormData) => {
    onSave({
      ...data,
      id: isEditing ? organizer.id : undefined,
    });
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 ">
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
          {/* Basic Information */}
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
                if (isEditing) return "Update Organizer";
                return "Add Organizer";
              })()}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
