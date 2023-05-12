const Koa = require('./koa');

const app = new Koa();

const sleep = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
      console.log('sleep');
    }, 1000)
  })
}
// 1, 3, 2, sleep, 5, 6, 4
app.use(async function (ctx, next) {
  console.log(1);
  await next();
  throw new Error('error');
  console.log(2);
})

app.use(async function (ctx, next) {
  console.log(3);
  await sleep();
  next();
  console.log(4);
})

app.use(async function (ctx, next) {
  console.log(5);
  ctx.body = '5';
  await next();
  ctx.body = '6';
  console.log(6);
})

// 洋葱模型 1,3,5,2,4,6

app.listen(3002);

app.on('error', function (err) {
  console.log('*******', err)
})