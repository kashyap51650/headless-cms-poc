import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys";
import { getAuthors } from "../services/authorService";

export const useAuthors = () => {
  const {
    data: authors,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.authors,
    queryFn: getAuthors,
  });

  return {
    authors: authors ?? [],
    loading,
    error: error?.message ?? null,
    refetch,
  };
};
