// 1.先通过用法掌握koa的原理，原理分析清楚后就知道该怎么用了

const Koa = require('./koa');
const fs = require('fs');
const path = require('path');

const app = new Koa();
app.use(function (ctx) {
  // ctx是koa中的上下文对象（req,res原生的）（request,response是自己封装的）
  // koa基于requet对象自己封装了属性 
  console.log('my koa');
  console.log(ctx.req.url); //原生的req对象
  console.log(ctx.request.req.url); //原生的
  console.log(ctx.request.path); //自己封装的
  console.log(ctx.path); //自己封装的

  // ctx.set('Content-Type', 'text/html');
  ctx.body = { "a": "1" };
  // ctx.body = fs.createReadStream(path.resolve(__dirname, 'a.html'));
  // ctx.body = 'hello';
  // ctx.body = 'world';
  // body并不res.end方法，用最后的返回到页面上
  // console.log(ctx.body);

  // if (ctx.path == '/abc') {
  //   ctx.body = { data: 'ok' }
  // }
})

app.listen(3000);

// const app1 = new Koa();

// 实例上比较核心的三个方法：listen,use,on('error)

// use 注册函数
// ctx 上下文 对原生的req和res进行了封装 封装出了一个新的对象request,response