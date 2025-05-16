import {z} from 'zod';

export const PlaylistSchemaZod = z.object({
  name: z.string().min(1, "Name is required"),
  user: z.string().regex(/^[a-f\d]{24}$/i, "Invalid user ID"),
  songs: z.array(z.string().regex(/^[a-f\d]{24}$/i, "Invalid song ID")).optional(),
});

export const PlaylistUpdateSchemaZod = PlaylistSchemaZod.partial();