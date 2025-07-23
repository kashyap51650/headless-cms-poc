import React from "react";
import { Upload } from "lucide-react";

interface BannerUploadSectionProps {
  bannerPreview: string | null;
  setBannerPreview: (preview: string | null) => void;
  onBannerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BannerUploadSection: React.FC<BannerUploadSectionProps> = ({
  bannerPreview,
  setBannerPreview,
  onBannerChange,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r bg-primary-500 px-6 py-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Event Banner
        </h3>
        <p className="text-purple-100 text-sm mt-1">
          Upload an eye-catching banner for your event
        </p>
      </div>
      <div className="p-6">
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors">
          {bannerPreview ? (
            <div className="relative">
              <img
                src={bannerPreview}
                alt="Banner preview"
                className="max-w-full h-48 object-cover rounded-lg mx-auto"
              />
              <button
                type="button"
                onClick={() => setBannerPreview(null)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          ) : (
            <div>
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 mb-2">Upload event banner</p>
              <p className="text-sm text-slate-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={onBannerChange}
            className="hidden"
            id="banner-upload"
          />
          <label
            htmlFor="banner-upload"
            className="inline-block mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors cursor-pointer"
          >
            Choose File
          </label>
        </div>
      </div>
    </div>
  );
};
