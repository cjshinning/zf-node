// json web token  令牌

const Koa = require('koa');
const Router = require('koa-router');
const crypto = require('crypto');
const jwt = require('jwt-simple');
const router = new Router();

const jwt1 = {
  toBase64Url(content) {
    return content.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  },
  toBase64(content) {
    return this.toBase64Url(Buffer.from(JSON.stringify(content)).toString('base64'));
  },
  sign(content, secret) {
    return this.toBase64Url(crypto.createHmac('sha256', secret).update(content).digest('base64'));
  },
  encode(payload, secret) {
    let header = this.toBase64({ typ: 'JWT', alg: 'HS256' });
    let content = this.toBase64(payload);
    let sign = this.sign(header + '.' + content, secret);

    return header + '.' + content + '.' + sign;
  },
  base64urlUnescape(str) {
    str += new Array(5 - str.length % 4).join('=');
    return str.replace(/\-/g, '+').replace(/_/g, '/');
  },
  decode(token, secret) {
    let [header, content, sign] = token.split('.');
    let newSign = this.sign(header + '.' + content, secret);
    if (sign == newSign) {
      return JSON.parse(Buffer.from(this.base64urlUnescape(content), 'base64').toString());
    } else {
      throw new Error('令牌失效');
    }
  }
}

const app = new Koa();

router.post('/login', async ctx => {
  // 访问login时，我就给你生成一个令牌，返回给你
  // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwaXJlcyI6IjEwMCJ9.n_npoDGiZEXqQ7lp71_m_LIv0fjfbEqGZYV3Hu5LcxI
  // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwaXJlcyI6IjEwMCJ9.n_npoDGiZEXqQ7lp71_m_LIv0fjfbEqGZYV3Hu5LcxI
  let token = jwt1.encode({
    username: 'admin',
    // expires: new Date(Date.now() + 20 * 1000 * 1000).toGMTString()
    expires: '100'
  }, 'zfpx');

  ctx.body = {
    token
  }
})

router.get('/validate', async ctx => {
  let authorization = ctx.header['authorization'];
  console.log(authorization);
  // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwaXJlcyI6IjEwMCJ9.n_npoDGiZEXqQ7lp71_m_LIv0fjfbEqGZYV3Hu5LcxI
  if (authorization) {
    let r = {};
    try {
      r = jwt1.decode(authorization.split(' ')[1], 'zfpx');  //r里面存放着过期时间
      // if(r.expires<Date.now().getTime()){
      //   // 过期了
      // }
    } catch (e) {
      console.log(e);
      r.message = '令牌失效'
    }
    ctx.body = {
      ...r
    }
  }
})

app.use(router.routes());

app.listen(3000);