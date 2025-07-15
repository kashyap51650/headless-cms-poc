export interface Event {
  id?: string;
  title: string;
  slug: string;
  date: string;
  description: string;
  banner?: string;
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
  color?: string;
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
