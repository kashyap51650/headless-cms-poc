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
  } = useQuery({
    queryKey: queryKeys.speakers,
    queryFn: getSpeakers,
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
    mutationFn: async (speakerData: SpeakerFormData) => addSpeaker(speakerData),
    onSettled: () => {
      // Optionally, you can refetch speakers after adding a new one
      queryClient.invalidateQueries({ queryKey: queryKeys.speakers });
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
    }) => updateSpeaker(speakerId, speakerData),
    onSettled: () => {
      // Optionally, you can refetch speakers after updating one
      queryClient.invalidateQueries({ queryKey: queryKeys.speakers });
    },
  });
};

export const useDeleteSpeaker = () => {
  return useMutation({
    mutationFn: (speakerId: string) => deleteSpeaker(speakerId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.speakers });
    },
  });
};
