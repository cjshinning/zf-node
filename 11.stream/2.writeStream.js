const { Writable } = require('stream');

class MyWrite extends Writable {
  _write(chunk, encoding, cb) {
    console.log(chunk);
    cb();
  }
}

const mw = new MyWrite();
mw.write('ok', function () {
  console.log('ok');
});
mw.write('ab');

// 不同人实现的可写流是不一样的