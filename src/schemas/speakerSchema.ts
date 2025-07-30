import z from "zod";

export const speakerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional(),
  avtarUrl: z.string().optional(),
});

export type SpeakerFormData = z.infer<typeof speakerSchema>;
