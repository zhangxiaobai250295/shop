import {
  ADD_GOODS,
  INIT_SHOP_CART,
  REDUCE_CART,
  SELECTED_SINGER_GOODS,
  SELECTED_ALL_GOODS,
  CLEAR_CART,
  USER_INFO,
  INIT_USER_INFO,
  RESET_USER_INFO
} from "./mutations-type";
import {getStore, setStore, removeStore} from '../config/global'
import Vue from 'vue'
const mutations = {
  // 网购物车里面添加一件商品
  [ADD_GOODS](state,{goodsId,goodsName,smallImage,goodsPrice}) {
    // 商品数据只需传这些简单数据  这样就不会涉及深浅拷贝问题
    // 或者只需传一个id  然后在去请求服务器拿到数据
    let shopCartGoods = state.shopCartGoods;
    if (shopCartGoods[goodsId]) { // 判断商品是否已经存在
      shopCartGoods[goodsId]['num']++  // 存在则给该商品的数量加一
    } else {
      shopCartGoods[goodsId] = {
        'num': 1,
        'id': goodsId,
        'name': goodsName,
        'small_image': smallImage,
        'price': goodsPrice,
        'checked': true
      }
    }
    // 2.生成新的购物车数据
    state.shopCartGoods = {...shopCartGoods};
    // 3. 存入本地
    // 为什么对象不转字符创：JSON.stringify ， 因为封装的setStore里面已经转了
    setStore('shopCartGoods', state.shopCartGoods)
  },
  // 初始化购物车
  [INIT_SHOP_CART](state) {  // 页面初始化 获取本地购物车的数据
    let initCart = getStore('shopCartGoods');
    if (initCart) {
      state.shopCartGoods = JSON.parse(initCart);
    }
  },
  // 把某件商品移出购物车
  [REDUCE_CART](state, { goodsId }) {
    let shopCartGoods = state.shopCartGoods;
    let goods = shopCartGoods[goodsId];
    if (goods) {
      if (goods.num > 0) {
        goods.num--;
        if (goods.num === 0) {  // 如果数量为0则删除该商品
          delete shopCartGoods[goodsId];
        }
      } else {
        goods = null;
      }
      // 同步数据
      /*
        对象的扩展运算符等同于使用Object.assign()方法。
        Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。 
        Object.assign()拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。
       */
      state.shopCartGoods = {...shopCartGoods};
      /*
          使用：state.shopCartGoods = {...shopCartGoods};  两个对象是不相等的
          console.log(state.shopCartGoods === shopCartGoods);
          使用：state.shopCartGoods = shopCartGoods;   两个对象是相等的
       */
      setStore('shopCartGoods', state.shopCartGoods)
    }
  },
  // 单个商品的选中和取消
  [SELECTED_SINGER_GOODS](state,{goodsId}) {
    let shopCartGoods = state.shopCartGoods;
    let goods = shopCartGoods[goodsId];
    if (goods) {
      if (goods.checked) {
        goods.checked = !goods.checked
      } else {
        // this.$set(goods,'checked', true)
        Vue.set(goods,'checked', true)
      }
    }
    // 同步数据到本地
    state.shopCartGoods = {...shopCartGoods};
    setStore('shopCartGoods', state.shopCartGoods)
  },
  // 全选或者全部选
  [SELECTED_ALL_GOODS](state,{isSelected}){
    let shopCartGoods = state.shopCartGoods;
    Object.values(shopCartGoods).forEach((goods,index) => {
      if (isSelected) {
        goods.checked = !isSelected;
      } else {
        Vue.set(goods,'checked',!isSelected)
      }
    });
    state.shopCartGoods = {...shopCartGoods};
    setStore('shopCartGoods', state.shopCartGoods)
  },
  // 清空购物车
  [CLEAR_CART](state) {
    let shopCartGoods = state.shopCartGoods;
    shopCartGoods = null;
    state.shopCartGoods = {...shopCartGoods};
    setStore('shopCartGoods', state.shopCartGoods)
  },
  // 保存用户登录成功后的信息
  [USER_INFO](state, {userInfo}) {
    state.userInfo = userInfo;
    setStore('userInfo', state.userInfo)
  },
  // 获取用户信息
  [INIT_USER_INFO](state) {
    // 从本地获取用户信息
    const userInfo = getStore('userInfo');
    if (userInfo) {
      state.userInfo = JSON.parse(userInfo)
    }
  },
  // 9. 退出登录
  [RESET_USER_INFO](state){
    state.userInfo = {};
    removeStore('userInfo');
  }
};

export default mutations