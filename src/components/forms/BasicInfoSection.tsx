import React from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { FileText, Link, Calendar } from "lucide-react";
import { Card } from "../ui/Card";
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
    <Card title="Basic Information" icon={<FileText className="w-6 h-6" />}>
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
        className="mt-6"
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
    </Card>
  );
};
