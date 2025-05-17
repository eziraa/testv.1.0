import mongoose, { Document, Schema } from "mongoose";

export interface IAlbum extends Document {
  title: string;
  artist: mongoose.Types.ObjectId;
  releaseDate?: Date;
  coverImage?: string;
  songs?: mongoose.Types.ObjectId[];
  genre?: string;
}

const AlbumSchema = new Schema<IAlbum>({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" },
  releaseDate: Date,
  coverImage: String,
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  genre: String,
}, { timestamps: true});

export default mongoose.model<IAlbum>("Album", AlbumSchema);
