import Vue from 'vue'
import Router from 'vue-router'

// 引入一级组件
import DashBoard from "../views/dashboard/DashBoard";
// 使用懒加载
const Home = () => import('./../views/home/Home.vue');
const Category = () => import('./../views/category/Category.vue');
const Cart = () => import('./../views/cart/Cart.vue');
const Mine = () => import('./../views/mine/Mine.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', redirect: '/dashboard'},
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard,
      children: [
        {path: '/', redirect: '/dashboard/home'},
        {path: 'home', name: 'home', component: Home, meta: {keepAlive: true}},
        {path: 'cart', name: 'cart', component: Cart},
        {path: 'category', name: 'category', component: Category, meta: {keepAlive: true}},
        {path: 'mine', name: 'mine', component: Mine},
      ]
    }
  ]
})