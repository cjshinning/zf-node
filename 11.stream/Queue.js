
let LinkList = require('./LinkList');

// 从尾添加 从头删除 实现先进先出
class Queue { //队列是添加和删除
  constructor() {
    this.ll = new LinkList();
  }
  offer(element) {  //入队列
    this.ll.add(element);
  }
  poll() { //出队列
    return this.ll.remove(0);
  }
}

module.exports = Queue;