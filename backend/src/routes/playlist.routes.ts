import { Router } from "express";

import playlistController from "../controllers/playlist.controller";

const router = Router();

// Playlist related endpoints

router.get("/", playlistController.getAllPlaylists);
router.post("/", playlistController.createPlaylist);
router.get("/:id", playlistController.getPlaylistById);
router.put("/:id", playlistController.updatePlaylist);
router.delete("/:id", playlistController.deletePlaylist);

export default router;