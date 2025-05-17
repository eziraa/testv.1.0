import {z} from 'zod';

export const ArtistSchemaZod = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional(),
  profilePicture: z.string().optional()
});

export const ArtistUpdateSchemaZod = ArtistSchemaZod.partial();