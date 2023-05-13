const path = require('path');
const fs = require('fs').promises;
const { createReadStream } = require('fs');
const mime = require('mime');

module.exports = function koaStatic(dirname) {
  return async (ctx, next) => {
    let filePath = path.join(dirname, ctx.path);
    try {
      let statObj = await fs.stat(filePath);
      if (statObj.isFile()) {
        ctx.set('Content-Type', mime.getType(filePath) + ';charset=utf-8');
        ctx.body = createReadStream(filePath);
      } else {
        await next();
      }
    } catch (e) {
      // 理论上找index.html
      await next();
    }

  }
}


// app.use(async (ctx, next) => {
//   if (ctx.path === '/login' && ctx.method == 'GET') {
//     ctx.body = `
//       <form action="/login" method="post">
//         <input type="text" name="username" />
//         <input type="text" name="password" />
//         <button>提交</button>
//       </form>
//     `
//   } else {
//     await next();
//   }
// })