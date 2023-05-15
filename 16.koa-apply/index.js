// views 关于模板引擎的页面
// routes 路由koa-router  根据不同给你来划分路由
// model 数据库相关的
// controller 控制器 每个路由都应该有一个控制器
// services 提供服务的，控制器中可以使用服务器重点额数据

// MVC模式 model view controller

// 博客系统：文章管理和用户管理
const Koa = require('koa');
const app = new Koa();
const bodyparser = require('koa-bodyparser');
const static = require('koa-static');
const views = require('koa-views');
const path = require('path');
const router = require('./routes/index');

app.use(bodyparser());
// 模板引擎的目录
app.use(views(path.resolve(__dirname, 'views'), {
  map: {
    html: 'ejs'  //模板后缀类型
  }
}));
app.use(static(path.resolve(__dirname, 'public')))
app.use(router());  //使用路由

app.listen(3000)