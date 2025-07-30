import React from "react";
import type { FieldErrors } from "react-hook-form";
import { Tag, Loader, AlertCircle, RefreshCw } from "lucide-react";
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
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          Categories
        </h3>
        <p className="text-orange-100 text-sm mt-1">Tag your event</p>
      </div>
      <div className="p-6">
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
      </div>
    </div>
  );
};
