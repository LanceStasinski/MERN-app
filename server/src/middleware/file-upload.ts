import multer from "multer";
import { v4 as uuid } from "uuid";

type MimeMap = {
  [key: string]: string;
};

const MIME_TYPE_MAP: MimeMap = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const fileUpload = multer({
  limits: {
    fileSize: 500000,
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype]
    if (!isValid) {
      return cb(new Error('Invalid mimetype'))
    }
    cb(null, isValid)
  }
});

export default fileUpload;
