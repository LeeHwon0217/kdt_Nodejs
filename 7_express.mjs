import express from "express";

const app = express();

app.use((req, res, next) => {
  // next : 다음으로 넘어감
  // express 안에 들어갈 세팅들이 들어감. 미들웨어.
  res.setHeader("node-msg", "Hi! node.js!");
  next(); // 미들웨어가 여러개라면 next()를 사용해서 호출해야 한다
});

app.get("/", (req, res, next) => {
  res.send("<h2>익스프레스 서버로 만든 첫 번째 페이지</h2>");
  next();
});

app.get("/hello", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ userid: "apple", name: "김사과", age: 20 });
  next();
});

app.listen(3000, () => {
  console.log("서버 실행중");
});
