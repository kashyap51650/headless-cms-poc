import React from "react";
import { Users } from "lucide-react";
import { Card } from "../ui/Card";
import { speakerList } from "../../data";
import type { Speaker } from "../../types/event";

interface SpeakersSectionProps {
  selectedSpeakers: Speaker[];
  onSpeakerToggle: (speakerId: string) => void;
}

export const SpeakersSection: React.FC<SpeakersSectionProps> = ({
  selectedSpeakers,
  onSpeakerToggle,
}) => {
  return (
    <Card title="Speakers" icon={<Users className="w-6 h-6" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {speakerList.map((speaker) => (
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
    </Card>
  );
};
