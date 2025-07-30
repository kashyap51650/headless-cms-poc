import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys";
import {
  addAuthor,
  deleteAuthor,
  getAuthors,
  updateAuthor,
} from "../services/authorService";
import type { OrganizerFormData } from "../schemas/organizerSchema";
import { queryClient } from "../lib/queryClient";

export const useAuthors = () => {
  const {
    data: authors,
    isLoading: loading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: queryKeys.authors,
    queryFn: getAuthors,
  });

  return {
    authors: authors ?? [],
    loading,
    error: error?.message ?? null,
    isFetching,
    refetch,
  };
};

export const useCreateAuthor = () => {
  return useMutation({
    mutationFn: async (authorData: OrganizerFormData) => addAuthor(authorData),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.authors });
    },
  });
};

export const useUpdateAuthor = () => {
  return useMutation({
    mutationFn: async ({
      authorId,
      authorData,
    }: {
      authorId: string;
      authorData: OrganizerFormData;
    }) => updateAuthor(authorId, authorData),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.authors });
    },
  });
};

export const useDeleteAuthor = () => {
  return useMutation({
    mutationFn: (authorId: string) => deleteAuthor(authorId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.authors });
    },
  });
};
