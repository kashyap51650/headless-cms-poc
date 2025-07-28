import { useQuery } from "@tanstack/react-query";
import { CategoriesService } from "../services/categoriesService";
import { queryKeys } from "../lib/queryKeys";

export const useCategories = () => {
  const {
    data: categories,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.categories,
    queryFn: CategoriesService.getCategories,
  });

  return {
    categories: categories ?? [],
    loading,
    error: error?.message ?? null,
    refetch,
  };
};

export const useCategory = (id: string) => {
  const {
    data: category,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: queryKeys.category(id),
    queryFn: () => CategoriesService.getCategoryById(id),
    enabled: !!id,
  });

  return {
    category: category ?? null,
    loading,
    error: error?.message ?? null,
  };
};
