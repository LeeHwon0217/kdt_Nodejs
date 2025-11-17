const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// 미들웨어 설정. 이거 안하면 post로 못 받는다
// POST 요청용
app.use(express.urlencoded({ extended: true })); // 앱이 켜지자마자 등록되게 하려면 이렇게 그냥 가도 된다
app.use(express.static("public")); // 정적 파일 제공. public은 폴더 이름
// /forms로 URL 접근, 실제 물리적 경로는 public/form
// http://localhost:3000/forms/post_test.html
app.use("/forms", express.static("public/form"));

// EJS 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 라우팅
app.get("/", (req, res) => {
  res.send("홈페이지입니다. 다양한 기능을 테스트하세요");
});

app.get("/hello", (req, res) => {
  res.render("index", { name: "김사과" });
});

// URL 파라미터
// "http://localhost:3000/user/100"
app.get("/user/:id", (req, res) => {
  res.send(`요청한 사용자 ID는 ${req.params.id}입니다`);
});

// 쿼리 스트링
// 뒤에 물음표가 붙은 것
// http://localhost:3000/search?keyword=날씨
app.get("/search", (req, res) => {
  const { keyword } = req.query;
  res.send(`검색어: ${keyword}`);
});

// post 요청 처리
app.post("/submit", (req, res) => {
  const { name, age } = req.body;
  res.send(`이름: ${name}, 나이: ${age}`);
});

app.listen(port, () => {
  console.log("서버 실행 중");
});
