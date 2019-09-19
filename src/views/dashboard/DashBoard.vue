<template>
  <div id="dashboard">
    <van-tabbar v-model="active" active-color="#75a342">
      <van-tabbar-item to="/dashboard/home">
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active ? home_icon.active : home_icon.normal" alt="">
      </van-tabbar-item>
      <van-tabbar-item to="/dashboard/category">
        <span>分类</span>
        <img slot="icon" slot-scope="props" :src="props.active ? category_icon.active : category_icon.normal" alt="">
      </van-tabbar-item>
      <van-tabbar-item to="/dashboard/cart" :info="goodsNum > 0 ? goodsNum : ''">
        <span>购物车</span>
        <img slot="icon" slot-scope="props" :src="props.active ? cart_icon.active : cart_icon.normal" alt="">
      </van-tabbar-item>
      <van-tabbar-item to="/dashboard/mine">
        <span>我的</span>
        <img slot="icon" slot-scope="props" :src="props.active ? mine_icon.active : mine_icon.normal" alt="">
      </van-tabbar-item>
    </van-tabbar>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
  import {mapState,mapMutations,mapActions} from 'vuex'
  import {setStore} from "../../config/global";
  // 引入购物车接口模块
  import {CartModel} from "../../service/cart";
  const cartModel = new CartModel();
  export default {
    name: "DashBoard",
    data() {
      return {
        active: Number(sessionStorage.getItem('tabBarActiveIndex')) || 0,
        home_icon: {
          normal: require('@/images/tabbar/home_default.png'),
          active: require('@/images/tabbar/home_selected.png')
        },
        category_icon: {
          normal: require('@/images/tabbar/category_default.png'),
          active: require('@/images/tabbar/category_selected.png')
        },
        cart_icon: {
          normal: require('@/images/tabbar/shoppingcart_default.png'),
          active: require('@/images/tabbar/shoppingcart_selected.png')
        },
        mine_icon: {
          normal: require('@/images/tabbar/mine_default.png'),
          active: require('@/images/tabbar/mine_selected.png')
        }
      }
    },
    watch: {
      active(value) {
        let tabBarActiveIndex = value > 0 ? value : 0;
        sessionStorage.setItem('tabBarActiveIndex', tabBarActiveIndex)
      }
    },
    computed: {
      ...mapState(['shopCartGoods', 'userInfo']),
      // 购物车商品的总数量
      goodsNum() {
        if (this.shopCartGoods) {
          /*
               商品的格式为：{
                  id: {conut: 1,
                       name: 'xxx'
                  }
               }
          */
          // 总的购物车商品总数量  默认为 0
          let count = 0;
          // 取到购物车每个对象的value值
          Object.values(this.shopCartGoods).forEach((goods,index)=>{
            count += goods.num;
          });
          return count;
        } else {
          return 0;
        }
      }
    },
    methods: {
      ...mapActions(['reqUserInfo']),
      ...mapMutations(['INIT_SHOP_CART']),
      // 初始化购物车的数据
      async initShopCart(){
        // 已经登录
        if(this.userInfo.token){
          // 1. 获取当前用户购物车中的商品(服务器端)
          let result = await cartModel.getGoodsCart(this.userInfo.token);
          // console.log(result);
          // 2. 如果获取成功
          if(result.success_code === 200){
            /*
              服务器返回的数据格式：[
                {},{},{}
              ],
              本地缓存的数据格式：‘id’:{},'id':{}
             */
            let cartArr = result.data;
            let shopCartGoods = {};
            // 2.1 遍历 把服务器的数据格式装换成本地数据的格式
            cartArr.forEach((value)=>{
              shopCartGoods[value.goods_id] = {
                "num": value.num,
                "id": value.goods_id,
                "name": value.goods_name,
                "small_image": value.small_image,
                "price": value.goods_price,
                "checked": value.checked
              }
            });
            // 2.2 本地数据同步
            setStore('shopCartGoods', shopCartGoods);  // 把服务器请求下来的数据存储到本地
            this.INIT_SHOP_CART()   // 然后在调用本地vuex的方法拿到同步下来的购物车数据渲染到购物车组件中
          }
        }
      }
    },
    mounted() {  // 页面初始化完毕
      // 1. 自动登录
      this.reqUserInfo();

      // 2. 获取购物车的数据 (这里拿到的是本地的数据)
      // this.INIT_SHOP_CART();

      // 2. 获取购物车的数据
      this.initShopCart();
    }
  }
</script>

<style lang="less" scoped>
#dashboard{
  width: 100%;
  height: 100%;
}

</style>