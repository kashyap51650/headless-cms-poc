export interface Event {
  id?: string;
  title: string;
  slug: string;
  date: string;
  description: string;
  banner?: File | string;
  isPublished: boolean;
  organizer: string;
  categories: string[];
  speakers: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Organizer {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  color?: string;
}

export interface Speaker {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  title?: string;
  company?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface EventFormData {
  title: string;
  slug: string;
  date: string;
  description: string;
  banner?: any;
  isPublished: boolean;
  organizer: string;
  categories: string[];
  speakers: string[];
}
