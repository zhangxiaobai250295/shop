<template>
  <div id="" class="mineOrder">
    <!--  导航条  -->
    <van-nav-bar
        title="订单详情"
        left-arrow
        @click-left="$router.back()"
        :fixed = true
    >
    </van-nav-bar>
      <<van-tabs
        v-model="activeName"
        style="margin-top: 1.2rem"
        color="#75a342"
        title-active-color="#75a342"
        @click="dealWithTabClick"
      >
        <van-tab title="全部订单" name="a">
          <MineOrderItem v-for="(order, index) in allOrderArr" :order="order" :key="order._id"/>
        </van-tab>
        <van-tab title="待支付" name="b">
          <MineOrderItem v-for="(order, index) in allWillOrderArr" :order="order" :key="order._id"/>
        </van-tab>
        <van-tab title="待收货" name="c">
          <MineOrderItem v-for="(order, index) in allPayOrderArr" :order="order" :key="order._id"/>
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import MineOrderItem from './components/MineOrderItem'
  import {mapState} from 'vuex'
  import {Toast} from 'vant'
  // 引入order处理模块
  import {OrderModel} from "../../../service/order";
  const orderModel = new OrderModel();
  export default {
    name: "MineOrder",
    components: {
      MineOrderItem
    },
    computed: {
      ...mapState(['userInfo'])
    },
    data() {
      return {
        activeName: 'a',
        allOrderArr: null, // 所有的订单
        allWillOrderArr: null, // 所有待支付的订单
        allPayOrderArr: null, // 所有支付的订单
      };
    },
    mounted() {
      // 获取订单数据
      this.initOrder();
    },
    methods: {
      // 组件渲染完时获取全部订单
      async initOrder() {
        let result = await orderModel.getOrder(this.userInfo.token);
        if (result.success_code === 200) {
          this.allOrderArr = result.data;
          console.log(this.allOrderArr);
        } else {
          Toast({
            message: '订单获取失败',
            duration: 600
          });
        }
      },
      async dealWithTabClick(name,title) {
        if (name === 'a') {   // 全部
          this.allOrderArr = await this.getTabOrder();
        } else if (name === 'b') {  // 待支付
          this.allWillOrderArr = await this.getTabOrder('will')
        } else if (name === 'c') {  // 待收货
          this.allPayOrderArr = await this.getTabOrder('pay')
        }
      },
      // 点击不同标签页(全部，待支付，待收货...)时获取不同订单数据
      async getTabOrder(status) {
        let result = await orderModel.getOrder(this.userInfo.token, status);
        if (result.success_code === 200) {
          return result.data;
        } else {
          Toast({
            message: '订单获取失败',
            duration: 600
          });
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.mineOrder{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /*height: 120%;*/
  background-color: #f5f5f5;
  z-index: 200;
}
</style>