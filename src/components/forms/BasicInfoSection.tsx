import React from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { Link, Calendar } from "lucide-react";
import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import { TextArea } from "../ui/TextArea";
import type { EventFormData } from "../../schemas/eventSchema";

interface BasicInfoSectionProps {
  register: UseFormRegister<EventFormData>;
  errors: FieldErrors<EventFormData>;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  register,
  errors,
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Event Information
        </h3>
        <p className="text-blue-100 text-sm mt-1">
          Basic details about your event
        </p>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Title */}
            <FormField
              label="Event Title"
              error={errors.title?.message}
              required
              className="lg:col-span-2"
              htmlFor="title"
            >
              <Input
                {...register("title")}
                id="title"
                type="text"
                placeholder="Enter event title"
                error={!!errors.title}
              />
            </FormField>

            {/* Slug */}
            <FormField
              label="URL Slug"
              error={errors.slug?.message}
              required
              htmlFor="slug"
            >
              <Input
                {...register("slug")}
                id="slug"
                type="text"
                placeholder="event-slug"
                icon={<Link />}
                error={!!errors.slug}
              />
            </FormField>

            {/* Date */}
            <FormField
              label="Event Date & Time"
              error={errors.date?.message}
              required
              htmlFor="date"
            >
              <Input
                {...register("date")}
                id="date"
                type="datetime-local"
                icon={<Calendar />}
                error={!!errors.date}
              />
            </FormField>
          </div>

          {/* Description */}
          <FormField
            label="Description (Markdown supported)"
            error={errors.description?.message}
            required
            htmlFor="description"
          >
            <TextArea
              {...register("description")}
              id="description"
              rows={6}
              placeholder="Enter detailed event description..."
              error={!!errors.description}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
};
