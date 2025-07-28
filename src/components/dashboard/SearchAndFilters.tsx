import React from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: Array<{ id: string; name: string }>;
  isLoadingCategories: boolean;
  onReset: () => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  isLoadingCategories,
  onReset,
}) => {
  return (
    <div className="shadow p-4 rounded-2xl ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          disabled={isLoadingCategories}
          placeholder="All Categories"
          options={[
            ...categories.map((category) => ({
              value: category.id,
              label: category.name,
            })),
          ]}
        />

        <Button
          onClick={onReset}
          variant="outline"
          className="md:justify-self-start"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};
