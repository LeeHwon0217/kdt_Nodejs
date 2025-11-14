const fs = require("fs");

/* 파일 읽기 */
/*
// 동기 방식
const data = fs.readFileSync("example.txt", "utf8");
console.log("동기 방식 파일 내용:", data); // 에러날것같으면 try-catch로 처리

// 비동기 방식
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.log("파일 읽기 실패:", err);
  }
  console.log("비동기 방식 파일 내용:", data);
});

console.log("프로그램을 종료합니다!"); // 얘가 콜백이 에러 데이타 받는 시간보다 빨리 끝남
*/

/* 파일 쓰기 */
/*
// 동기 방식
fs.writeFileSync("output1.txt", "이 내용이 파일에 저장됩니다.");
console.log("동기방식 파일 저장 완료");

// 비동기 방식
fs.writeFile("output2.txt", "비동기 방식으로 저장됩니다.", (err) => {
  if (err) {
    console.error("저장 실패:", err);
    return;
  }
  console.log("비동기방식 파일 저장 완료");
});

// 내용 추가하기
fs.appendFile("example.txt", "\n새로운 줄이 추가됩니다.", (err) => {
  if (err) throw err;
  console.log("내용 추가 완료");
});
*/

/* 파일 삭제하기 */
fs.unlink("delete.txt", (err) => {
  if (err) throw err;
  console.log("파일 삭제 완료");
});
