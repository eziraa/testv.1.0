import mongoose, { Document, Schema } from "mongoose";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  favorites: mongoose.Types.ObjectId[];
  generateAuthToken: () => {accessToken: string, refreshToken: string};
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
}, { timestamps: true });


UserSchema.methods.generateAuthToken = function (): {accessToken:string, refreshToken: string} {
  const accessToken = jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET || "defaultSecret", {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET || "defaultSecret", {
    expiresIn: "7d",
  });

  return {
    accessToken,
    refreshToken
  };
};

 export const verifyRefreshToken = function (refreshToken: string) {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "defaultSecret");
    return decoded;
  } catch (error) {
    console.error("Invalid refresh token:", error);
    return null;
  }
};
export default mongoose.model<IUser>("User", UserSchema);