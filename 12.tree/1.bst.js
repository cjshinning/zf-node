// bst binary search tree

class Node { //节点之间必须有个parent
  constructor(element, parent) {
    this.element = element;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
    this.size = 0;
  }
  add(element) {
    if (this.root == null) {
      this.root = new Node(element, null);
      this.size++;
      return;
    }
    // 根据跟的值来比较插入
    // 根据条件不停的找 找到节点为空时 将上一次的值保存到节点中
    let currentNode = this.root;
    let parent = null;  //记录当前节点的父节点
    let compare = null;
    while (currentNode) {
      compare = element - currentNode.element;
      parent = currentNode; //parent就是进入左右子树之前保留下来的节点
      // console.log(compare, element, currentNode.element);
      if (compare > 0) {
        currentNode = currentNode.right;
      } else if (compare < 0) {
        currentNode = currentNode.left;
      }
    }
    let newNode = new Node(element, parent);
    if (compare > 0) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }
    this.size++;
  }
  preOrderTraversal(visitor) {
    const traversal = (node) => {
      while (node == null) return;
      visitor.visit(node);
      traversal(node.left);
      traversal(node.right);
    }
    traversal(this.root);
  }
  inOrderTraversal() {
    const traversal = (node) => {
      while (node == null) return;
      traversal(node.left);
      visitor.visit(node);
      traversal(node.right);
    }
    traversal(this.root);
  }
  // 根据parent属性 一般情况下 都可以用栈型结构 去避免递归
  postOrderTraversal() {
    const traversal = (node) => {
      while (node == null) return;
      traversal(node.left);
      traversal(node.right);
      visitor.visit(node);
    }
    traversal(this.root);
  }
  levelOrderTravsersal(visitor) {
    if (this.root == null) return;
    let stack = [this.root];  //10
    let index = 0;
    let currentNode = null;
    while (currentNode = stack[index++]) {
      visitor.visit(currentNode);
      if (currentNode.left) {
        stack.push(currentNode.left);
      }
      if (currentNode.right) {
        stack.push(currentNode.right);
      }
    }
  }
  // 左右互换 树的遍历
  invertTree() {
    if (this.root == null) return;
    let stack = [this.root];  //10
    let index = 0;
    let currentNode = null;
    while (currentNode = stack[index++]) {

      let temp = currentNode.left;
      currentNode.left = currentNode.right;
      currentNode.right = temp;

      if (currentNode.left) {
        stack.push(currentNode.left);
      }
      if (currentNode.right) {
        stack.push(currentNode.right);
      }
    }
  }
}

let bst = new BST();
// 二叉搜索树种的内容必须有可比性
let arr = [10, 8, 19, 6, 15, 22, 20];
arr.forEach(item => {
  bst.add(item);
})

// 访问者模式
// bst.preOrderTraversal({
//   visit(node) {
//     console.log(node.element, '-----');
//   }
// });

bst.invertTree()
console.log(bst.root);
// console.dir(bst, { depth: 10 })

// 常见遍历方式 前序遍历 中序遍历 后续遍历 层序遍历