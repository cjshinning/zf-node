// 1.先通过用法掌握koa的原理，原理分析清楚后就知道该怎么用了

const Koa = require('./koa');
const app = new Koa();

app.use(function (req, res) {
  // ctx是koa中的上下文对象

  // ctx.body = 'hello';
  res.end('hello my');
})

app.listen(3000);

// 实例上比较核心的三个方法：listen,use,on('error)

// use 注册函数
// ctx 上下文 对原生的req和res进行了封装 封装出了一个新的对象request,response