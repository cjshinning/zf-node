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

defineGetter('request', 'path');
defineGetter('request', 'url');

// proto.__defineGetter__('path', function () {
//   return this.request.path;
// })
