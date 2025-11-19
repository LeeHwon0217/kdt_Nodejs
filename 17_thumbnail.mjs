import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const app = express();
const port = 3000;

const uploadDir = "uploads";
const thumbDir = path.join(uploadDir, "thumb");

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|bmp/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;
  if (allowed.test(ext) && allowed.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error("이미지 파일만 업로드할 수 있습니다"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.post("/upload-image", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "파일이 없습니다" });
  const { filename, path: filePath } = req.file;
  const baseName = path.parse(filename).name;
  const thumbnailPngName = `thumb-${baseName}.png`;
  const thumbnailPath = path.join(thumbDir, thumbnailPngName);
  const width = parseInt(req.query.width) || 100;
  const height = parseInt(req.query.height) || 100;

  try {
    await sharp(filePath).resize(width, height).png().toFile(thumbnailPath);
    res.json({
      message: "업로드 및 PNG 썸네일 생성 성공",
      original: `/uploads/${filename}`,
      thumbnail: `/uploads/thumb/${thumbnailPngName}`,
      size: `${width}x${height}`,
    });
  } catch (err) {
    console.error("썸네일 생성 실패: ", err);
    res.status(500).json({ error: "썸네일 생성 실패" });
  }
});

app.use("/uploads", express.static(uploadDir));

app.listen(port, () => {
  console.log("서버 실행 중");
});
