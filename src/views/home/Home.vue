<template>
    <div id="home">
      <div v-if="!showLoading">
        <Header />
        <Swiper :swiperData="swiperData"/>
        <Nav :navData="navData"/>
        <FlashSale />
      </div>
      <van-loading v-else type="spinner" size="24px" color="#75a342" class="position">加载中...</van-loading>
    </div>
</template>

<script>
  import {HomeModel} from "../../service/home";
  import Header from "./components/header/Header";
  import Swiper from "./components/swiper/Swiper";
  import Nav from "./components/nav/Nav";
  import FlashSale from "./components/flashsale/FlashSale";
  const homeModel = new HomeModel();
  export default {
    name: "Home",
    created() {
      this.getHomeData();
    },
    data(){
      return {
        swiperData: [],
        navData: [],
        showLoading: true
      }
    },
    components: {
      Header, Swiper, Nav, FlashSale
    },
    methods: {
      async getHomeData() {
        const HomeData = await homeModel.getHomeData();
        if (HomeData.success) {
          this.swiperData = HomeData.data.list[0].icon_list;
          this.navData = HomeData.data.list[2].icon_list;
          this.showLoading = false
        }
      }
    }
  }
</script>

<style lang="less" scoped>
#home{
  .position{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>