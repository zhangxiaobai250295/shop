<template>
  <div id="order" class="order">
    <!--  导航条  -->
    <van-nav-bar
        title="添加订单"
        left-arrow
        @click-left="onClickLeft"
        :fixed = true
    >
    </van-nav-bar>
    <!--  添加收货地址  -->
    <van-contact-card
        type="add"
        add-text="选择收货地址"
        @click="chooseAddress"
        style="margin-top: 3rem"
    >
    </van-contact-card>

    <van-cell-group style="margin-top: .6rem">
      <van-cell title="送达时间" value="请选择送达时间" is-link></van-cell>
      <van-cell value="内容" is-link :center="true">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <img src="./images/detail1.jpg" alt="" style="width: 3rem">
          <img src="./images/detail1.jpg" alt="" style="width: 3rem">
          <img src="./images/detail1.jpg" alt="" style="width: 3rem">
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group style="margin-top: .6rem">
      <van-cell title="支付方式" value="微信" is-link></van-cell>
    </van-cell-group>
    <van-cell-group style="margin-top: .6rem">
      <van-cell title="备注">
        <input type="text" placeholder="选填,备注你的特殊需求!!" />
      </van-cell>
    </van-cell-group>
    <van-cell-group style="margin-top: .6rem">
      <van-cell title="商品金额" value="￥50.00"></van-cell>
      <van-cell title="配送费" value="￥10.00"></van-cell>
    </van-cell-group>

    <van-submit-bar
        :price="3050"
        button-text="提交订单"
        @submit="onSubmit"
        label="实付"
    >

    </van-submit-bar>
    <!--    路由出口-->
    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
  export default {
    name: "Order",
    methods: {
      // 点击导航条的返回箭头
      onClickLeft() {
        this.$router.back()
      },
      // 点击了选择收货地址
      chooseAddress() {
        this.$router.push('/confirmOrder/myAddress')
      },
      // 点击提交订单
      onSubmit() {

      }
    }
  }
</script>

<style lang="less" scoped>
.order{
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
}
/*.router-slider-enter-active, .router-slider-leave-active{*/
/*  transition: all .5s;*/
/*}*/
/*.router-slider-enter, .router-slider-leave-active{*/
/*  transform: translate3d(2rem, 0, 0);*/
/*}*/
/*转场动画*/
.router-slider-enter-active, .router-slider-leave-active {
  transition: all 0.3s;
}

.router-slider-enter, .router-slider-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>