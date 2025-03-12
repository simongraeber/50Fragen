import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import { startEurekaClient } from "./eurekaConnection";

const app = express();
const PORT: number | string = process.env.PORT || 4002;

interface FileMetadata {
  userId: string;
  userName: string;
  userImage?: string;
  fileName: string;
  originalName: string;
  uploadedAt: Date;
}

const privateFileOwners: Map<string, FileMetadata> = new Map();

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ): void => {
    const visibility: string = (req.query.visibility as string) || "public";
    const uploadPath: string = path.join(__dirname, "../uploads", visibility);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ): void => {
    const uniqueName: string = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Only serve public files statically - no authentication required
app.use("/uploads/public", express.static(path.join(__dirname, "../uploads/public")));

// Middleware to authenticate user for private file access
const authenticatePrivateFileAccess = (req: Request, res: Response, next: NextFunction): void => {
  const userId = req.headers["x-user-id"] as string;
  const fileName = req.params.fileName;

  if (!userId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  // Get file ownership metadata
  const fileMetadata = privateFileOwners.get(fileName);

  // Check if file exists and belongs to the requesting user
  if (!fileMetadata) {
    res.status(404).json({ error: "File not found" });
    return;
  }

  if (fileMetadata.userId !== userId) {
    res.status(403).json({ error: "You don't have permission to access this file" });
    return;
  }

  next();
};

app.get("/uploads/private/:fileName", authenticatePrivateFileAccess, (req: Request, res: Response): void => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "../uploads/private", fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: "File not found or could not be sent" });
    }
  });
});

app.get("/", (req: Request, res: Response): void => {
  res.send("File management service is running 🥳");
});

app.post("/upload", upload.single("file"), (req: Request, res: Response): void => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const visibility: string = (req.query.visibility as string) || "public";
  const userId = req.headers["x-user-id"] as string;
  const userName = req.headers["x-user-name"] as string;
  const userImage = req.headers["x-user-image"] as string;

  if (visibility === "private") {
    if (!userId) {
      fs.unlinkSync(file.path);
      res.status(401).json({ error: "Authentication required for private uploads" });
      return;
    }

    privateFileOwners.set(file.filename, {
      userId,
      userName,
      userImage,
      fileName: file.filename,
      originalName: file.originalname,
      uploadedAt: new Date()
    });
  }

  const fileURL: string = `${req.protocol}://${req.get("host")}/uploads/${visibility}/${file.filename}`;

  res.json({ fileURL });
});

startEurekaClient();

app.listen(PORT, (): void => {
  console.log(`File management service is listening on port ${PORT}`);
});