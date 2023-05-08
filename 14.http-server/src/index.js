const http = require('http');
const path = require('path');
const fs = require('fs').promises;
const { createReadStream, createWriteStream, readFileSync } = require('fs');
const url = require('url');

// 模板引擎
const ejs = require('ejs');
const mime = require('mime');
const chalk = require('chalk');

class Server {
  constructor(options) {
    this.port = options.port;
    this.directory = options.directory;
    this.template = readFileSync(path.resolve(__dirname, 'render.html'), 'utf8');
  }
  async handleRequest(req, res) {
    let { pathname } = url.parse(req.url);  //获取路径
    pathname = decodeURIComponent(pathname);  //可能路径有中文
    let filePath = path.join(this.directory, pathname);

    try {
      let statObj = await fs.stat(filePath);
      if (statObj.isFile()) {
        this.sendFile(req, res, statObj, filePath);
      } else {
        let dirs = await fs.readdir(filePath);
        let result = await ejs.render(this.template, { dirs }, { async: true })
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.end(result);
      }
    } catch (e) {

      this.sendError(req, res, e);
    }

  }
  sendError(req, res, e) {
    res.statusCode = 404;
    res.end('Not Found');
  }
  sendFile(req, res, statObj, filePath) {
    res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8');
    createReadStream(filePath).pipe(res);
  }
  start() {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(this.port, () => {
      console.log(`${chalk.yellow('Starting up zz-server:')} ./${path.relative(process.cwd(), this.directory)}`);
      console.log(`http:localhost:${chalk.green(this.port)}`);
    })
  }
}

module.exports = Server;