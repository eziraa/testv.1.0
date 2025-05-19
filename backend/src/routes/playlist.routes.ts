import { Router } from "express";

import playlistController from "../controllers/playlist.controller";
import FileUploader from "../utils/FileUploader";

const uploader = new FileUploader('playlistCoverImages').getUploader();
const router = Router();

// Playlist related endpoints

router.get("/", playlistController.getAllPlaylists);
router.post(
  "/",
  uploader.single("coverImage"),
  playlistController.createPlaylist
);
router.get("/:id", playlistController.getPlaylistById);
router.put(
  "/:id",
  uploader.single("coverImage"),
  playlistController.updatePlaylist
);
router.delete("/:id", playlistController.deletePlaylist);

export default router;
