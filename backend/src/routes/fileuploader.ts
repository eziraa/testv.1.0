import express from 'express';
import FileUploader from '../utils/FileUploader'; // adjust path
const router = express.Router();

const upload = new FileUploader().getUploader();

router.post('/upload', upload.single('file'), (req, res): void => {
  if (!req.file) {
    res.status(400).json({ error: 'File not uploaded' });
    return;
  }

  const fileUrl =  new FileUploader().getFileUrl(req, req.file.filename);

  res.status(200).json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    url: fileUrl,
  });
});

export default router;
