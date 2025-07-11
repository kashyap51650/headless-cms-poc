import React from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { User } from "lucide-react";
import { Card } from "../ui/Card";
import { FormField } from "../ui/FormField";
import { Select } from "../ui/Select";
import type { EventFormData } from "../../schemas/eventSchema";

interface OrganizerSectionProps {
  register: UseFormRegister<EventFormData>;
  errors: FieldErrors<EventFormData>;
}

// Mock data
const mockOrganizers = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Tech Events Inc." },
];

export const OrganizerSection: React.FC<OrganizerSectionProps> = ({
  register,
  errors,
}) => {
  const organizerOptions = mockOrganizers.map((org) => ({
    value: org.id,
    label: org.name,
  }));

  return (
    <Card title="Organizer" icon={<User className="w-6 h-6" />}>
      <FormField
        label="Select Organizer"
        error={errors.organizer?.message}
        required
        htmlFor="organizer"
      >
        <Select
          {...register("organizer")}
          id="organizer"
          options={organizerOptions}
          placeholder="Select organizer"
          error={!!errors.organizer}
        />
      </FormField>
    </Card>
  );
};
