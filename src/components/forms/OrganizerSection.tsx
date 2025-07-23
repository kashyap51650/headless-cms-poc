import React from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormField } from "../ui/FormField";
import { Select } from "../ui/Select";
import type { EventFormData } from "../../schemas/eventSchema";
import { useAuthors } from "../../hooks/useAuthors";

interface OrganizerSectionProps {
  register: UseFormRegister<EventFormData>;
  errors: FieldErrors<EventFormData>;
}

export const OrganizerSection: React.FC<OrganizerSectionProps> = ({
  register,
  errors,
}) => {
  const { authors } = useAuthors();

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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Event Organizer
        </h3>
        <p className="text-green-100 text-sm mt-1">
          Who is organizing this event
        </p>
      </div>
      <div className="p-6">
        <FormField
          label="Select Organizer"
          error={errors.organizer?.message}
          required
          htmlFor="organizer"
        >
          <Select
            {...register("organizer")}
            id="organizer"
            options={authors.map((author) => ({
              value: author.id,
              label: author.name,
            }))}
            placeholder="Select organizer"
            error={!!errors.organizer}
          />
        </FormField>
      </div>
    </div>
  );
};
