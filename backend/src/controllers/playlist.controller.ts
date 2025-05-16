import { Request, Response } from "express";

import Playlist from "../models/Playlist";
import {
  PlaylistSchemaZod,
  PlaylistUpdateSchemaZod,
} from "../validators/playlist.validator";

class PlaylistController {
  // METHOD: to get all playlists
  async getAllPlaylists(req: Request, res: Response) {
    try {
      const playlists = await Playlist.find();
      res.status(200).json(playlists);
    } catch (error) {
      res.status(500).json({ message: "Error fetching playlists", error });
    }
  }

  // METHOD: to create a new playlist
  async createPlaylist(req: Request, res: Response) {
    try {
      const validatedData = PlaylistSchemaZod.parse(req.body);
      const newPlaylist = new Playlist(validatedData);
      await newPlaylist.save();
      res.status(201).json(newPlaylist);
    } catch (error) {
      if (error instanceof Error && "errors" in error) {
        res.status(400).json({
          message: "Validation failed",
          errors: (error as any).errors,
        });
      }
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  // METHOD: to get a playlist by ID
  async getPlaylistById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Playlist ID is required" });
      }

      const playlist = await Playlist.findById(id);
      if (!playlist) {
        res.status(404).json({ message: "Playlist not found" });
      }

      res.status(200).json(playlist);
    } catch (error) {
      res.status(500).json({ message: "Error fetching playlist", error });
    }
  }

  // METHOD: to update a playlist by ID
  async updatePlaylist(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Playlist ID is required" });
      }

      const validatedData = PlaylistUpdateSchemaZod.parse(req.body);
      const updatedPlaylist = await Playlist.findByIdAndUpdate(
        id,
        validatedData,
        { new: true }
      );
      if (!updatedPlaylist) {
        res.status(404).json({ message: "Playlist not found" });
      }

      res.status(200).json(updatedPlaylist);
    } catch (error) {
      if (error instanceof Error && "errors" in error) {
        res.status(400).json({
          message: "Validation failed",
          errors: (error as any).errors,
        });
      }
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  // METHOD: to delete a playlist by ID
  async deletePlaylist(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Playlist ID is required" });
      }

      const deletedPlaylist = await Playlist.findByIdAndDelete(id);
      if (!deletedPlaylist) {
        res.status(404).json({ message: "Playlist not found" });
      }

      res.status(200).json({ message: "Playlist deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting playlist", error });
    }
  }
}

export default new PlaylistController();
