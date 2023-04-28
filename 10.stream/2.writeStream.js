const fs = require('fs');
const path = require('path');

const ws = fs.createWriteStream(path.resolve(__dirname, 'test.txt'), {
  flags: 'w',
  encoding: 'utf8',
  autoClose: true,
  highWaterMark: 2  //默认写的水位线是16k
})

// ws.on('open', function (fd) {
//   console.log(fd);
// })
// ws 可写流 ws.write() ws.end() ws.on('open') ws.on('close')

let flag = ws.write('1');
ws.write('2');
ws.write('3');
ws.write('4');
console.log(flag);  //将多个异步任务进行排队，依次来执行

ws.end('ok');
ws.end();
// 为什么要采用链表 数组 栈 队列 链表 树 图
// 用链表可以来实现栈或者队 性能（取头部性能会高）

// 第一次写入操作是真的像文件中写入 侯勋的操作都缓存到链表中了
// flag主要是用来限制是否继续读取 res.pause resume
