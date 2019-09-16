<template>
    <div id="home">
      <div v-if="!showLoading">
        <!--   头部     -->
        <Header />
        <!--   轮播图     -->

        <Swiper :swiperData="swiperData"/>
        <!--   食品分类导航     -->
        <Nav :navData="navData"/>
        <!--   秒杀模块     -->
        <FlashSale :flashSaleData="flashSaleData"/>
        <!--   猜你喜欢模块     -->
        <YouLike :youLikeData="youLikeData"/>
        <MarkPage v-if="showBackStatus" @clickItem="scrollTop"/>
      </div>
      <van-loading v-else type="spinner" size="24px" color="#75a342" class="loading-position">加载中...</van-loading>
    </div>
</template>

<script>
  import Header from "./components/header/Header";
  import Swiper from "./components/swiper/Swiper";
  import Nav from "./components/nav/Nav";
  import FlashSale from "./components/flashsale/FlashSale";
  import YouLike from "./components/youLike/YouLike";
  import MarkPage from "./components/markPage/MarkPage";

  // 首页数据处理模块
  import {HomeModel} from "../../service/home";
  const homeModel = new HomeModel();

  // 3. 引入处理返回顶部的函数
  import {showBack, animate} from "@/config/global";

  // 引入发布者订阅插件
  import PubSub from 'pubsub-js'

  // 引入vuex
  import {mapMutations} from 'vuex'
  // 引入通知组件
  import { Toast } from 'vant';

  export default {
    name: "Home",
    created() {
      this.getHomeData();
    },
    mounted() {
      // 订阅消息
      PubSub.subscribe('homeAddToCart',(msg,goods) => {
        if (msg === 'homeAddToCart') {
          this.ADD_GOODS({
            goodsId: goods.id,
            goodsName: goods.name,
            smallImage: goods.small_image,
            goodsPrice: goods.price,
          })
        }
        Toast({
          message: '添加购物车成功',
          duration: 800
        });
      })
    },
    data(){
      return {
        swiperData: [],
        navData: [],
        flashSaleData: [],        // 秒杀数据
        youLikeData: [],
        showLoading: true,        // 是否显示在进入home页面时数据未加载成功时的加载动画
        showBackStatus: false     // 是否显示返回顶部的按钮
      }
    },
    components: {
      Header, Swiper, Nav, FlashSale, YouLike, MarkPage
    },
    methods: {
      ...mapMutations(['ADD_GOODS']),
      async getHomeData() {
        const HomeData = await homeModel.getHomeData();
        // console.log(HomeData);
        if (HomeData.success) {
          this.swiperData = HomeData.data.list[0].icon_list;
          this.navData = HomeData.data.list[2].icon_list;
          this.flashSaleData = HomeData.data.list[3].product_list;
          this.youLikeData = HomeData.data.list[12].product_list;

          this.showLoading = false;   // 隐鲹加载数据动画

          // 开始监听滚动, 到达一定位置就显示返回顶部按钮
          showBack((status)=>{
            // console.log(status);
            this.showBackStatus = status;
          });
        }
      },
      scrollTop() {
        // 做缓动动画返回顶部
        let docB = document.documentElement || document.body;
        animate(docB, {scrollTop: '0'}, 400, 'ease-out');
      }
    },
    beforeDestroy() {
      // 清除发布的消息  不然会占用内存  且发布订阅者模式会有一个订阅栈
      // 不清除的话  每次订阅到就会从头开始执行之前所有发布过的消息
      PubSub.unsubscribe('homeAddToCart');
    }
  }
</script>

<style lang="less" scoped>
#home{

}
</style>