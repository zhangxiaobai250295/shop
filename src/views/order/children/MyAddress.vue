<template>
  <div id="" class="myAddress">
    <!--  导航条  -->
    <van-nav-bar
        title="我的地址"
        left-arrow
        @click-left="onClickLeft"
        :fixed = true
    >
    </van-nav-bar>
    <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        style="margin-top: 3rem"
    >
    </van-address-list>

    <!--    路由出口-->
    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  export default {
    name: "MyAddress",
    data() {
      return {
        chosenAddressId: '1',
        list: [
          {
            id: '1',
            name: '张三',
            tel: '13000000000',
            address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
          },
          {
            id: '2',
            name: '李四',
            tel: '1310000000',
            address: '浙江省杭州市拱墅区莫干山路 50 号'
          }
        ]
      }
    },
    methods: {
      // 点击导航条的返回箭头
      onClickLeft() {
        this.$router.back()
      },
      onAdd() {
        this.$router.push({
          path: '/confirmOrder/myAddress/addAddress'
        })
      },

      onEdit(item, index) {
        this.$router.push({
          path: '/confirmOrder/myAddress/editAddress'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .myAddress{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 200;
    background-color: #f5f5f5;
  }
  .router-slider-enter-active, .router-slider-leave-active {
    transition: all 0.3s;
  }

  .router-slider-enter, .router-slider-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>