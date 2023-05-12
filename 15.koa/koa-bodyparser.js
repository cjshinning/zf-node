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

      resolve(Buffer.concat(arr));
    })
  })
}