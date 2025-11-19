import express from "express";
import multer from "multer";
import fs from "fs";

const app = express();
const port = 3000;

app.use(express.static("public")); // 정적 파일 제공. public은 폴더 이름

/*
    multer.diskStorage : 디스크(로컬 폴더)에 파일을 저장하는 방식을 설정하는 함수
    destination : 파일을 어느 폴더에 저장할지 설정
        req : 현재 HTTP 요청 객체
        file : upload된 파일 정보가 들어있는 객체
        cb : 정상적으로 들어갔는지 확인. 에러 객체와 저장 경로를 콜백으로 multer에게 알려줌
    filename : 업로드된 파일의 실제 저장 파일명을 결정
        req : 현재 HTTP 요청 객체
        file : 업로드된 파일 정보
        cb(error, filename) : 두 번째 매개변수가 실제 저장될 파일명
*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb : callback
    const uploadPath = "./uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath); // null은 에러객체
  },
  filename: (req, file, cb) => {
    // Date.now() : 현재 시간을 밀리초 단위로 반환
    // Math.random() : 0 이상 1 미만의 랜덤한 실수
    // 1e9 : 0 ~ 1,000,000,000 사이의 랜덤 숫자
    // Math.round() : 소수점 반올림
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}); // multer 객체 만듦

app.post("/upload-single", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.json({
    message: "단일 파일 업로드 성공",
    file: req.file,
  });
});

app.post("/upload-multiple", upload.array("files", 5), (req, res) => {
  console.log(req.files);
  res.json({
    message: "다중 파일 업로드 성공",
    files: req.files,
  });
});

app.listen(port, () => {
  console.log("서버 실행중");
});
