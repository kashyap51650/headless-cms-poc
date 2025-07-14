// System metadata
type Sys<T extends string = "Entry" | "Asset"> = {
  id: string;
  type: T;
  createdAt?: string;
  updatedAt?: string;
  locale?: string;
  space?: Link<"Space">;
  environment?: Link<"Environment">;
  contentType?: Link<"ContentType">;
  publishedVersion?: number;
  revision?: number;
  linkType?: string;
};

// Generic link type
type Link<T extends string> = {
  sys: {
    type: "Link";
    linkType: T;
    id: string;
  };
};

// Asset file details
type Asset = {
  metadata: { tags: any[]; concepts: any[] };
  sys: Sys<"Asset">;
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      fileName: string;
      contentType: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
    };
  };
};

// Generic Entry type
type Entry<T extends Record<string, any> = any> = {
  metadata: { tags: any[]; concepts: any[] };
  sys: Sys<"Entry">;
  fields: T;
};

// Full Contentful API response
type ContentfulResponse<T extends Record<string, any>> = {
  sys: { type: "Array" };
  total: number;
  skip: number;
  limit: number;
  items: Entry<T>[];
  includes?: {
    Entry?: Entry<any>[];
    Asset?: Asset[];
  };
};

type EventFields = {
  title: string;
  slug: string;
  date: string;
  description: string;
  banner: Link<"Asset">;
  isPublished: boolean;
  organizer: Link<"Entry">;
  categories: Link<"Entry">[];
  speakers: Link<"Entry">[];
};

type CategoryFields = {
  title: string;
  slug: string;
};

type SpeakerFields = {
  name: string;
  avtar: Link<"Asset">;
};

type AuthorFields = {
  name: string;
  image: Link<"Asset">;
};

export type EventEntry = Entry<EventFields>;
export type SpeakerEntry = Entry<SpeakerFields>;
export type CategoryEntry = Entry<CategoryFields>;
export type AuthorEntry = Entry<AuthorFields>;

export type EventResponse = ContentfulResponse<EventFields>;
export type CategoryResponse = ContentfulResponse<CategoryFields>;
export type SpeakerResponse = ContentfulResponse<SpeakerFields>;
export type AuthorResponse = ContentfulResponse<AuthorFields>;
