import {z} from 'zod';
import mongoose from 'mongoose';
import { SongSchemaZod } from './song.validator';
export const PlaylistSchemaZod = z.object({
  name: z.string().min(1, "Name is required"),
  user: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid user ID"
  }),
  songs: z.array(z.string()).refine(val => val.every(id => mongoose.Types.ObjectId.isValid(id)), {
    message: "Invalid song IDs"
  }),
});

export const PlaylistUpdateSchemaZod = PlaylistSchemaZod.partial();