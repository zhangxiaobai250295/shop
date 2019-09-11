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
  </div>
</template>

<script>
  export default {
    name: "Order",
    methods: {
      onClickLeft() {

      }
    }
  }
</script>

<style lang="less" scoped>
.order{
  height: 100%;
  width: 100%;
}
</style>