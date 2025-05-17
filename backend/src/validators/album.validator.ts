import { z } from 'zod';

export const AlbumSchemaZod = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().regex(/^[a-f\d]{24}$/i, "Invalid artist ID"),
  releaseDate: z.coerce.date().optional(),
  coverImage: z.string().url("Invalid URL").optional(),
  songs: z.array(z.string().regex(/^[a-f\d]{24}$/i, "Invalid song ID")).optional(),
  genre: z.string().optional(),
});

export const AlbumUpdateSchemaZod = AlbumSchemaZod.partial();
