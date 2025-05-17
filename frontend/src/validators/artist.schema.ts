import { z } from 'zod';

export const artistSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bio: z.string().optional(),
  profilePicture: z.string().optional(),
});

export type Artist = z.infer<typeof artistSchema>;
export type ArtistFormData = z.infer<typeof artistSchema>;
