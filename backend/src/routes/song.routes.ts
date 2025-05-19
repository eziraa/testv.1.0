import express from "express";
import songController from "../controllers/song.controller";
import { AuthenticatedOnly } from "../middleware/auth.middleware";
import FileUploader from "../utils/FileUploader";


const router = express.Router();
const uploader = new FileUploader("songs").getUploader();
router.get("/", songController.getAllSongs);
router.post("/", uploader.single("audio"), songController.createSong);
router.get("/:id", songController.getSongById);
router.put("/:id", uploader.single("audio"), songController.updateSong);
router.delete("/:id", songController.deleteSong);
router.patch(
  "/:songId/favorite",
  AuthenticatedOnly,
  songController.favoriteSong
);

export default router;
