import { z } from "zod";

export const eventSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    ),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  banner: z.any().optional(),
  isPublished: z.boolean(),
  organizer: z.string().min(1, "Organizer is required"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  speakers: z.array(z.string()),
});

export type EventFormData = z.infer<typeof eventSchema>;
