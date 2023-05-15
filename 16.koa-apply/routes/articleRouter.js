let Router = require('koa-router');
const ArticleController = require('../controller/articleController');
let articleController = new ArticleController();

const router = new Router({ prefix: '/article' });

router.get('/add', articleController.add);
router.get('/list', articleController.list);

module.exports = router;