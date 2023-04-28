// 只想用一个空间来写入10个数

const fs = require('fs');
const path = require('path');

const ws = fs.createWriteStream(path.resolve(__dirname, 'test.txt'), {
  highWaterMark: 1
})

let i = 0;
function write() {
  let flag = true;
  while (i < 10 && flag) {
    flag = ws.write('' + i++);
  }
}
write();
ws.on('drain', () => {
  console.log('清空');
  write();
})