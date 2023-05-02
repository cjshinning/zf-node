
const path = require('path');
const ReadStream = require('./ReadStream');
const WriteStream = require('./writeStream');

let rs = new ReadStream(path.resolve(__dirname, 'test.txt'), {
  highWaterMark: 4
});
let ws = new WriteStream(path.resolve(__dirname, 'copy.txt'), {
  highWaterMark: 1
});

rs.pipe(ws);
ws.on('drain', function () {
  console.log('drain');
})


// rs.on('data', function (chunk) {
//   let flag = ws.write(chunk);
//   if (!flag) {
//     rs.pause();
//   }
// })
// ws.on('drain', function () {
//   rs.resume();
// })

// 可读流 可写流 双工流（能读也能写，既继承了可读流，又继承了可写流（读和写可以没关系））

const { Duplex, Transform } = require('stream');
// class MyDuplex extends Duplex {
//   _read() {
//     this.push('xxx');
//     this.push(null);
//   }
//   _write(chunk, encoding, cb) {
//     console.log(chunk);
//     cb();
//   }
// }

// let md = new MyDuplex();
// md.on('data', function (chunk) {
//   console.log(chunk);
// })
// md.write('ok');


// 转化流 可以用于加密 压缩 可以把可写流转化成可读流

class MyTransform extends Transform {
  _transform(chunk, encoding, cb) {
    // console.log(chunk);
    this.push(chunk.toString().toUpperCase());
    cb();
  }
}

let my = new MyTransform();

// process.stdin.on('data', function (chunk) {
//   process.stdout.write(chunk)
// })
process.stdin.pipe(my).pipe(process.stdout);
// process.stdout.write('ok'); //console.log标准输出 可写流