# shop

## 初始目录结构
- src  => 项目文件目录
- config => 配置文件夹
- images => 图片文件夹
- plugins => 插件文件夹
- router => 路由文件夹
- store => 仓库(vuex)文件夹
- service => 后台接口文件夹
- style => 样式文件夹
- view => 页面文件夹
    - dashboard => 主面板文件夹
        - DashBoard.vue 
    - home => 首页文件夹
        - Home.vue 
    - cart => 购物车文件夹
        - Care.vue 
    - category => 分类文件夹
        - Category.vue 
    - mine => 个人中心文件夹
            - Mine.vue 
- components => 页面组件文件夹

## 配置fastClick

> ### 什么是fastClick
+ fastClick是一个库，用来消除移动端浏览器上的点击事件延迟300ms的延迟
+ 实现的原理是：浏览器在检测到touchend事件的时候，会通过DOM自定义事件立即触发一个模拟的click事件，并把浏览器在300ms之后真正触发的click事件阻止掉

> ### 为什么会存在延迟
+ 原因是浏览器会等看你的行为是否会双击

> ### 使用
+ npm i fastclick --save
+ import FastClick from 'fastclick' (在main.js中引入)
+ 在main.js中加入该代码片段
```
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
  }
```  
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
