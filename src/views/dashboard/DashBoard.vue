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
      ...mapState(['shopCartGoods']),
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
      ...mapMutations(['INIT_SHOP_CART'])
    },
    mounted() {  // 页面初始化完毕
      // 1. 自动登录
      this.reqUserInfo();

      // 2. 获取购物车的数据
      this.INIT_SHOP_CART();
    }
  }
</script>

<style lang="less" scoped>
#dashboard{
  width: 100%;
  height: 100%;
}

</style>