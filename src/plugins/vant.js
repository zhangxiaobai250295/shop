import Vue from 'vue'

// 底部导航
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);

// loading 加载动画
import { Loading } from 'vant';
Vue.use(Loading);

// 引入图片的加载动画
import { Image } from 'vant';
Vue.use(Image);

// 消息提示
import { Toast } from 'vant';
Vue.use(Toast);

// 弹出框 ，用处：在购物车商品删除时提示用户是否删除
import { Dialog } from 'vant';
Vue.use(Dialog);

// 导航条
import { NavBar } from 'vant';
Vue.use(NavBar);