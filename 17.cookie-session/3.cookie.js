const http = require('http');
const querystring = require('querystring');
const crypto = require('crypto');

function sign(value) {
  // 加盐算法 放入不同的秘钥产生不同的结果 不可逆的 盐值

  // 在传输base64时需要转化 + = / /替换成_ + 变成 - =变成空
  // base64 传输的过程中 + = / 都转换成空字符
  return crypto.createHmac('sha256', 'zfpx').update(value + '').digest('base64').replace(/\/|\=|\+/g, '');
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
      // console.log(s, sign(value));
      if (s == sign(value)) {
        return value;
      } else {
        return undefined;
      }
    } else {
      return value;
    }
  }

  if (req.url == '/visit') { //cookie是由多个由分号空格隔开的字段
    let visit = req.getCookie('visit', { signed: true });
    if (visit) {
      visit++
    } else {
      visit = 1;
    }
    res.setCookie('visit', visit, { signed: true });
    res.setHeader('Content-Type', 'text/html;charset=utf8')
    res.end(`当前用户第${visit}此访问我`);
  }
})

server.listen(3000);