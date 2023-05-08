#! /usr/bin/env node

const { program } = require('commander');
const config = require('./serverConfig');
const { forEachObj } = require('../util.js')

program.name('zz');

forEachObj(config, val => {
  program.option(val.option, val.descriptor);
})

// 发布订阅 用户调用--help会触发函数
program.on('--help', function () {
  console.log('\r\nExamples:');
  forEachObj(config, val => {
    console.log('  ' + val.usage);
  })
})

// --port 3000 --directory d: --cache

program.parse(process.argv);

const finalConfig = {}
forEachObj(config, (value, key) => {
  finalConfig[key] = program.opts()[key] || value.default;
})

// 1.解析用户参数
// 2.开启服务器
const Server = require('../src/index');
let server = new Server(finalConfig); //传入开启服务器的必备服务

server.start();


