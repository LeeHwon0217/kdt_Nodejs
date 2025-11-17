import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  console.log("users에 존재하는 미들웨어");
  next();
});

// 라우팅
router.get("/", (req, res) => {
  res.status(200).send("GET: /users 회원정보보기");
});
router.post("/", (req, res) => {
  res.status(200).send("POST: /users 회원가입");
});
router.put("/:id", (req, res) => {
  res.status(201).send("PUT: /users/:id 회원정보수정"); // 수정은 201
});
router.delete("/:id", (req, res) => {
  res.status(200).send("DELETE: /users 회원탈퇴");
});

export default router;
