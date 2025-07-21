import React from "react";
import { useEventForm } from "../hooks/useEventForm";
import type { Event } from "../types/event";
import { Button } from "./ui/Button";
import {
  EventHeader,
  BasicInfoSection,
  BannerUploadSection,
  OrganizerSection,
  CategoriesSection,
  SpeakersSection,
  PublishSettingsSection,
  FormActions,
} from "./index";
import { useLocation, useNavigate } from "react-router";

export const PublishEvent: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const editingEvent = (state?.event as Event) || null;

  const formInitialData = editingEvent
    ? {
        title: editingEvent.title,
        slug: editingEvent.slug,
        date: editingEvent.date
          ? new Date(editingEvent.date).toISOString().slice(0, 16)
          : "",
        description: editingEvent.description,
        organizer: editingEvent.organizer.id,
        categories: editingEvent.categories.map((cat) => cat.id),
        speakers: editingEvent.speakers.map((speaker) => speaker.id),
        isPublished: false, // Default to false for editing
        banner: editingEvent.banner,
        id: editingEvent?.id,
      }
    : undefined;

  const {
    form,
    selectedCategories,
    selectedSpeakers,
    bannerPreview,
    setBannerPreview,
    handleBannerChange,
    handleCategoryToggle,
    handleSpeakerToggle,
    isLoading,
    onSubmit,
  } = useEventForm({ initialData: formInitialData });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;
  const isPublished = watch("isPublished");
  const title = watch("title");

  const onBackButtonClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}

        <div className="mb-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBackButtonClick}
            className="inline-flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </Button>
        </div>

        <EventHeader
          isPublished={isPublished}
          title={
            title ||
            (editingEvent ? `Edit ${editingEvent.title}` : "Create New Event")
          }
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <BasicInfoSection register={register} errors={errors} />

          <BannerUploadSection
            bannerPreview={bannerPreview}
            setBannerPreview={setBannerPreview}
            onBannerChange={handleBannerChange}
          />

          <OrganizerSection register={register} errors={errors} />
          <CategoriesSection
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            errors={errors}
          />

          <SpeakersSection
            selectedSpeakers={selectedSpeakers}
            onSpeakerToggle={handleSpeakerToggle}
          />

          <PublishSettingsSection
            register={register}
            isPublished={isPublished}
          />

          <FormActions saveDraft={!isPublished} isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
};
