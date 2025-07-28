import React from "react";
import { useEventForm } from "../hooks/useEventForm";
import type { Event } from "../types/event";
import {
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
        isPublished: false, // Default to false for editingw
        banner: editingEvent.banner,
        bannerUrl: editingEvent.bannerUrl,
        id: editingEvent?.id,
      }
    : undefined;

  const onSuccess = () => {
    console.log("Event created/updated successfully");
    navigate("/draftEvents");
  };

  const onError = () => {
    console.error("Error creating/updating event:");
  };

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
  } = useEventForm({ initialData: formInitialData, onSuccess, onError });

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
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Header Section */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackButtonClick}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all duration-200 group"
              >
                <svg
                  className="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors"
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
              </button>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-1">
                  {title ||
                    (editingEvent
                      ? `Edit ${editingEvent.title}`
                      : "Create New Event")}
                </h1>
                <p className="text-slate-600">
                  {editingEvent
                    ? "Update your event details"
                    : "Fill in the details to create your amazing event"}
                </p>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-3">
              <div
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  isPublished
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-amber-100 text-amber-700 border border-amber-200"
                }`}
              >
                {isPublished ? "Published Event" : "Draft Event"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <BasicInfoSection register={register} errors={errors} />
              <BannerUploadSection
                register={register}
                bannerPreview={bannerPreview}
                setBannerPreview={setBannerPreview}
                onBannerChange={handleBannerChange}
              />
              <OrganizerSection register={register} errors={errors} />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
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
            </div>
          </div>

          {/* Bottom Action Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <FormActions saveDraft={!isPublished} isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
};
