# electron_vue_demo
用electron将一个在线应用包装成桌面app，包含登录、打包、检查更新，框架用Vue。 
采用的是单package.json的结构， node_moudles只维护一份。
打包使用electron-builder，提供mac和window下打包方式。
打包过程中遇到download失败，尝试配置提前下好依赖包以及配置ELECTRON_MIRROR。
提供公共的菜单栏，弃用默认菜单项，防止不同平台，app风格不统一。
electron-updater更新测试通过。
### 工程目录
``` bash
│
├── README.md                           <=  项目介绍
├── app                                 <=  开发目录
│   ├── dist                            <= 编译打包
│   ├── src                             <= 项目源代码
│   │   ├── main                        <= electron主进程
│   │   │   ├── application.js
│   │   │   ├── index.dev.js
│   │   │   ├── index.js
│   │   ├── renderer                    <= electron渲染进程
│   │   │   ├── App.vue                 <=  Vue 根组件
│   │   │   ├── main.js                 <=  Vue 入口
│   │   │   ├── static                  <=  静态资源
│   │   │   ├── common                  <=  公共代码
│   │   │   ├── router                  <=  Vue 路由相关
│   │   │   ├── store                   <=  Vuex
│   │   │   ├── views                   <=  视图层
│   ├── index.ejs                       <= 模板文件
|---run.js
├── config.js                           <=  配置
├── webpack.config.js
|--- package.json
│
```

### 使用说明
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron app for production
npm run build

# run webpack in production
npm run pack

# Windows打包
electron-builder --win
# Mac打包
electron-builder --mac
# win下打包需要下载winCodeSign 以及 nsis, 自动更新经常失败，一般到一下地址去找到相应的版本，下载后放到cache下
# 依赖的包下载地址：https://github.com/electron-userland/electron-builder-binaries/releases
# 在Mac系统下打包还需要安装wine：
# brew install Caskroom/cask/xquartz
# brew install wine
