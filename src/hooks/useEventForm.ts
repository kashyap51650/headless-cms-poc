import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, type EventFormData } from "../schemas/eventSchema";
import { useCreateEvent, useUpdateEvent } from "./useEvents";
import type { Category, MutationResponse, Speaker } from "../types/event";
import { useCategories } from "./useCategories";
import { useSpeakers } from "./useSpeakers";

interface UseEventFormProps {
  initialData?: Partial<EventFormData & { id?: string }>;
  onSuccess?: (data: MutationResponse<EventFormData>) => void;
  onError?: (error: MutationResponse<EventFormData>) => void;
}

export const useEventForm = ({
  initialData,
  onSuccess,
  onError,
}: UseEventFormProps = {}) => {
  const { categories } = useCategories();
  const { speakers } = useSpeakers();

  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    categories.filter((cat) => initialData?.categories?.includes(cat.id))
  );
  const [selectedSpeakers, setSelectedSpeakers] = useState<Speaker[]>(
    speakers.filter((speaker) => initialData?.speakers?.includes(speaker.id))
  );
  const [bannerPreview, setBannerPreview] = useState<string | null>(
    initialData?.banner || null
  );

  const createEventMutation = useCreateEvent();
  const updateEventMutation = useUpdateEvent();

  const isCreating = createEventMutation.isPending;
  const isUpdating = updateEventMutation.isPending;
  const isLoading = isCreating || isUpdating;

  const formatDateForInput = (dateString?: string): string => {
    if (!dateString) return "";
    if (dateString.includes("T")) {
      return new Date(dateString).toISOString().slice(0, 16);
    }
    return dateString;
  };

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      date: formatDateForInput(initialData?.date),
      description: initialData?.description || "",
      isPublished: initialData?.isPublished || false,
      organizer: initialData?.organizer,
      categories: selectedCategories.map((cat) => cat.id),
      speakers: selectedSpeakers.map((speaker) => speaker.id),
      bannerUrl: initialData?.bannerUrl || "",
    },
  });

  const title = form.watch("title");

  // Auto-generate slug from title
  useEffect(() => {
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      form.setValue("slug", slug);
    }
  }, [title, form]);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("banner", file);
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    // find the speaker
    const category = categories.find((c) => c.id === categoryId);

    if (category) {
      // if speaker is already selected, remove it
      const updatedCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((s) => s.id !== category.id)
        : [...selectedCategories, category];
      setSelectedCategories(updatedCategories);
      form.setValue(
        "categories",
        updatedCategories.map((s) => s.id)
      );
    }
  };

  const handleSpeakerToggle = (speakerId: string) => {
    // find the speaker
    const speaker = speakers.find((s) => s.id === speakerId);

    if (speaker) {
      // if speaker is already selected, remove it
      const updatedSpeakers = selectedSpeakers.includes(speaker)
        ? selectedSpeakers.filter((s) => s.id !== speaker.id)
        : [...selectedSpeakers, speaker];
      setSelectedSpeakers(updatedSpeakers);
      form.setValue(
        "speakers",
        updatedSpeakers.map((s) => s.id)
      );
    }
  };

  const onFormSubmit = async (data: EventFormData) => {
    if (!initialData?.id) {
      createEventMutation.mutate(
        { ...data, banner: bannerPreview },
        {
          onSuccess: (data) => {
            onSuccess?.(data);
          },
          onError: (error) => {
            onError?.(error);
          },
        }
      );
    } else {
      // If editing, update the event
      updateEventMutation.mutate(
        { id: initialData.id, data },
        {
          onSuccess: (data) => {
            onSuccess?.(data);
          },
          onError: (error) => {
            onError?.(error);
          },
        }
      );
    }
  };

  return {
    form,
    selectedCategories,
    selectedSpeakers,
    bannerPreview,
    isLoading,
    setBannerPreview,
    handleBannerChange,
    handleCategoryToggle,
    handleSpeakerToggle,
    onSubmit: onFormSubmit,
  };
};
