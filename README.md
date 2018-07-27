# electron_vue_demo
用electron将一个在线应用包装成app，框架用Vue。 
### 工程目录
``` bash
│
├── README.md                           <=  项目介绍
├── app                                 <=  开发目录
│   ├── dist                            <= 编译打包
│   ├── icons                           <= 相关图标
│   ├── src                             <= 项目源代码
│   │   ├── main                        <= electron主进程
│   │   │   ├── application.js
│   │   │   ├── index.dev.js
│   │   │   ├── index.js
│   │   ├── renderer                    <= electron渲染进程
│   │   │   ├── App.vue                 <=  Vue 根组件
│   │   │   ├── main.js                 <=  Vue 入口
│   │   │   ├── assets                  <=  静态资源
│   │   │   ├── common                  <=  公共配置
│   │   │   ├── config                  <=  项目配置
│   │   │   ├── extend                  <=  Vue 扩展相关
│   │   │   ├── router                  <=  Vue 路由相关
│   │   │   ├── store                   <=  Vuex
│   │   │   ├── views                   <=  视图层
│   ├── index.ejs                       <= 模板文件
│   ├── package.json                    <=  相关依赖
├── build                               <=  打包桌面应用相关
│   ├── Gruntfile.js                    <=  构建脚本
│   ├── package.json                    <=  相关依赖
├── tasks                               <=  electron-packeger打包
│   ├── release.js
│   ├── runner.js
├── test                                <=  测试文件夹  
│   ├── e2e
│   ├── unit
│   ├── .eslintrc
├── config.js                           <=  electron打包配置
├── webpack.main.config.js
├── webpack.renderer.config.js
├── package.js
│
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

# lint all JS/Vue component files in `app/src`
npm run lint

# run webpack in production
npm run pack

NOTE:

Mac系统打线上包：

参见文档：https://github.com/electron-userland/electron-packager#building-windows-apps-from-non-windows-platforms

brew install Caskroom/cask/xquartz

brew install wine

依赖的包下载地址：https://github.com/electron-userland/electron-builder-binaries/releases

electron下载地址：https://github.com/electron/electron/releases

Windows打包
electron-builder --win
electron-builder --win
Mac打包
electron-builder --darwin
