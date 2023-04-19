// js中有进制转化的方法，不用自己转化

console.log(parseInt('11111111', 2)); //255

// js可以识别浮点类型
console.log(255.0.toString(16));  //ff 字符串类型，可以将任何进制转换成任何进制

// 0.1 + 02 !== 0.3;

// 将小数转为2进制 乘二取值
// 0.1 * 2 = 0.2 0
// 0.2 * 2 = 0.4 0
// 0.4 * 2 = 0.8 0
// 0.8 * 2 = 1.6 1 => 0.6
// 0.6 * 2 = 1.2 1 => 0.2  // 取出来的值比以前的大
// 0.0001100110011

// base64 是如何转换出来的 数据传递 替代url 转化结果比以前大1/3
// let r = Buffer.from('珠');
// console.log(r); //e7 8f a0

// console.log(0xe7.toString(2))
// console.log(0x8f.toString(2))
// console.log(0xa0.toString(2))

// // 11100111  10001111  10100000
// // 111001 111000 111110 100000
// console.log(parseInt('111001', 2)); //57
// console.log(parseInt('111000', 2)); //56
// console.log(parseInt('111110', 2)); //62
// console.log(parseInt('100000', 2)); //32

// let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// str += str.toLowerCase();
// str += '0123456789+/';
// console.log(str[57] + str[56] + str[62] + str[32]); //54+g

console.log(Buffer.from('珠').toString('base64'), Buffer.from('a'));  //54+g