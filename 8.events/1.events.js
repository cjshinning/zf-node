// node是基于时间的，内部自己实现了一个发布订阅模式

const EventEmitter = require('./events'); //内置模块 核心

const util = require('util');

function Girl() {

}
// 是让一个类继承EventEmitter原型上的方法
// Object.create() Girl.prototype.__proto__ = EventEmitter.prototype Object.setPrototypeOf extends

// 1.每个实例都有一个__proto__执行所属类（构造函数）的原型
// 2.每个类都有一个prototype属性，上面有个constructor属性只想类的本身

// Girl.prototype = Object.create(EventEmitter.prototype);
// Girl.prototype = EventEmitter.prototype;
// Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype);
util.inherits(Girl, EventEmitter);  //继承原型上的方法
let girl = new Girl();

// { '女生失恋': [fn, fn] }
girl.on('newListener', function (type) {  //用来监听用户绑定了哪些事件
  console.log(type);
})

girl.on('女生失恋', (a, b, c) => {
  console.log('cry', a, b, c);
})
let eat = () => {
  console.log('eat');
}
girl.on('女生失恋', eat);
girl.off('女生失恋', eat);
girl.emit('女生失恋', 1, 2, 3);
girl.emit('女生失恋');

// on emit once off newListener