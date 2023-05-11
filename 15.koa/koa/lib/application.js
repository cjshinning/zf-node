// console.log('my koa');

const http = require('http');
const context = require('./context');
const Stream = require('stream');

// let c = Object.create(context);
// c.a = 5;
// console.log(c.__proto__);

const request = require('./request');
const response = require('./response');

class Application {
  constructor() {
    // 我们不能直接把request赋值给context，如果其中一个应该改变了request和response，保证每次应用不会互相影响
    this.context = Object.create(context);  //这个方法一般用于继承，可以继承原本的属性，用户扩展，扩展到新创建的对象，不会影响原来的对象
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  use(fn) {
    this.fn = fn; //将use方法重点额函数保存到实例上
  }
  createContext(req, res) {
    // 每次都创建一个全新的上下文 保证每次请求之间不干扰
    let ctx = Object.create(this.context);
    let request = Object.create(this.request);
    let response = Object.create(this.response);

    // request和response就是我们koa自己的对象
    // req和res就是原生的对象
    ctx.request = request;
    ctx.response = response;
    ctx.request.req = ctx.req = req;
    ctx.response.res = ctx.res = res;

    return ctx;
  }
  handleRequest(req, res) {
    let ctx = this.createContext(req, res);

    res.statusCode = 404;

    this.fn(ctx);

    let body = ctx.body;
    if (typeof body == 'string' || Buffer.isBuffer(body)) {
      res.end(ctx.body);
    } else if (body instanceof Stream) {
      body.pipe(res);
    } else if (typeof body == 'object') {
      res.end(JSON.stringify(body));
    } else {
      res.end('Not Found');
    }


  }
  listen(...args) {
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}

module.exports = Application;