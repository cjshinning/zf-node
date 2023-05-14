const querystring = require('querystring');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

module.exports = function bodyParser(uploadDir) {
  return async (ctx, next) => {
    ctx.request.body = await body(ctx, uploadDir);
    return next();
  }
}


function body(ctx, uploadDir) {
  return new Promise((resolve, reject) => {
    // 读取用户传递的数据
    let arr = [];
    ctx.req.on('data', function (chunk) {
      arr.push(chunk);
    })
    ctx.req.on('end', function () {
      // console.log(Buffer.concat(arr).toString());
      // 1.表单格式 a=1&b=2
      // 2.json格式 {a:1,b:2}
      // 3.图片格式

      // Content-Type: application/x-www-form-urlencoded

      let type = ctx.get('content-type');  //req.headers
      let data = Buffer.concat(arr);  //用户传递的数据
      if (type == 'application/x-www-form-urlencoded') {  //a=1&b=2
        resolve(querystring.parse(data.toString())); //将字符串格式转化成对象
      } else if (type == 'application/json') {
        resolve(JSON.parse(data.toString()));
      } else if (type == 'text/plain') {
        resolve(data.toString());
      } else if (type.startsWith('multipart/form-data')) {
        // multipart/form-data; boundary=----WebKitFormBoundaryKOnGU8NwE4wMkuEo
        // 二进制数据 分割成 多个行
        let bondary = '--' + type.split('=')[1]
        let lines = data.split(bondary);
        lines = lines.slice(1, -1);
        let resultObj = {};
        lines.forEach(line => {
          let [head, body] = line.split('\r\n\r\n');

          let key = head.toString().match(/name="(.+?)"/)[1];
          if (!head.includes('filename')) {
            resultObj[key] = body.slice(0, -2).toString();
          } else {
            let originalName = head.toString().match(/filename="(.+?)"/)[1];
            // 是文件 文件上传
            let filename = uuid.v4(); //产生一个唯一的文件名
            console.log(uploadDir, filename);

            // 获取文件内容
            let content = line.slice(head.length + 4, -2);
            fs.writeFileSync(path.join(uploadDir, filename), content);
            resultObj[key] = (resultObj[key] || []);
            resultObj[key].push({
              size: content.length,
              name: originalName,
              filename
            })
          }
        })
        console.log(resultObj);
        resolve(resultObj);
      } else {
        resolve();
      }
    })
  })
}

// 111111111 & 111111 & 111 & 11
Buffer.prototype.split = function (bondary) {  //分割二进制
  let arr = [];
  let offset = 0;
  let currentPosition = 0;
  // 找到当前分隔符的位置 只要能找到就一直查找
  while (-1 != (currentPosition = this.indexOf(bondary, offset))) {
    arr.push(this.slice(offset, currentPosition));
    offset = currentPosition + bondary.length;
  }
  arr.push(this.slice(offset));
  return arr;
}

// console.log(Buffer.from('111111&11111&111&111').split('&'));