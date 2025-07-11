import React from "react";
import type { FieldErrors } from "react-hook-form";
import { Tag } from "lucide-react";
import { Card } from "../ui/Card";
import { FormField } from "../ui/FormField";
import type { EventFormData } from "../../schemas/eventSchema";

interface CategoriesSectionProps {
  selectedCategories: string[];
  onCategoryToggle: (categoryId: string) => void;
  errors: FieldErrors<EventFormData>;
}

// Mock data
const mockCategories = [
  { id: "1", name: "Technology" },
  { id: "2", name: "Business" },
  { id: "3", name: "Design" },
  { id: "4", name: "Marketing" },
  { id: "5", name: "Startups" },
];

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  selectedCategories,
  onCategoryToggle,
  errors,
}) => {
  return (
    <Card title="Categories" icon={<Tag className="w-6 h-6" />}>
      <FormField
        label="Select Categories"
        error={errors.categories?.message}
        required
      >
        <div className="space-y-3">
          {mockCategories.map((category) => (
            <label
              key={category.id}
              className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => onCategoryToggle(category.id)}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="ml-3 text-slate-700">{category.name}</span>
            </label>
          ))}
        </div>
      </FormField>
    </Card>
  );
};
