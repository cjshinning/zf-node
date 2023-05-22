## cookie session localStorage sessionStorage 区别
- localStorage sessionStorage 只能在本地访问 不能超过5M（不会再请求中携带）
- cookie http无状态协议（用来识别请求的）客户端和服务端都可以使用，每次都会自动携带cookie，跨域默认不能携带cookie（cookie是存放在客户端 安全问题 csrf） （合理设置cookie 否则每次请求都会携带cookie 4k）
- session是基于cookie的 session只是一个对象存放在服务端中，通过一个唯一标识可以找到对应的信息，标识是通过cookie来发送的（理论上没有限制的）
- jwt