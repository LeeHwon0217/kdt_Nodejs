let count = 0;

function increase() {
  count++;
}

function getCount() {
  return count;
}

module.exports.getCount = getCount; // getCount라는 이름으로 다른 파일에서 사용가능하게 함. 물론 이름 바꾸기도 가능
module.exports.increase = increase;
