const http = require('http');
const querystring = require('querystring');
const crypto = require('crypto');

function sign(value) {
  // 加盐算法 放入不同的秘钥产生不同的结果 不可逆的 盐值

  // base64 传输的过程中 + = / 都转换成空字符
  return crypto.createHmac('sha256', 'zfpx').update(value).digest('base64');
}

// 服务端设置的是set-cookie 客户端设置的是 cookie字段
// cookie 存活时间 max-age/Expires
const server = http.createServer((req, res) => {
  let arr = []
  res.setCookie = function (key, value, options = {}) {
    let args = [];
    if (options.maxAge) {
      args.push(`max-age=${options.maxAge}`);
    }
    if (options.domain) {
      args.push(`domain=${options.domain}`);
    }
    if (options.path) {
      args.push(`path=${options.path}`);
    }
    if (options.httpOnly) {
      args.push(`httpOnly=${options.httpOnly}`);
    }
    if (options.signed) {
      // 值.签名
      value = value + '.' + sign(value);
    }
    arr.push(`${key}=${value}; ${args.join('; ')}`);
    res.setHeader('Set-Cookie', arr)
  }

  req.getCookie = function (key, options = {}) {
    let result = querystring.parse(req.headers.cookie, '; ', '=');
    let [value, s] = (result[key] || '').split('.');
    if (options.signed) {
      if (s == sign(value)) {
        return value;
      } else {
        return undefined;
      }
    } else {
      return value;
    }
  }

  // 当用户访问 /read 表示读取cookie
  // /write 时写入cookie
  if (req.url == '/read') { //cookie是由多个由分号空格隔开的字段
    // let result = querystring.parse(req.headers.cookie, '; ', '=');

    let ret = req.getCookie('name', {  // 将name对应的值解析出来
      // signed: true
    })

    res.end(ret);
  } else if (req.url == '/write') {
    // max-age（多少秒剩下）/Expires（绝对时间）
    // domain 针对哪个玉米生效（二级域名 a.cjtest.com b.cjtest.com）
    // path 限制只能在某个路径来访问cookie
    // httpOnly 可以实现相对安全一些，防止浏览器随便更改
    // res.setHeader('Set-Cookie', [`name=cj;max-age=10;expires=${new Date(Date.now() + 10 * 1000 * 1000).toGMTString()}`, 'age=10']);

    res.setCookie('name', 'hello', {
      maxAge: 100,
      httpOnly: true,
      signed: true
    })
    res.setCookie('age', 10);

    res.end('write ok');
  }
})

server.listen(3000);