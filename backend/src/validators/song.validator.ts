import { z } from 'zod';
import mongoose from 'mongoose';

export const SongSchemaZod = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid artist ID"
  }),
  album: z.string().optional().refine(
    val => val === undefined || mongoose.Types.ObjectId.isValid(val),
    { message: "Invalid album ID" }
  ),
  genre: z.string().optional(),
  audioUrl: z.string().optional().refine(
    val => val === undefined || z.string().url().safeParse(val).success,
    { message: "Invalid audio URL" }
  ),
  releaseDate: z.union([z.string().datetime(), z.date()]).optional()
});
export type SongInput = z.infer<typeof SongSchemaZod>;
export const SongUpdateSchemaZod = SongSchemaZod.partial().extend({
  artist: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid artist ID"
  }),
  album: z.string().optional().refine(
    val => val === undefined || mongoose.Types.ObjectId.isValid(val),
    { message: "Invalid album ID" }
  ),
});
export type SongUpdateInput = z.infer<typeof SongUpdateSchemaZod>;