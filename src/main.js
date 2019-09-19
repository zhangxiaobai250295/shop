import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

// // 引入fastclick
import FastClick from 'fastclick'
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

// 引入全局样式
import './style/common.less'

// 引入全局的vant ui 组件库
import './plugins/vant'

// 引入rem
import './config/rem'

// 引入过滤器
import './config/filters'

import VueQriously from 'vue-qriously'
Vue.use(VueQriously);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
