// 常见的数据结构 队列 链表 树
// 队列时先进先出 push shift
// 栈型结构 push pop 方法调用栈 路由切换 浏览器的历史记录 两个栈

// 运行的时候产生的叫执行时上下文
// function a() {
//   function b() {
//     function c() {
//     }
//     c();
//   }
//   b();
// }
// a();

// 路由切换 判断语法是否可以正常合并 <div><span></span></div> []


// 数组的shift是比较浪费性能的，每次弹出一个后续内容都会前进，链表（通过指针连接起来）

// 链接查找 删除的性能平均复杂度是O(n)  链表可以优化头尾操作比较合适

// 我们可以使用链表来实现 栈 或者 队列

class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
}

class LinkList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  add(index, element) { //增加节点
    if (arguments.length == 1) {
      element = index;
      index = this.size;
    }
    if (index < 0 || index > this.size) throw new Error('链表索引异常');

    if (index == 0) {
      let head = this.head; //老的头
      this.head = new Node(element, head);
    } else {
      let prevNode = this.getNode(index - 1); //这里前面节点肯定有，如果没有走if
      prevNode.next = new Node(element, prevNode.next);
    }

    this.size++;
    // console.log(index, element, this.size);
  }
  remove(index) {  //获取节点
    if (this.size == 0) return null;

    let oldNode;
    if (index == 0) {
      oldNode = this.head;
      this.head = oldNode && oldNode.next;
    } else {
      let prevNode = this.getNode(index - 1); //获取当前的前一个节点
      oldNode = prevNode.next;  //前一个的下一个就是要删除的
      prevNode.next = prevNode.next.next; //让前一个的下一个指向之前的下一个
    }
    this.size--;
    return oldNode && oldNode.element; //返回删除元素
  }
  getNode(index) { //获取节点
    let current = this.head;  //从头开始找
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }
  length() {  //链表的总个数
    return this.size;
  }
  reverseLinkedList2() {
    function reverse(head) {  //先递归最里面的，再出来
      // 如果链表为空 或者没有下一个了 就不用反转了
      if (head == null || head.next == null) return head;
      let newHead = reverse(head.next);  //将原来的下一个变成头节点
      head.next.next = head; //让下一个姐姐的下一个指向原来的头
      head.next = null; //让老头指向null
      return newHead;
    }

    this.head = reverse(this.head);
    return this.head;
  }
  reverseLinkedList() {
    let head = this.head; //保留老头
    if (head == null || head.next == null) return head;
    let newHead = null; //新的链表头部默认指向null
    while (head !== null) { //循环老的链表，将内容依次取出
      let temp = head.next; //存储的是100
      head.next = newHead;  //让老的头指向新的头
      newHead = head; //新的头指向了老的头
      head = temp;  //老的头向后移
    }
    this.head = newHead;
    return this.head;
  }
}

module.exports = LinkList;

// let ll = new LinkList();
// ll.add(0, 100); //往索引0处添加
// ll.add(0, 200);
// ll.add(300);

// let reverseList = ll.reverseLinkedList();
// console.log(reverseList);

// head = 100
// head = 200 next => head

// let ll = new LinkList();
// ll.add(0, 100); //往索引0处添加
// ll.add(0, 200);
// ll.add(300);  //200 下一个是100 下一个是300
// ll.remove(2);
// console.log(ll.head);