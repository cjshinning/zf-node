let Router = require('koa-router');
const UserController = require('../controller/userController');
let userController = new UserController();

const router = new Router({ prefix: '/user' });

router.get('/add', userController.add);
router.get('/list', userController.list);

module.exports = router;