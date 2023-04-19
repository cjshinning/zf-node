// 服务器中可以操作二进制 Buffer 可以和字符串随意转化

// 数据结构中 动态数组 前端数组是可以自动扩容的
// 1.buffer的声明方式 固定大小 声明出来后不能随意改变
let buffer = Buffer.alloc(6);  //字节数 默认后端声明的大小的数量，都是字节数
buffer = Buffer.from('前端架构');

// 二进制 0b开头 八进制 0o开头 十六进制 0x开头
buffer = Buffer.from([1, 2, 3, 4, 0x64])
console.log(buffer); //utf8 base64

// 想改buffer，可以通过索引更改
// 想更改buffer大小，是无法更改的，可以再声明一个空间将结果拷贝
buffer[1] = 100;
console.log(buffer);

var buf = Buffer.alloc(12);
let buffer1 = Buffer.from('前端');
let buffer2 = Buffer.from('架构');

buffer1.copy(buf, 0, 0, 6);
buffer2.copy(buf, 6, 0, 6);
console.log(buf);

const newBuffer = Buffer.concat([buffer1, buffer2]);
console.log(newBuffer);
console.log(Buffer.isBuffer(newBuffer));