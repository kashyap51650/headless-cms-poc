import type { EntrySkeletonType, Asset } from "contentful";

// Category content type
export interface CategorySkeleton extends EntrySkeletonType {
  contentTypeId: "category";
  fields: {
    title: string;
    slug: string;
  };
}

// Speaker content type
export interface SpeakerSkeleton extends EntrySkeletonType {
  contentTypeId: "speaker";
  fields: {
    name: string;
    bio?: string;
    avatar?: Asset;
    avtarUrl?: string;
  };
}

// Author/Organizer content type
export interface AuthorSkeleton extends EntrySkeletonType {
  contentTypeId: "author";
  fields: {
    name: string;
    email?: string;
    image?: Asset;
    avtarUrl?: string;
  };
}

// Event content type
export interface EventSkeleton extends EntrySkeletonType {
  contentTypeId: "event";
  fields: {
    title: string;
    slug: string;
    date: string;
    description: string;
    banner?: Asset;
    bannerURL?: string;
    isPublished: boolean;
    organizer?: AuthorSkeleton;
    categories?: CategorySkeleton[];
    speakers?: SpeakerSkeleton[];
  };
}

// Legacy types for backward compatibility
export type EventFields = EventSkeleton["fields"];
export type CategoryFields = CategorySkeleton["fields"];
export type SpeakerFields = SpeakerSkeleton["fields"];
export type AuthorFields = AuthorSkeleton["fields"];

export type EventEntry = EventSkeleton;
export type CategoryEntry = CategorySkeleton;
export type SpeakerEntry = SpeakerSkeleton;
export type AuthorEntry = AuthorSkeleton;

export interface ContentfulError {
  sys: {
    type: "Error";
    id: string;
  };
  message: string;
  details?: {
    errors?: {
      name: string;
      path?: string[];
      details?: string;
    }[];
  };
  requestId?: string;
}
