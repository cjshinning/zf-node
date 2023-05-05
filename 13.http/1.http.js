const http = require('http');
const url = require('url');

// console.log(url.parse('http://username:password@localhost:3000/respource?a=1&b=2#hash', true));
// hostname 主机名
// query 查询参数
// pathname 请求路径
let server = http.createServer(function (req, res) {
  // 请求部分
  console.log(req.method);  //默认也是大写
  console.log(req.url);
  // console.log(url.parse(req.url));

  let { pathname, query } = url.parse(req.url, true); //true就是把查询参数改成对象
  console.log(pathname, query);

  // console.log(req.httpVersion);
  console.log(req.headers); //所有的请求头key都是小写

  // req是一个可读流
  let arr = []; //前端传递的数据可能是二进制所以用buffer拼接是最合理的

  // 如果流中的数据为空 内部会调用 push(null) 只要调用了Push 一定会触发end事件
  req.on('data', function (chunk) {
    arr.push(chunk);
  })
  req.on('end', function () {
    console.log(Buffer.concat(arr).toString(), '------------');
  })

  // 客户端数据获取
  // 响应行、响应头、响应体顺序 不能发生变化
  // res是一个可写流 write end

  res.statusCode = 600;
  res.statusMessage = 'no status';
  // res.write('ok');  //分段响应
  // res.end('ok');  //表示响应结束

  // res.write('ok');
  // res.write('ok');
  // res.write('ok');
  res.end('ok');

})

// curl -v 显示详细信息
// curl -X 指定方法
// curl -d 指定数据
// curl -h 指定头

// server.on('request', function (req, res) {
//   console.log(2);
// })

let port = 4000;
server.listen(port, function () {
  console.log(`server start ${port}`)
})

server.on('error', function (err) {
  console.dir(err, '-------------');
  if (err.code === 'EADDRINUSE') {
    server.listen(++port);
  }
})

// 服务器代码改变后必须重新执行
// nodemon 1.http.js

// 自己处理参数
// let query = {};
// req.url.replace(/([^&?=]+)=([^&?=]+)/g, function () {
//   query[arguments[1]] = arguments[2];
// })
// console.log(query);