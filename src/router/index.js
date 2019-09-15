import Vue from 'vue'
import Router from 'vue-router'

// 引入一级组件
import DashBoard from "../views/dashboard/DashBoard";
// 使用懒加载  DashBoard下的二级组件
const Home = () => import('./../views/home/Home.vue');
const Category = () => import('./../views/category/Category.vue');
const Cart = () => import('./../views/cart/Cart.vue');
const Mine = () => import('./../views/mine/Mine.vue');

// 引入一级组件
const Order = () => import('./../views/order/Order.vue');
// 使用懒加载  Order下的子级组件
const MyAddress = () => import('./../views/order/children/MyAddress');

// 引入MyAddress下的子路由
const AddAddress = () => import('./../views/order/children/children/AddAddress');
const EditAddress = () => import('./../views/order/children/children/EditAddress');

// 引入登陆页面
const Login = () => import('./../views/login/Login.vue');


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
    },
    {
      path: '/confirmOrder',
      name: 'order',
      component: Order,
      children: [
        {
          path: 'myAddress',
          name: 'myAddress',
          component: MyAddress,
          children: [
            // 添加地址
            {path: 'addAddress', name: 'addAddress', component: AddAddress},
            // 编辑地址
            {path: 'editAddress', name: 'editAddress', component: EditAddress},
          ]
        }
      ]
    },
    {path: '/login', name: 'login', component: Login}
  ]
})