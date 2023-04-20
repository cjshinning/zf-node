// fs.open fs.read fs.write fs.close 实现读取一点写入一点

// 参照物 内存 要将一个文件的内容 读取到内存其实是做了写的操作
// 做像文件中写入 其实做了读操作

const fs = require('fs');
const path = require('path');

// const buffer = Buffer.alloc(3);
// fs.open(path.resolve(__dirname, 'xxx.js'), 'r', function (err, fd) {
//   // console.log(fd);  //file discriptor 类型是数字
//   // 文件描述符 写入到的buffer 从buffer的哪个位置开始写 写入的人个数 从文件的哪个位置开始读取
//   fs.read(fd, buffer, 0, 3, 0, function (err, bytesRead) {  //真实的读取到的个数
//     console.log(bytesRead, buffer);
//     fs.close(fd, () => {
//       console.log('完成');
//     })
//   })
// })

// 权限chomo -R 777 二爷一直4读书 r（读） 4 w（写） 2 x（执行） 1
const buffer = Buffer.from('架构');

fs.open(path.resolve(__dirname, 'xxx.js'), 'w', 0o666)