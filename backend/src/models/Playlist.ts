import mongoose, { Document, Schema } from "mongoose";

export interface IPlaylist extends Document {
  name: string;
  user: mongoose.Types.ObjectId;
  songs: mongoose.Types.ObjectId[];
}

const PlaylistSchema = new Schema<IPlaylist>({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
}, { timestamps: true });

export default mongoose.model<IPlaylist>("Playlist", PlaylistSchema);
