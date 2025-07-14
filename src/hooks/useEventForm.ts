import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventService } from "../services/eventService";
import { eventSchema, type EventFormData } from "../schemas/eventSchema";

interface UseEventFormProps {
  initialData?: Partial<EventFormData & { id?: string }>;
  onSubmit?: (data: EventFormData) => void;
}

export const useEventForm = ({
  initialData,
  onSubmit,
}: UseEventFormProps = {}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialData?.categories || []
  );
  const [selectedSpeakers, setSelectedSpeakers] = useState<string[]>(
    initialData?.speakers || []
  );
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      date: initialData?.date || "",
      description: initialData?.description || "",
      isPublished: initialData?.isPublished || false,
      organizer: initialData?.organizer || "",
      categories: selectedCategories,
      speakers: selectedSpeakers,
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
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(updatedCategories);
    form.setValue("categories", updatedCategories);
  };

  const handleSpeakerToggle = (speakerId: string) => {
    const updatedSpeakers = selectedSpeakers.includes(speakerId)
      ? selectedSpeakers.filter((id) => id !== speakerId)
      : [...selectedSpeakers, speakerId];

    setSelectedSpeakers(updatedSpeakers);
    form.setValue("speakers", updatedSpeakers);
  };

  const onFormSubmit = async (data: EventFormData) => {
    try {
      console.log("Form submitted:", data);

      // If this is a new event (no initial ID), create it
      if (!initialData?.id) {
        const eventData = {
          title: data.title,
          slug: data.slug,
          date: data.date,
          description: data.description,
          banner: data.banner,
          isPublished: data.isPublished,
          organizer: data.organizer,
          categories: data.categories,
          speakers: data.speakers,
        };

        const createdEvent = await EventService.createEvent(eventData);
        console.log("Event created:", createdEvent);
      } else {
        // If editing, update the event
        const updatedEvent = await EventService.updateEvent(
          initialData.id,
          data
        );
        console.log("Event updated:", updatedEvent);
      }

      // Call the provided onSubmit callback
      onSubmit?.(data);
    } catch (error) {
      console.error("Error saving event:", error);
      // You might want to show an error toast or notification here
    }
  };

  return {
    form,
    selectedCategories,
    selectedSpeakers,
    bannerPreview,
    setBannerPreview,
    handleBannerChange,
    handleCategoryToggle,
    handleSpeakerToggle,
    onFormSubmit,
  };
};
