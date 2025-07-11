import React from "react";
import { Image, Upload } from "lucide-react";
import { Card } from "../ui/Card";

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
    <Card title="Event Banner" icon={<Image className="w-6 h-6" />}>
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
    </Card>
  );
};
