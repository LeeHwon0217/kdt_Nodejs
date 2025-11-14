const http = require("http");

const server = http.createServer((req, res) => {
  // 127.0.0.1:3000
  const url = req.url;
  if (url === "/") {
    console.log("루트로 진입");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("home");
  } else if (url === "/about") {
    console.log("about으로 진입");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("mypage");
  } else {
    console.log("not found");
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 not found");
  }
});

server.listen(3000, () => {
  console.log("서버 실행중");
});
