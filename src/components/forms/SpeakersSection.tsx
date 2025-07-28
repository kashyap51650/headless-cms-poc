import React from "react";
import type { Speaker } from "../../types/event";
import { useSpeakers } from "../../hooks/useSpeakers";

interface SpeakersSectionProps {
  selectedSpeakers: Speaker[];
  onSpeakerToggle: (speakerId: string) => void;
}

export const SpeakersSection: React.FC<SpeakersSectionProps> = ({
  selectedSpeakers,
  onSpeakerToggle,
}) => {
  const { speakers } = useSpeakers();

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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Speakers
        </h3>
        <p className="text-cyan-100 text-sm mt-1">Who will be speaking</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {speakers.map((speaker) => (
            <label
              key={speaker.id}
              className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedSpeakers.includes(speaker)}
                onChange={() => onSpeakerToggle(speaker.id)}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="ml-3 text-slate-700">{speaker.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
