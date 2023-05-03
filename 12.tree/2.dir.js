const fs = require('fs');
const path = require('path');

// 1.如何创建文件夹
// 2.如何删除文件夹
// 3.如何判断是不是文件夹
// 4.文件夹放的有什么内容

// 这些方法也分为同步和异步
// 以异步代码为例，异步稍微复杂一些

// fs.mkdir('a/b/c/d', (err) => {  //创建目录前 需要保证父目录存在
//   console.log(err);
// })

// fs.rmdir('a', (err) => { console.log(err) }); // 删除时必须保证目录是空的

// fs.readdir('a', (err, dirs) => {
//   dirs = dirs.map(item => {
//     let p = path.join('a', item);
//     fs.stat(p, function (err, stat) {
//       console.log(stat.isDirectory());
//       if (stat.isFile()) {
//         fs.unlink(p, () => { })
//       }
//     })
//     return p;
//   });
// })   //读取的结果只有儿子一层

// fs.mkdir fs.rmdir fs.readdir(一层) fs.stat isFile isDirectory fs.unlink

// 异步删除文件夹 串行 并行
// function rmdir(dir, cb) {
//   fs.stat(dir, (err, statObj) => {
//     if (statObj.isFile()) {
//       fs.unlink(dir, cb);
//     } else {
//       // 读取文件夹中内容
//       fs.readdir(dir, (err, dirs) => {
//         dirs = dirs.map(item => path.join(dir, item));
//         console.log(dirs);

//         // 先删除儿子 再删除老子
//         let idx = 0;
//         function next() {
//           if (idx == dirs.length) return fs.rmdir(dir, cb);
//           let current = dirs[idx++];
//           rmdir(current, next);
//         }
//         next()
//       })
//     }
//   })
// }

// 方案二：层序遍历
function rmdir(dir, cb) {
  fs.stat(dir, (err, statObj) => {
    if (statObj.isFile()) {
      fs.unlink(dir, cb);
    } else {
      // 读取文件夹中内容
      fs.readdir(dir, (err, dirs) => {
        dirs = dirs.map(item => path.join(dir, item));
        // console.log(dirs);

        // 先删除儿子 再删除老子

        // 并发删除多个儿子 儿子删除完毕 通知父亲
        if (dirs.length == 0) {
          return fs.rmdir(dir, cb);
        }
        let idx = 0;
        function done() {
          if (++idx == dirs.length) {
            fs.rmdir(dir, cb);
          }
        }
        for (let i = 0; i < dirs.length; i++) {
          let dir = dirs[i];
          rmdir(dir, done);
        }
      })
    }
  })
}

rmdir('a', function () {
  console.log('删除成功');
})