import React from "react";
import { useEventForm } from "../hooks/useEventForm";
import type { EventFormData } from "../schemas/eventSchema";
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

interface PublishEventProps {
  onSubmit?: (data: EventFormData) => void;
  initialData?: Partial<EventFormData>;
  isLoading?: boolean;
}

export const PublishEvent: React.FC<PublishEventProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
}) => {
  const {
    form,
    selectedCategories,
    selectedSpeakers,
    bannerPreview,
    setBannerPreview,
    handleBannerChange,
    handleCategoryToggle,
    handleSpeakerToggle,
    onFormSubmit,
  } = useEventForm({ initialData, onSubmit });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = form;
  const isPublished = watch("isPublished");
  const title = watch("title");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        <EventHeader isPublished={isPublished} title={title} />

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
          <BasicInfoSection register={register} errors={errors} />

          <BannerUploadSection
            bannerPreview={bannerPreview}
            setBannerPreview={setBannerPreview}
            onBannerChange={handleBannerChange}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <OrganizerSection register={register} errors={errors} />
            <CategoriesSection
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              errors={errors}
            />
          </div>

          <SpeakersSection
            selectedSpeakers={selectedSpeakers}
            onSpeakerToggle={handleSpeakerToggle}
          />

          <PublishSettingsSection
            register={register}
            isPublished={isPublished}
          />

          <FormActions
            isValid={isValid}
            isLoading={isLoading}
            onSaveDraft={() => console.log("Save as draft")}
          />
        </form>
      </div>
    </div>
  );
};
