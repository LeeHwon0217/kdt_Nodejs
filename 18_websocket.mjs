import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (ws) => {
  // 사용자가 들어오면 connection 이벤트가 발생
  // ws에 사용자 정보가 담긴 소켓이 들어옴
  console.log("클라이언트가 접속!");

  ws.on("message", (message) => {
    // 내가 만든 이벤트. 메시지가 들어오면 string으로 바꿔줌
    console.log("받은 메시지:", message.toString());
    ws.send(`서버가 받은 메시지: ${message}`); // 서버가 받아서 클라이언트로 전달. message 이벤트 받음
  });

  ws.on("close", () => {
    console.log("클라이언트 연결 종료");
  });
});

console.log("WebSocket 서버가 3000번으로 대기중");
