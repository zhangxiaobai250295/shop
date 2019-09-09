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
## 使用keep-alive标签实现数据的缓存
- 在路由的配置文件中(我们需要home和category页面有缓存，可以在路由元信息mate中加入一个数据,以便来判断是否要缓存)
```
 {path: 'home', name: 'home', component: Home, meta: {keepAlive: true}},
```
- 在路由的出口做判断
```
<keep-alive>
  <router-view v-if="$route.meta.keepAlive"/>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"/>
```
## 使用BetterScroll插件实现category左侧的分类
- BetterScroll 是一款重点解决移动端（已支持 PC）各种滚动场景需求的插件。它的核心是借鉴的 iscroll 的实现，它的 API 设计基本兼容 iscroll，在 iscroll 的基础上又扩展了一些 feature 以及做了一些性能优化。
- npm install better-scroll -S
- import BScroll from 'better-scroll' (在需要的组件中引入或者在main中全局引入)
- 初始化,注意：一定要等需要滚动的数据加载下来之后再初始化(更vant的轮播图一样,很多插件的初始化都是要等数据下来在初始化)
```
this.$nextTick(() => {
    this.leftScroll = new BScroll('.leftWrapper', {probeType: 3})
})
probeType选项：作用：有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件。
```
- 注意：滚动元素的父元素一定要设置一个固定的高度,否则滚动不会生效
- $nextTick ：vue中对dom元素的更新有一个更新队列，一个队列就是一个事件循环，一个事件循环就是一个Tick，组件一开始加载的时候，渲染的dom元素就是一个Tick，而第一个Tick的时候，滚动插件需要的数据可能还没有请求过来，所以我们不能在第一个Tick的时候初始化我们的滚动插件
## 使用发布者和消息订阅插件 
- 为了实现不同页面商品数据加入购物车的操作（因为加入购物车这个按钮所在的组件层级有点深，如果使用自定义事件emmit来传递事件有点麻烦，而且加入购物车这个事件应该是在整个页面组件的最外层来实现的）
- npm i pubsub-js --save  // 下载插件
- import PubSub from 'pubsub-js'  // 在需要的组件中引入或者全局引入
- 
```
 // 订阅消息
  PubSub.subscribe('homeAddToCart',(msg,goods) => {
    if (msg === 'homeAddToCart') {
      this.ADD_GOODS({
        goodsId: goods.id,
        goodsName: goods.name,
        smallImage: goods.small_image,
        goodsPrice: goods.price
      })
    }
  })

  // 发布消息
addToCart(goods) {
    PubSub.publish('homeAddToCart', goods)
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
