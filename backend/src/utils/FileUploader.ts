import multer, { Multer } from 'multer';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const VALID_MIME_TYPES = ['image/', 'audio/'];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

export class FileUploader {
  private uploadFolder: string;

  constructor(folderName: string = 'uploads') {
    this.uploadFolder = path.join(__dirname, `../public/${folderName}`);

    // Ensure upload directory exists
    if (!fs.existsSync(this.uploadFolder)) {
      fs.mkdirSync(this.uploadFolder, { recursive: true });
    }
  }

  public getUploader(): Multer {
    console.log("Upload Folder",this.uploadFolder)
    return multer({
      storage: multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, this.uploadFolder),
        filename: (req, file, cb) => {
          console.log("Before")
          console.log("File Name: ", file.originalname);
          console.log("File Path: ", file.path);
          console.log("File URL: ", this.getFileUrl(req, file.filename));
          const ext = path.extname(file.originalname);
          const baseName = req.body?.fileName?.trim();

          // Sanitize custom fileName and fall back to UUID
          const safeName = baseName
            ? `${baseName.replace(/[^a-z0-9_\-]/gi, '_')}${ext}`
            : `${uuidv4()}${ext}`;

          cb(null, safeName);

          console.log("After")
          console.log("File Name: ", file.originalname);
          console.log("File Path: ", file.path);
          console.log("File URL: ", this.getFileUrl(req, file.filename));
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (!VALID_MIME_TYPES.some(valid_mime_type => file.mimetype.startsWith(valid_mime_type))) {
          console.log(`Invalid file type: ${file.mimetype}`);
          cb(null, false);
        } else {
          cb(null, true);
        }
      },
      limits: {
        fileSize: MAX_IMAGE_SIZE,
      },
    });
  }

  public getFileUrl(req: any, filename: string): string {
    return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
  }

  public deleteFile(filename: string): void {
    const filePath = path.join(this.uploadFolder, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

export default  FileUploader;
