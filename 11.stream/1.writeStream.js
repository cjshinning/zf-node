

const fs = require('fs');
const path = require('path');
const WriteStream = require('./writeStream');

const ws = new WriteStream(path.resolve(__dirname, 'test.txt'), {
  // const ws = fs.createWriteStream(path.resolve(__dirname, 'test.txt'), {
  flags: 'w',
  encoding: 'utf8',
  autoClose: true,
  highWaterMark: 2
})
ws.on('open', function (fd) {
  console.log(fd)
})
let flag = ws.write('c');
console.log(flag);
flag = ws.write('j');
console.log(flag);
flag = ws.write('a');
console.log(flag);

ws.on('drain', function () { //必须达到预期并且消耗掉
  console.log('干了');
})

// 1.格式化传入的数据 默认需要打开文件
// 2.用户会调用write方法 writable接口实现了write方法，内部会调用_write方法 fs.write
// 3.区分是第一次写入 还是后续写入
