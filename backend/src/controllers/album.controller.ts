import { Request, Response } from "express";
import Album from "../models/Album";
import {
  AlbumSchemaZod,
  AlbumUpdateSchemaZod,
} from "../validators/album.validator";
import FileUploader from "../utils/FileUploader";
const fileUploader = new FileUploader()
class AlbumController {
  // METHOD: To get all albums
  async getAllAlbums(_: Request, res: Response) {
    const albums = await Album.find().populate("artist");
    res.json(albums);
  }

  // METHOD: to create new album
  async createAlbum(req: Request, res: Response) {
    try {
      let coverImageUrl: string | undefined;

      // If image was uploaded, get its URL
      if (req.file) {
        coverImageUrl = fileUploader.getFileUrl(req, req.file.path);
      }

      // Parse songs from JSON string to array
      if (!req.body.songs || req.body.songs === 'undefined') {
        req.body.songs = [];
      } else {
        req.body.songs = JSON.parse(req.body.songs || "[]");
      }
      const inputData = {
        ...req.body,
        coverImage: coverImageUrl ?? req.body.coverImage,
      };

      const parsed = AlbumSchemaZod.parse(inputData);
      const album = new Album(parsed);
      await album.save();
      res.status(201).json(album);
    } catch (err) {
      if (err instanceof Error && "errors" in err) {
        res.status(400).json({
          message: "Validation failed",
          errors: (err as any).errors,
        });
      }
      console.log(err)
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // METHOD: to get album by ID
  async getAlbumById(req: Request, res: Response) {
    try {
      const album = await Album.findById(req.params.id).populate("artist");
      if (!album) res.status(404).json({ message: "Album not found" });
      res.json(album);
    } catch {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // METHOD: to update album
  async updateAlbum(req: Request, res: Response) {
    try {
      let coverImageUrl: string | undefined;
      // If image was uploaded, get its URL
      if (req.file) {
        coverImageUrl = fileUploader.getFileUrl(req, req.file.path);
      }
      // Parse songs from JSON string to array
      if (!req.body.songs) {
        req.body.songs = [];
      } else {
        req.body.songs = JSON.parse(req.body.songs);
      }
      const inputData = {
        ...req.body,
        coverImage: coverImageUrl ?? req.body.coverImage,
      };

      const parsed = AlbumUpdateSchemaZod.parse(inputData);
      // Delete the coverImage property if it is not provided
      if (!coverImageUrl) {
        const album = await Album.findById(req.params.id);
        if (album?.coverImage)
          fileUploader.deleteFile(album.coverImage);
      }
      const album = await Album.findByIdAndUpdate(req.params.id, parsed, {
        new: true,
      });
      if (!album) res.status(404).json({ message: "Album not found" });
      res.json(album);
    } catch (err) {
      if (err instanceof Error && "errors" in err) {
        res.status(400).json({
          message: "Validation failed",
          errors: (err as any).errors,
        });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // DELETE /albums/:id
  async deleteAlbum(req: Request, res: Response) {
    
    try {
      const album = await Album.findById(req.params.id)  
      
      if(!album)
        res.status(404).json({message: "Album not found with this ID"})
      else{
        if(album.coverImage)
          fileUploader.deleteFile(album.coverImage)
      }
      await Album.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (error) {
      
    }
  }
}

export default new AlbumController();
