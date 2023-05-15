class ArticleController {
  add(ctx, next) {
    ctx.body = '文件添加';
  }
  list(ctx, next) {
    ctx.body = '文件列表';
  }
}

module.exports = ArticleController;