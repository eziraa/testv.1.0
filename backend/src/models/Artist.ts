 import mongoose, { Document, Schema } from 'mongoose';
  
  export interface IArtist extends Document {
    name: string;
    bio?: string;
    profilePicture?: string;
  }
  
  const ArtistSchema = new Schema<IArtist>({
    name: { type: String, required: true },
    bio: { type: String },
    profilePicture: { type: String },
  });

  export default mongoose.model<IArtist>('Artist', ArtistSchema);
