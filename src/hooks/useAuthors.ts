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
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0, // Data is immediately stale
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
    mutationFn: async (authorData: OrganizerFormData) => {
      console.log(
        "🚀 useCreateAuthor: Starting mutation with data:",
        authorData
      );
      const result = await addAuthor(authorData);
      console.log("✅ useCreateAuthor: Mutation completed, result:", result);

      // Add a small delay to allow Contentful to process the publish
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return result;
    },
    onSuccess: async (data, variables) => {
      console.log("🎉 useCreateAuthor: onSuccess called", { data, variables });

      // Invalidate and refetch immediately
      await queryClient.invalidateQueries({
        queryKey: queryKeys.authors,
        exact: true,
      });

      // Force a refetch to ensure fresh data
      await queryClient.refetchQueries({
        queryKey: queryKeys.authors,
        exact: true,
      });

      console.log(
        "🔄 useCreateAuthor: Invalidated and refetched authors query"
      );
    },
    onError: (error) => {
      console.error("❌ useCreateAuthor: Error creating author:", error);
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
    }) => {
      console.log("🚀 useUpdateAuthor: Starting mutation", {
        authorId,
        authorData,
      });
      const result = await updateAuthor(authorId, authorData);
      console.log("✅ useUpdateAuthor: Mutation completed");

      // Add a small delay to allow Contentful to process the publish
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return result;
    },
    onSuccess: async () => {
      console.log("🎉 useUpdateAuthor: onSuccess called");

      // Invalidate and refetch immediately
      await queryClient.invalidateQueries({
        queryKey: queryKeys.authors,
        exact: true,
      });

      // Force a refetch to ensure fresh data
      await queryClient.refetchQueries({
        queryKey: queryKeys.authors,
        exact: true,
      });

      console.log(
        "🔄 useUpdateAuthor: Invalidated and refetched authors query"
      );
    },
    onError: (error) => {
      console.error("❌ useUpdateAuthor: Error updating author:", error);
    },
  });
};

export const useDeleteAuthor = () => {
  return useMutation({
    mutationFn: (authorId: string) => deleteAuthor(authorId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.authors,
        exact: true,
      });
    },
    onError: (error) => {
      console.error("Error deleting author:", error);
    },
  });
};
