import {z} from 'zod';

export const ArtistSchemaZod = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional(),
  profilePicture: z.string().url("Invalid URL").optional(),
});

export const ArtistUpdateSchemaZod = ArtistSchemaZod.partial();