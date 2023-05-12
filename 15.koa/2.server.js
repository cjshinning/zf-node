const Koa = require('koa');

const app = new Koa();

// 1.可以决定是否向下执行，做权限，可以做统一拦截，如果不合法不必向下执行
// 2.默认可以再中间件中扩展属性和方法，从上到下
// 3.分割逻辑，可以基于中间件 写一些插件

// 1.koa中所有的use中传入的方法 都会被包装成promise
// 2.会吧所有的promise变成一个promise链(内部next前面必须加awiat，或者return)

const sleep = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
      console.log('sleep');
    }, 1000)
  })
}
// 1, 3, 2, sleep, 5, 6, 4
app.use(async function (ctx, next) { //专门处理 /getUser
  // console.log(1);
  ctx.body = 1;
  await next();
  // console.log(2);
  ctx.body = 2;
})

app.use(async function (ctx, next) { //专门处理 /addUser
  // console.log(3);
  ctx.body = 3;
  await sleep();
  next();
  // console.log(4);
  ctx.body = 4;
})

app.use(async function (ctx, next) { //专门处理 /getUser
  // console.log(5);
  ctx.body = 5;
  next();
  // console.log(6);
  ctx.body = 6;
})

// 洋葱模型 1,3,5,2,4,6

app.listen(3001);