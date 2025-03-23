import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import { startEurekaClient } from "./eurekaConnection";

const index = express();
const PORT: number | string = process.env.PORT || 4002;

interface FileMetadata {
  userId: string;
  userName: string;
  userImage?: string;
  fileName: string;
  originalName: string;
  uploadedAt: Date;
  visibility: string;
}

const fileOwners: Map<string, FileMetadata> = new Map();

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

index.use(express.json());
index.use(express.urlencoded({ extended: true }));

// Serve public files statically (no authentication required)
index.use("/uploads/public", express.static(path.join(__dirname, "../uploads/public")));

// Middleware to require authentication for deletion (or any authenticated actions)
const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
  const userId = req.headers["x-user-id"] as string;
  if (!userId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  // Store authenticated user id in the body for later use.
  req.body.authenticatedUserId = userId;
  next();
};

// Middleware to protect private file access
const authenticatePrivateFileAccess = (req: Request, res: Response, next: NextFunction): void => {
  const userId = req.headers["x-user-id"] as string;
  const fileName = req.params.fileName;

  if (!userId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  const fileMetadata = fileOwners.get(fileName);
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

index.get("/uploads/private/:fileName", authenticatePrivateFileAccess, (req: Request, res: Response): void => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "../uploads/private", fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: "File not found or could not be sent" });
    }
  });
});

index.get("/", (req: Request, res: Response): void => {
  res.send("File management service is running 🥳");
});

index.post("/upload", upload.single("file"), (req: Request, res: Response): void => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const visibility: string = (req.query.visibility as string) || "public";
  const userId = req.headers["x-user-id"] as string;
  const userName = req.headers["x-user-name"] as string;
  const userImage = req.headers["x-user-image"] as string;

  if (visibility === "private" && !userId) {
    fs.unlinkSync(file.path);
    res.status(401).json({ error: "Authentication required for private uploads" });
    return;
  }

  if (userId) {
    fileOwners.set(file.filename, {
      userId,
      userName,
      userImage,
      fileName: file.filename,
      originalName: file.originalname,
      uploadedAt: new Date(),
      visibility
    });
  }
  const filePathForGateway = `/uploads/${visibility}/${file.filename}`;
  res.json({ fileURL: filePathForGateway });
});

index.delete("/uploads/:visibility/:fileName", authenticateUser, (req: Request, res: Response): void => {
  const { visibility, fileName } = req.params;
  const userId = req.body.authenticatedUserId;
  const fileMetadata = fileOwners.get(fileName);

  if (!fileMetadata) {
    res.status(404).json({ error: "File not found" });
    return;
  }

  if (fileMetadata.userId !== userId) {
    res.status(403).json({ error: "You don't have permission to delete this file" });
    return;
  }

  const filePath = path.join(__dirname, "../uploads", visibility, fileName);
  fs.unlink(filePath, (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to delete file", details: err.message });
      return;
    }
    fileOwners.delete(fileName);
    res.json({ success: true, message: "File deleted" });
  });
});

if (process.env.NODE_ENV !== "test") {
  startEurekaClient();
}

if (require.main === module) {
  index.listen(PORT, () => {
    console.log(`File management service is listening on port ${PORT}`);
  });
}
export default index;
