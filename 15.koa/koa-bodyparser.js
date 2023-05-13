const querystring = require('querystring');

module.exports = function bodyParser() {
  return async (ctx, next) => {
    ctx.request.body = await body(ctx);
    return next();
  }
}


function body(ctx) {
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
      } else {
        resolve();
      }
    })
  })
}