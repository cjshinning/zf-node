- 包是有多个模块组成的 （在node中每个js都是一个模块）
- npm init -y 初始化包的信息文件，json不能写注释
- 包分为全局包和本地包，代码中使用的都是本地包

```
C:\Users\chenjie\AppData\Roaming\npm
```

- npm link 把当前模块临时放到npm下 
- 全局包必须增加bin字段，会通过配置做软链，表示使用node执行 #! /usr/bin/env node
- 安装模块（第三方模块） 依赖方式 1.开发依赖（webpack） 2.项目依赖（vue） 3.同版本依赖 4.捆绑依赖 5.可选依赖
- 常见的版本号（major,minor,patch）正式版
- alpha beta rc
- scripts + npx 包发布（会默认将当前node_modules下.bin目录放到全局）

- 发包到npm
- 切到npm官方源
- npm addUser，登录
- npm publish，发布