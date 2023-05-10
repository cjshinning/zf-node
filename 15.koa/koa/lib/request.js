const url = require('url');

module.exports = {
  get path() { //Object.defineProperty
    let { pathname } = url.parse(this.req.url);
    return pathname;
  }
}