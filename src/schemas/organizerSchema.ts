import z from "zod";

export const organizerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email().min(1, "Email is required"),
  avatar: z.string().optional(),
});

export type OrganizerFormData = z.infer<typeof organizerSchema>;
