import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys";
import {
  addSpeaker,
  deleteSpeaker,
  getSpeakers,
  updateSpeaker,
} from "../services/speakerService";
import type { SpeakerFormData } from "../schemas/speakerSchema";
import { queryClient } from "../lib/queryClient";

export const useSpeakers = () => {
  const {
    data: speakers,
    isLoading: loading,
    error,
    refetch,
    isFetching,
    dataUpdatedAt,
    isStale,
  } = useQuery({
    queryKey: queryKeys.speakers,
    queryFn: getSpeakers,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0, // Data is immediately stale
  });

  return {
    speakers: speakers ?? [],
    loading,
    error: error?.message ?? null,
    refetch,
    isFetching,
  };
};

export const useCreateSpeaker = () => {
  return useMutation({
    mutationFn: async (speakerData: SpeakerFormData) => {
      const result = await addSpeaker(speakerData);
      console.log("✅ useCreateSpeaker: Mutation completed, result:", result);

      // Add a small delay to allow Contentful to process the publish
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return result;
    },
    onSuccess: async (data, variables) => {
      // Invalidate and refetch immediately
      await queryClient.invalidateQueries({
        queryKey: queryKeys.speakers,
        exact: true,
      });

      // Force a refetch to ensure fresh data
      await queryClient.refetchQueries({
        queryKey: queryKeys.speakers,
        exact: true,
      });
    },
    onError: (error) => {
      console.error("❌ useCreateSpeaker: Error creating speaker:", error);
    },
  });
};

export const useUpdateSpeaker = () => {
  return useMutation({
    mutationFn: async ({
      speakerId,
      speakerData,
    }: {
      speakerId: string;
      speakerData: SpeakerFormData;
    }) => {
      console.log("🚀 useUpdateSpeaker: Starting mutation", {
        speakerId,
        speakerData,
      });
      const result = await updateSpeaker(speakerId, speakerData);
      console.log("✅ useUpdateSpeaker: Mutation completed");

      // Add a small delay to allow Contentful to process the publish
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return result;
    },
    onSuccess: async () => {
      console.log("🎉 useUpdateSpeaker: onSuccess called");

      // Invalidate and refetch immediately
      await queryClient.invalidateQueries({
        queryKey: queryKeys.speakers,
        exact: true,
      });

      // Force a refetch to ensure fresh data
      await queryClient.refetchQueries({
        queryKey: queryKeys.speakers,
        exact: true,
      });

      console.log(
        "🔄 useUpdateSpeaker: Invalidated and refetched speakers query"
      );
    },
    onError: (error) => {
      console.error("❌ useUpdateSpeaker: Error updating speaker:", error);
    },
  });
};

export const useDeleteSpeaker = () => {
  return useMutation({
    mutationFn: async (speakerId: string) => {
      console.log("🚀 useDeleteSpeaker: Starting mutation", { speakerId });
      const result = await deleteSpeaker(speakerId);
      console.log("✅ useDeleteSpeaker: Mutation completed");

      // Add a small delay to allow Contentful to process the delete
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return result;
    },
    onSuccess: async () => {
      console.log("🎉 useDeleteSpeaker: onSuccess called");

      // Invalidate and refetch immediately
      await queryClient.invalidateQueries({
        queryKey: queryKeys.speakers,
        exact: true,
      });

      // Force a refetch to ensure fresh data
      await queryClient.refetchQueries({
        queryKey: queryKeys.speakers,
        exact: true,
      });

      console.log(
        "🔄 useDeleteSpeaker: Invalidated and refetched speakers query"
      );
    },
    onError: (error) => {
      console.error("❌ useDeleteSpeaker: Error deleting speaker:", error);
    },
  });
};
