// 文件基于流进行了封装，封装了基于文件的可读流和可写流

const fs = require('fs');
const path = require('path');
const ReadStream = require('./ReadStream');
// const { StringDecoder } = require('node:string_decoder');

// const sd = new StringDecoder('utf8');

// fs.open fs.read fs.close 内部是继承了stream模块，并且基于这三个方法
// let rs = fs.createReadStream(path.resolve(__dirname, 'test.txt'), {
  let rs = new fs.ReadStream(path.resolve(__dirname, 'test.txt'), {
  flags: 'r', //创建可读流的标志是r5，读取文件
  encoding: null,  //编码默认null buffer
  autoClose: false,  // 读取完毕后自动关闭
  start: 0, //包前又包后
  // end: 4,
  highWaterMark: 2  //12 34 5 如果不写默认64*1024
})
rs.on('error', function (err) {
  console.log(err);
})
rs.on('open', function (fd) {
  console.log(fd);
})
// let str = '';
// rs.on('data', function (chunk) {
//   str += chunk;
// })
// rs.on('end', function () {
//   console.log(str);
// })

let arr = [];
rs.on('data', function (chunk) {
  rs.pause();
  console.log(chunk);
  arr.push(chunk);
})
rs.on('end', function () {  //文件的开始到结束都读取完毕了
  console.log(Buffer.concat(arr));
})
rs.on('close', function () {
  console.log('close');
})

setInterval(() => {
  rs.resume();
}, 1000)

// 发布订阅中出异常 error
// 可读流对象必须有on('data')和on('end') 如果是文件流会在提供的两个方法
// 控制读取速率
  // console.log(sd.write(Buffer.concat(arr)));
  // console.log(sd.write(Buffer.from([0xbd])));

  // 1.内部会 new ReadStreame 继承于Readble接口
  // 2.内部会先进行格式化
  // 3.内部会默认打开文件 
  // 4.Readable.prototype.read -> ReadStream.prototype._read
  
  // Readable接口实现自己的可读流 你要自己去实现一个_read方法，默认当我开始读取时会调用此方法