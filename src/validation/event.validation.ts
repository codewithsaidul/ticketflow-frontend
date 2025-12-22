import z from "zod";

export const eventCreationSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.."),
  date: z.string().optional(),
  location: z.string().min(5, "Location is required."),
  category: z.string().min(1, "Category is required."),
  status: z.string().optional(),

  // 🔥 FIX 1: z.preprocess এর বদলে z.coerce.number()
  rows: z.number().int().min(1, "Minimum 1 row required."),
  cols: z.number().int().min(1, "Minimum 1 column required."),
  basePrice: z.number().min(0.01, "Price must be greater than zero."),

  minParticipants: z.number().int().min(1).default(1),
  maxParticipants: z.number().int().min(1).optional(),

  imageFile: z.any().optional(),
});

export type EventCreationFormValues = z.infer<typeof eventCreationSchema>;
