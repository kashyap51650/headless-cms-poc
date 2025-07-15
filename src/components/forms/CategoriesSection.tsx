import React from "react";
import type { FieldErrors } from "react-hook-form";
import { Tag, Loader, AlertCircle, RefreshCw } from "lucide-react";
import { Card } from "../ui/Card";
import { FormField } from "../ui/FormField";
import { useCategories } from "../../hooks/useCategories";
import type { EventFormData } from "../../schemas/eventSchema";
import type { Category } from "../../types/event";

interface CategoriesSectionProps {
  selectedCategories: Category[];
  onCategoryToggle: (categoryId: string) => void;
  errors: FieldErrors<EventFormData>;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  selectedCategories,
  onCategoryToggle,
  errors,
}) => {
  const { categories, loading, error, refetch } = useCategories();

  return (
    <Card title="Categories" icon={<Tag className="w-6 h-6" />}>
      <FormField
        label="Select Categories"
        error={errors.categories?.message}
        required
      >
        {loading && (
          <div className="flex items-center justify-center p-8">
            <Loader className="w-6 h-6 animate-spin text-primary-600" />
            <span className="ml-2 text-slate-600">Loading categories...</span>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-800 font-medium">
                Error loading categories
              </span>
            </div>
            <p className="text-red-700 text-sm mb-3">{error}</p>
            <button
              type="button"
              onClick={() => refetch}
              className="flex items-center px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Retry
            </button>
          </div>
        )}

        {!loading && !error && categories.length > 0 && (
          <div className="space-y-3">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <input
                  name="categories"
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => onCategoryToggle(category.id)}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
                <div className="ml-3 flex items-center">
                  {category.color && (
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: category.color }}
                    />
                  )}
                  <span className="text-slate-700">{category.title}</span>
                </div>
              </label>
            ))}
          </div>
        )}

        {!loading && !error && categories.length === 0 && (
          <div className="text-center p-8 text-slate-500">
            <Tag className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No categories available</p>
            <button
              type="button"
              onClick={() => refetch}
              className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Refresh
            </button>
          </div>
        )}
      </FormField>
    </Card>
  );
};
