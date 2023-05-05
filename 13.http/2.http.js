// 服务器 1）返回静态文件 2）返回数据

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs').promises;
const { createReadStream } = require('fs');
const mime = require('mime');

// 解决this 只想可以采用箭头函数 / 使用bind来实现
class StaticServer {
  async handleRequest(req, res) {
    const { pathname } = url.parse(req.url, true);  //根据路径返回对应的资源
    let filePath = path.join(__dirname, pathname);

    // 需要判断访问的是不是文件夹
    // 浏览器根据心情发送的图标favicon.ico
    try {
      let statObj = await fs.stat(filePath);
      if (statObj.isFile()) { //mime 可以根据文件后缀来识别 是什么类型的
        res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8');
        createReadStream(filePath).pipe(res); //res 是一个可写流 可读流.pipe(可写流)
        // let data = await fs.readFile(filePath);
        // await res.end(data);
      } else {
        filePath = path.join(filePath, 'index.html');
        await fs.access(filePath);  //不存在会报错
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        createReadStream(filePath).pipe(res);
      }
    } catch (e) {
      this.sendError(e, req, res);
    }
  }
  sendError(e, req, res) {
    res.statusCode = 404;
    res.end('Not Found');
  }
  start(...args) {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}

new StaticServer().start(3000, function () {
  console.log(`server start 3000`)
});