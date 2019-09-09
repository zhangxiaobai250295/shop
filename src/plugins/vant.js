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