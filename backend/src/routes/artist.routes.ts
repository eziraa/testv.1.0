import { Router } from "express";

import artistController from "../controllers/artist.controller";
import FileUploader from "../utils/FileUploader";
const router = Router();
const uploader = new FileUploader("profilePictures").getUploader();

// Artist related endpoints
router.get("/", artistController.getAllArtists);
router.post(
  "/",
  uploader.single("profilePicture"),
  artistController.createArtist
);
router.get("/:id", artistController.getArtistById);
router.put(
  "/:id",
  uploader.single("profilePicture"),
  artistController.updateArtist
);
router.delete("/:id", artistController.deleteArtist);

export default router;
