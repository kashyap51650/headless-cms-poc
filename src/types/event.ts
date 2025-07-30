export interface Event {
  id?: string;
  title: string;
  slug: string;
  date: string;
  description: string;
  banner?: string;
  bannerUrl?: string;
  isPublished: boolean;
  organizer: Organizer;
  categories: Category[];
  speakers: Speaker[];
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
}

export interface Speaker {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
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

export interface MutationResponse<T = unknown> {
  data?: T;
  error?: boolean;
  message: string;
}
