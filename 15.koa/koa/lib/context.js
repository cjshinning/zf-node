let proto = {
  get a() {
    return 100;
  }
}

module.exports = proto;

// proto和ctx的关系
// ctx.__proto__.__proto__ = proto;

function defineGetter(target, key) {
  proto.__defineGetter__(key, function () {
    return this[target][key];
  })
}

function defineSetter(target, key) {
  proto.__defineSetter__(key, function (value) {
    this[target][key] = value;
  })
}

defineGetter('request', 'path');
defineGetter('request', 'url');
defineGetter('response', 'body');
defineSetter('response', 'body'); //ctx.body = 'xxx' ctx.response.body = 'xxx'


// proto.__defineGetter__('path', function () {
//   return this.request.path;
// })
