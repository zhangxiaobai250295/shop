# shop

## 初始目录结构
- src  => 项目文件目录
- config => 配置文件夹
    - rem.js
    - global.js => 定义了回到顶部的动画和是否显示回到顶部的按钮的条件
    - filters => 全局的过滤器(价格如何显示,加￥或是不加等)
- images => 图片文件夹
- plugins => 插件文件夹
    - vant.js => vant ui的配置文件
- router => 路由文件夹
    - index.js => 路由的配置
- store => 仓库(vuex)文件夹
- service => 后台接口文件夹
    - api => 接口文件夹
        - http.js 封装一个axios方法(有get，post方法,需要传三个参数：url,data.method)
            然后内部根据三个参数调用axios.get()或者axios.post()方法
    - home.js   => 里面是home页面所有的数据处理函数(请求数据,数据修改等...)
    - cart.js
    - mine.js
    - category.js
- style => 样式文件夹
- view => 页面文件夹
    - dashboard => 主面板文件夹
        - DashBoard.vue 
    - home => 首页文件夹
        - components => home页面自有的组件文件夹
            - header => header组件文件夹
                - header.vue                 
        - Home.vue 
    - cart => 购物车文件夹
        - Care.vue 
    - category => 分类文件夹
        - Category.vue 
    - mine => 个人中心文件夹
            - Mine.vue 
- components => 公共的组件

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
## 配置路由

## 引入vant ui 组件库
- npm i vant -S
- npm i babel-plugin-import -D   => 这是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式
- 在babel.config.js中配置如下代码
```
module.exports = {
  "plugins": [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
};
```
- 在plugins文件夹中的vant.js中配置vant(需要引入哪些组件)：例
```
import Vue from 'vue'

import { Tabbar, TabbarItem } from 'vant';

Vue.use(Tabbar).use(TabbarItem);
```
- 在main.js中引入vant.js
```
import './plugins/vant.js'
```
## 使用axios 请求数据
- npm i axios -S
- 封装axios
```

```
## 使用swiper插件
- npm install vue-awesome-swiper --save
- import 'swiper/dist/css/swiper.css'  (在swiper组件中引入)
- import { swiper, swiperSlide } from 'vue-awesome-swiper'
- 常用配置
```
data() {
      return {
        swiperOption: {
          notNextTick: true,
          pagination: {   // 配置分页器(下面的几个圆点)
            el: '.swiper-pagination',
            clickable :true,
            bulletActiveClass: 'my-bullet-active',    // 定义pagination 分页器内当前活动块的指示小点的类名。
          },
          loop : true,      // 循环
          autoplay: {       // 图片切换的间隔
            delay: 1000
          },
          speed: 600,      // 图片切换的速度
          // on: {
          //   slideChangeTransitionEnd: function(){  // 图片切换结束后的监听函数
          //     // alert(this.activeIndex);//切换结束时，告诉我现在是第几个slide
          //   },
          // }
        }
      }
    },
```
- 注意: 轮播图的组件初始化一定要在数据请求下来之后才能初始化，不然会出现一些bug
- 解决1：可以在数据没请求下来的时显示一个加载动画，请求下来之后隐藏
- 解决2：swiper里面有解决方案(自己去看文档)
## rem适配方案
- 可以使用 postcss-pxtorem 是一款 postcss 插件，用于将单位转化为 rem。
- 这里采用网易的动态js适配,在rem.js中加入以下代码
```
// 网易的适配方案
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 15 * (clientWidth / 320) + 'px';  // 基准值具体修改
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
```
## 在filters.js中注册一个全局的价格过滤器
- 注册过滤器
```
import Vue from  'vue'

// 人民币过滤器
Vue.filter('moneyFormat', (value)=>{
  return '¥' + Number(value).toFixed(2);
});
```
- main.js中全局引入
- {{flashSaleList.price(需要过滤的数据) | moneyFormat}}
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
