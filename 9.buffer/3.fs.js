// fs FileSystem 和文件相关的方法 文件夹 文件 

// 里面的方法一般有两种类型 1）同步 2）异步 没有sync

// 1.如果我们是读取文件 读取到的结果默认都是buffer类型
// 2.写入的时候 会情况文件内容，并且以utf8的格式类型写入

const fs = require('fs');
const path = require('path');

// fs.readFile(path.resolve(__dirname, 'note.md'), function (err, data) {
//   console.log(data.toString());
// })

// 运行时如果使用相对路径 会使用process.cwd()来切换路径 可能会导致不同路径下运行结果不同
// fs.readFile(path.resolve(__dirname, 'test.png'), function (err, data) {
//   // 执行图片时 采用uft8格式会乱码
//   fs.writeFile(path.resolve(__dirname, 'test1.png'), data, { flag: 'w' }, function (err, data) {
//     console.log('copy');
//   })
// })

fs.readFile(path.resolve(__dirname, '3.fs.js'), function (err, data) {
  // 执行图片时 采用uft8格式会乱码
  // fs.writeFile(path.resolve(__dirname, 'xxx.js'), data, { flag: 'a' }, function (err, data) {
  //   console.log('copy');
  // })
  fs.appendFile(path.resolve(__dirname, 'xxx.js'), data, function (err, data) {
    console.log('copy');
  })
})

// 1）读取的内容会放到内存中 2）如果文件过大会浪费内存 3）淹没可用内存 大型文件不能采用这种方式来进行操作 64k以上的文件做拷贝操作就尽量不要使用readFile来实现

// 手动读写文件 fs.open fs.read fs.write fs.close
