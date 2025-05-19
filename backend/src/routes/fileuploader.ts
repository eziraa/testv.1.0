import express from 'express';
import fileUploader from '../utils/FileUploader'; // adjust path
const router = express.Router();

const upload = fileUploader.getUploader();

router.post('/upload', upload.single('file'), (req, res): void => {
  if (!req.file) {
    res.status(400).json({ error: 'File not uploaded' });
    return;
  }

  const fileUrl = fileUploader.getFileUrl(req, req.file.filename);

  res.status(200).json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    url: fileUrl,
  });
});

export default router;
