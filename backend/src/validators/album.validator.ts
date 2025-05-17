import { z } from 'zod';

export const AlbumSchemaZod = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().regex(/^[a-f\d]{24}$/i, "Invalid artist ID"),
  releaseDate: z.coerce.date().optional(),
  coverImage: z.string().optional().refine(
    val => !val || z.string().url().safeParse(val).success,
    { message: "Invalid image URL" }
  ),
  songs: z.array(z.string().regex(/^[a-f\d]{24}$/i, "Invalid song ID")).optional(),
  genre: z.string().optional(),
});

export const AlbumUpdateSchemaZod = AlbumSchemaZod.partial();
