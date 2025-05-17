import { z } from 'zod';

export const songSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artist: z.string().min(1, 'Artist is required'),
  genre: z.string().optional(),
  album: z.string().optional(),
  realseDate: z.string().optional(),
  audioUrl: z.string().optional(),
});

export type Song = z.infer<typeof songSchema>;
export type SongFormData = z.infer<typeof songSchema>;
