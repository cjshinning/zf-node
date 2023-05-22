const http = require('http');
const querystring = require('querystring');

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
    arr.push(`${key}=${value}; ${args.join('; ')}`);
    res.setHeader('Set-Cookie', arr)
  }

  // 当用户访问 /read 表示读取cookie
  // /write 时写入cookie
  if (req.url == '/read') { //cookie是由多个由分号空格隔开的字段
    let result = querystring.parse(req.headers.cookie, '; ', '=');
    res.end(JSON.stringify(result));
  } else if (req.url == '/write') {
    // max-age（多少秒剩下）/Expires（绝对时间）
    // domain 针对哪个玉米生效（二级域名 a.cjtest.com b.cjtest.com）
    // path 限制只能在某个路径来访问cookie
    // httpOnly 可以实现相对安全一些，防止浏览器随便更改
    // res.setHeader('Set-Cookie', [`name=cj;max-age=10;expires=${new Date(Date.now() + 10 * 1000 * 1000).toGMTString()}`, 'age=10']);

    // 设置cookie要避免重名
    // C:\Windows\System32\drivers\etc
    res.setCookie('name', 'cj', {
      maxAge: 100,
      // path: '/write',
      domain: '.cjtest.com',  //增加domain 可以设置二级域名，减少cookie的发送
      httpOnly: true //表示只有服务端能修改属性
    })
    res.setCookie('age', 10);

    res.end('write ok');
  }
})

server.listen(3000);