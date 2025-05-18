import { z } from 'zod';

export const playlistSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  user: z.string().min(1, 'User is required'),
  songs: z.array(z.string()).optional(),
});

export type Playlist = z.infer<typeof playlistSchema>;
export type PlaylistFormData = z.infer<typeof playlistSchema>;
