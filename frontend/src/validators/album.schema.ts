import { z } from 'zod';

export const albumSchema = z.object({
  title: z.string().min(1, 'Name is required'),
  artist: z.string().min(1, 'Artist is required'),
  genre: z.string().optional(),
  releaseDate: z.string().date("Date is required"),
  coverImage: z.string().optional(),
  songs: z.array(z.string()).optional(),
});

export type Album = z.infer<typeof albumSchema>;
export type AlbumFormData = z.infer<typeof albumSchema>;
