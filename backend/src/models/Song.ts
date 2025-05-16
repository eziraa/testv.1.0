import mongoose, { Document, Schema } from 'mongoose';
  
  export interface ISong extends Document {
    title: string;
    artist: mongoose.Types.ObjectId ;
    album?: mongoose.Types.ObjectId  ;
    genre?: string;
    audioUrl: string;
    releaseDate?: Date;
  }
  
  const SongSchema = new Schema<ISong>({
    title: { type: String, required: true },
    artist: { type: mongoose.Schema.Types.ObjectId , ref: 'Artist' },
    album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
    genre: String,
    audioUrl: { type: String, required: true },
    releaseDate: { type: Date, default: Date.now },
  });
  
  export default mongoose.model<ISong>('Song', SongSchema);
  