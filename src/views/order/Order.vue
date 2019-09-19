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
        :type="address_type"
        :name="address_name"
        :tel="address_phone"
        add-text="选择收货地址"
        @click="chooseAddress"
        style="margin-top: 3rem"
    >
    </van-contact-card>

    <van-cell-group style="margin-top: .6rem">
      <van-cell @click="showDate" title="送达时间" :value="arriveDate" is-link></van-cell>
      <router-link :to="{path: '/confirmOrder/orderDetail'}">
        <van-cell :value="`共${goodsCount}件`" is-link :center="true">
          <!-- 使用 title 插槽来自定义标题 -->
          <template slot="title">
            <img v-for="(goods, index) in threeShopCart" :src="goods.small_image" alt="" style="width: 3rem;">
          </template>
        </van-cell>
      </router-link>
    </van-cell-group>
    <van-cell-group style="margin-top: .6rem">
      <van-cell title="支付方式" value="微信" is-link></van-cell>
    </van-cell-group>
    <van-cell-group style="margin-top: .6rem">
      <van-cell title="备注">
        <input type="text" style="text-align: right" placeholder="选填,备注你的特殊需求!!" v-model="notice"/>
      </van-cell>
    </van-cell-group>
    <van-cell-group style="margin-top: .6rem">
      <van-cell title="商品金额" :value="`¥${totalPrice}`"></van-cell>
      <van-cell title="配送费" :value="`￥${disPrice}`"></van-cell>
    </van-cell-group>

    <van-submit-bar
        :price="totalPrice*100 + disPrice*100"
        button-text="提交订单"
        @submit="onSubmit"
        label="实付"
    >
    </van-submit-bar>

    <van-popup v-model="dateShow" round position="bottom">
      <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="onDateCancel"
          @confirm="onDateConfirm"
      >
      </van-datetime-picker>
    </van-popup>
    <!--支付二维码-->
    <van-popup  v-model="isPay" round position="center">
      <qriously :value="qrcode" :size="200" />
    </van-popup>

    <!--    路由出口-->
    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
  import Moment from 'moment'
  import PubSub from 'pubsub-js'
  import {mapState} from 'vuex'
  import {Toast} from 'vant'
  // 引入order处理模块
  import {OrderModel} from "../../service/order";
  const orderModel = new OrderModel();
  // 引入购物车接口模块
  import {CartModel} from "../../service/cart";
  const cartModel = new CartModel();
  export default {
    name: "Order",
    data() {
      return {
        // 1. 地址
        address_type: 'add', // 地址卡片类型
        address_name: null, // 收货人
        address_phone: null, // 收货人电话
        address_id: null, // 收货人地址ID
        // 时间
        dateShow: false,
        minDate: new Date(),
        maxDate: new Date(2021, 10, 1),
        currentDate: new Date(),
        // 3. 送达时间
        arriveDate: '请选择送达时间',
        // 4. 备注
        notice: null,
        isPay: false, // 是否显示二维码蒙版
        qrcode: null, // 生成二维码的URL地址
      }
    },
    computed: {
      ...mapState(['shopCartGoods','userInfo']),
      // 商品总件数
      goodsCount(){
        let selectedGoodsCount = 0;
        Object.values(this.shopCartGoods).forEach((goods, index)=>{
          if(goods.checked){
            selectedGoodsCount += 1;
          }
        });
        return selectedGoodsCount;
      },
      // 商品总价
      totalPrice(){
        let totalPrice = 0;
        Object.values(this.shopCartGoods).forEach((goods, index)=>{
          if(goods.checked){
            totalPrice += goods.price * goods.num;
          }
        });
        return totalPrice.toFixed(2);
      },
      //  取购物车中前三件选中的
      threeShopCart(){
        let shopCartGoods = [];
        Object.values(this.shopCartGoods).forEach((goods, index)=>{
          if(goods.checked){
            shopCartGoods.push(goods);
          }
        });
        return shopCartGoods.slice(0, 3);
      },
      // 配送费
      disPrice(){
        // 商品总价 > 40 免配送费  <40 6元
        if(this.totalPrice > 40){
          return 0;
        }else {
          return 6;
        }
      }
    },
    mounted() {
      // 接收收货地址
      PubSub.subscribe('userAddress', (msg, address) => {
        if (msg === 'userAddress') {
          // console.log(address);
          // 修改卡片的类型
          this.address_type = 'edit';
          this.address_name = address.name;
          this.address_phone = address.tel;
          this.address_id = address.address_id;
        }
      })
    },
    beforeDestroy() {
      PubSub.unsubscribe('userAddress');
    },
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
      async onSubmit() {
        // 3.1 数据验证
        if(!this.address_id){
          Toast({
            message: '请选择收货地址',
            duration: 500
          });
          return;
        }
        if(this.arriveDate === '请选择送达时间'){
          Toast({
            message: '请选择送达时间',
            duration: 500
          });
          return;
        }
        if(!this.notice){
          Toast({
            message: '请添加注意事项',
            duration: 500
          });
          return;
        }
        // 3.2 处理订单相关
        if(this.userInfo.token) {
          // 3.2.1 查询购物车订单
          let goodsResult = await cartModel.getAllSelectedGoods(this.userInfo.token);
          // console.log(goodsResult);
          // 3.2.2 创建订单
          if(goodsResult.success_code === 200) {
            let orderResult = await orderModel.postOrder(this.userInfo.token, this.address_id, this.arrive_time, goodsResult.data, this.notice, this.totalPrice, this.disPrice);
            // console.log(orderResult);
            // 3.3.3 删除购物车中已经生成订单的商品
            if(orderResult.success_code === 200) {
              let delResult = await cartModel.delAllSelectedGoods(this.userInfo.token);
              // console.log(delResult);
              // 3.3.4 发起微信支付
              if(delResult.success_code === 200) {
                // 测试，测试，测试 价格设置为1分钱 orderResult.data.order_id：订单id
                let urlResult = await orderModel.getWXCode(orderResult.data.order_id, 1);
                // console.log(urlResult);
                if(urlResult.code_url) {
                  this.isPay = true;
                  this.qrcode = urlResult.code_url;  // 二维码地址的赋值
                  // 3.3.5 验证用户是否扫码支付成功了
                  let payResult = await orderModel.queryPayStatus(orderResult.data.order_id);
                  // console.log(payResult);
                  if(payResult.success) {
                    Toast({
                      message: payResult.message,
                      duration: 1000
                    });
                    this.isPay = false;
                    // 3.3.6 通知自己服务器订单支付成功
                    let statusResult = await orderModel.orderPaySuccess(this.userInfo.token, orderResult.data.order_id);
                    // console.log(statusResult);
                    if(statusResult.success_code === 200){
                      // 3.3.7 跳转到我的
                      this.$router.replace('/dashboard/mine');
                      window.sessionStorage.setItem('tabBarActiveIndex', '3');
                    }
                  }
                }
              }else {
                Toast({
                  message: '订单处理出现问题',
                  duration: 500
                });
              }
            } else {
              Toast({
                message: '购物车同步出现问题',
                duration: 500
              });
            }
          } else {
            Toast({
              message: '获取订单商品失败',
              duration: 500
            });
          }
        }
      },
      // 显示选择收货时间组件
      showDate() {
        this.dateShow = true;
      },
      // 时间组件点击取消按钮
      onDateCancel() {
        this.dateShow = false;
      },
      // 时间组件点击确定按钮
      onDateConfirm(value) {
        this.dateShow = false;
        this.arriveDate = Moment(value).format('YYYY-MM-DD hh:mm');
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