import { useState, useEffect, useCallback } from "react";
import { CategoriesService } from "../services/categoriesService";
import type { Category } from "../types/event";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedCategories = await CategoriesService.getCategories();
      setCategories(fetchedCategories);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch categories"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
};
