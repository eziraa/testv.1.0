import { Request, Response } from "express";
import Artist from "../models/Artist";
import { ArtistSchemaZod } from "../validators/artist.validators";
import FileUploader from "../utils/FileUploader";
class ArtistController {
  // Method: to get all artists
  async getAllArtists(_: Request, res: Response): Promise<void> {
    try {
      const artists = await Artist.find();
      res.status(200).json(artists);
    } catch (err) {
      if (err instanceof Error && "errors" in err) {
        res.status(400).json({
          message: "Validation failed",
          errors: (err as any).errors,
        });
      }
      res.status(500).json({ message: "Internal Server error" });
    }
  }

  // Method: to get a single artist by ID
  async getArtistById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "Artist ID is required" });
      }

      const artist = await Artist.findById(id);
      if (!artist) {
        res.status(404).json({ message: "Artist not found" });
      }

      res.status(200).json(artist);
    } catch (err) {
      res.status(500).json({ message: "Internal Server error" });
    }
  }

  // Method: to create a new artist
  async createArtist(req: Request, res: Response): Promise<void> {
    try {
      let profilePictureUrl: string | undefined;

      // If image was uploaded, get its URL
      if (req.file) {
        profilePictureUrl = FileUploader.getFileUrl(req, req.file.filename);
      }

      // Parse songs from JSON string to array
      if (!req.body.songs) {
        req.body.songs = [];
      } else {
        req.body.songs = JSON.parse(req.body.songs);
      }
      const inputData = {
        ...req.body,
        profilePicture: profilePictureUrl ?? req.body.profilePicture,
      };

      const parsedData = ArtistSchemaZod.parse(inputData);

      const newArtist = new Artist(parsedData);
      await newArtist.save();

      res.status(201).json(newArtist);
    } catch (err) {
      if (err instanceof Error && "errors" in err) {
        res.status(400).json({
          message: "Validation failed",
          errors: (err as any).errors,
        });
      }
      res.status(500).json({ message: "Internal Server error" });
    }
  }

  // Method: to update an artist
  async updateArtist(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "Artist ID is required" });
      }

      let profilePictureUrl: string | undefined;
      // If image was uploaded, get its URL
      if (req.file) {
        profilePictureUrl = FileUploader.getFileUrl(req, req.file.filename);
      }
      // Parse songs from JSON string to array
      if (!req.body.songs) {
        req.body.songs = [];
      } else {
        req.body.songs = JSON.parse(req.body.songs);
      }
      const inputData = {
        ...req.body,
        profilePicture: profilePictureUrl ?? req.body.profilePicture,
      };

      const parsedData = ArtistSchemaZod.parse(inputData);
      if (!profilePictureUrl) {
        const album = await Artist.findById(req.params.id);
        if (album?.profilePicture)
          FileUploader.deleteFile(album.profilePicture);
      }
      const updatedArtist = await Artist.findByIdAndUpdate(id, parsedData, {
        new: true,
      });

      if (!updatedArtist) {
        res.status(404).json({ message: "Artist not found" });
      }

      res.status(200).json(updatedArtist);
    } catch (err) {
      if (err instanceof Error && "errors" in err) {
        res.status(400).json({
          message: "Validation failed",
          errors: (err as any).errors,
        });
      }
      res.status(500).json({ message: "Internal Server error" });
    }
  }

  // Method: to delete an artist
  async deleteArtist(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "Artist ID is required" });
      }

      const deletedArtist = await Artist.findByIdAndDelete(id);

      if (!deletedArtist) {
        res.status(404).json({ message: "Artist not found" });
      }

      res.status(200).json({ message: "Artist deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal Server error" });
    }
  }
}

export default new ArtistController();
