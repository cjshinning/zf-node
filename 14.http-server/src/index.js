const http = require('http');
const path = require('path');
const fs = require('fs').promises;
const { createReadStream, createWriteStream, readFileSync } = require('fs');
const url = require('url');
const crypto = require('crypto');

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
    console.log('------', req.url);

    let { pathname } = url.parse(req.url);  //获取路径
    pathname = decodeURIComponent(pathname);  //可能路径有中文
    let filePath = path.join(this.directory, pathname);

    try {
      let statObj = await fs.stat(filePath);
      if (statObj.isFile()) {
        this.sendFile(req, res, statObj, filePath);
      } else {
        let dirs = await fs.readdir(filePath);

        // 文件访问的路径 采用绝对路径 尽量不要采用./ ../
        dirs = dirs.map(item => ({ //当前根据文件名产生目录和href
          dir: item,
          href: path.join(pathname, item)
        }))

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
  cache(req, res, statObj, filePath) {
    // 设置缓存，默认强制缓存10s，10s内不再向服务器发请求（首页不会被强制缓存）
    // 引用的资源可以被强制缓存

    res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toGMTString());
    // no-cache 表示每次都向服务器发请求
    // no-store 表示浏览器不进行缓存
    res.setHeader('Cache-Control', 'no-cache'); //http1.1新版浏览器都识别Cache-Control

    // 过了10s 文件还是没变 可以不用返回文件 告诉浏览器找缓存 缓存就是最新的
    // 协商缓存 商量一下 是否需要给最新的，如果不需要返回内容，直接给304状态码，表示找缓存即可

    // 默认先走强制缓存，10s内不会发送请求到服务器中采用浏览器缓存，但是10s后再次发送请求。后端要进行对比 1）文件没有变，直接返回304即可，浏览器去荤菜中查找文件。之后10s还是走缓存。文件变化了返回最新的，之后10s还是走缓存，不停循环

    // 看文件是否变化

    // 1.根据修改时间来判断文件是否修改了 304 服务端设置

    // statObj.ctime;  //changetime 修改时间

    let IfModifiedSince = req.headers['if-modified-since'];
    let ctime = statObj.ctime.toGMTString();
    let ifNoneMatch = req.headers['if-none-match']
    let etag = crypto.createHash('md5').update(readFileSync(filePath)).digest('base64');
    // console.log(crypto.createHash('md5').update('12').update('34').digest('base64'));

    res.setHeader('Last-Modified', ctime);  //缺陷如果文件没变 修改时间变了 1s内改变多次无法检测到
    res.setHeader('Etag', etag);

    if (IfModifiedSince != ctime) { //如果前端传过来的最后修改时间和我的ctime时间医院，文件没有被更改过
      return false;
    }

    if (ifNoneMatch !== etag) { //可以用开头 加上总字节大小生成etag
      return false;
    }

    // 采用指纹Etag -根据文件产生一个唯一的标识 md5

    return true;
  }
  sendFile(req, res, statObj, filePath) {

    if (this.cache(req, res, statObj, filePath)) {
      res.statusCode = 304; //协商缓存是包含首次访问资源的
      return res.end();
    }

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