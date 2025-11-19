/*
    bcrypt : 비밀번호를 안전하게 저장하기 위해 만들어진 '느리고, 공격하기 힘든' 비밀번호 전용 해시 함수

    SHA256, SHA512
    - 빠르게 계산하는 것이 목표 -> 하지만 비밀번호 저장에는 "빠른 해시"가 독일 수 있음
    
    일부러 느리게 동작하는 해시 함수를 만듦 -> bcrypt, scrypt, Argon2 ..

    bcrypt의 특징
    1. 내부적으로 해시 연산을 여러번 반복 (saltRounds)
    2. salt를 자동으로 사용 : 같은 비밀번호라도 일부러 랜덤 문자열을 섞어서 해시하게 만드는 값
*/

import bcrypt from "bcrypt";

const password = "1111";
const saltRounds = 10;

// 1. 비밀번호 해시화 (저장할 때)
async function hashPassword(password) {
  const hashed = await bcrypt.hash(password, saltRounds);
  console.log("해시된 비밀번호:", hashed);
  return hashed;
}

// 2. 비밀번호 검증
async function verifyPassword(inputPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
  console.log("비밀번호 일치 여부:", isMatch);
  return isMatch;
}

async function runExample() {
  const hashed = await hashPassword(password);
  await verifyPassword("1234", hashed);
  await verifyPassword("1111", hashed);
}

// $2b$10$Jd7ZpwM.vI15FNvdNiatZurnzqxfDHiW4HF9VWB8RF7W6ATNQA1WO
// $2b$ : bcrypt 버전
// 10$ : saltRounds
runExample();
