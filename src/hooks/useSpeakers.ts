import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys";
import { getSpeakers } from "../services/speakerService";

export const useSpeakers = () => {
  const {
    data: speakers,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.speakers,
    queryFn: getSpeakers,
  });

  return {
    speakers: speakers ?? [],
    loading,
    error: error?.message ?? null,
    refetch,
  };
};
