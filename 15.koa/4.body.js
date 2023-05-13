// 数据提交了 服务端应该接收数据 进行响应
// 获取用户数据进行操作

const Koa = require('koa');
const app = new Koa();
const path = require('path');
// 可安装原生包：koa-bodyparser koa-static
const bodyParser = require('./koa-bodyparser');
const static = require('./koa-static');

app.use(bodyParser());

// 当用户访问/login的时候 get => 返回一个登录页


// 当用户访问/login的时候 post => 做登录操作

function body(ctx) {
  return new Promise((resolve, reject) => {
    // 读取用户传递的数据
    let arr = [];
    ctx.req.on('data', function (chunk) {
      arr.push(chunk);
    })
    ctx.req.on('end', function () {
      // console.log(Buffer.concat(arr).toString());
      resolve(Buffer.concat(arr));
    })
  })
}

app.use(async (ctx, next) => {
  if (ctx.path === '/login' && ctx.method == 'POST') {
    ctx.set('Content-Type', 'text/html');
    ctx.body = ctx.request.body;
  } else {
    await next();
  }
})

// 静态文件服务中间件 处理静态资源
app.use(static(path.resolve(__dirname, 'koa')));
app.use(static(__dirname));

app.listen(3003);