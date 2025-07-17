import React from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { User } from "lucide-react";
import { Card } from "../ui/Card";
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
    <Card title="Organizer" icon={<User className="w-6" />}>
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
    </Card>
  );
};
