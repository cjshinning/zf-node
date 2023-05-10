// md5特点 摘要算 不加加密算法（加密 必须得解密 但是md5无法反解析）

// 1）两段不同的内容 摘要出的结果的长度相同
// 2）如果传入的内容不同，那输出的结果不同 雪崩效应（传入东西医院结果一样）
// 3）md5不可逆

const crypto = require('crypto');

// 根据用户输入的值 和我的表做对比 如果对比一样了 说明这个值被撞到了
// 多次md5
console.log(crypto.createHash('md5').update('1234').digest('base64'));
console.log(crypto.createHash('md5').update('12').update('34').digest('base64'));

// 如果文件过大则不合适，大小长度也可以