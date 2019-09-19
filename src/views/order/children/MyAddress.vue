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
        @select="onBackAddress"
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
  import {mapState} from 'vuex'
  // 引入order处理模块
  import {OrderModel} from "../../../service/order";
  const orderModel = new OrderModel();

  import PubSub from 'pubsub-js'
  export default {
    name: "MyAddress",
    data() {
      return {
        chosenAddressId: '1',
        list: [
          // {
          //   id: '1',
          //   name: '张三',
          //   tel: '13000000000',
          //   address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
          // },
        ]
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    mounted() {
      this.initUserAddress();
      // 订阅添加地址成功 or 修改地址成功  然后重新请求得到最新数据
      PubSub.subscribe('backToMyAddress', (msg)=>{
        if(msg === 'backToMyAddress'){
          this.initUserAddress();
        }
      })
    },
    beforeDestroy() {
      PubSub.unsubscribe('backToMyAddress');
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
        // item 是点击编辑该元素的所有信息
        this.$router.push({
          path: '/confirmOrder/myAddress/editAddress?address_id=' + item.address_id
        })
      },
      // 获取当前用户的地址
      async initUserAddress() {
        if(this.userInfo.token) { // 处于登录状态
          let result = await orderModel.getUserAddress(this.userInfo.token);
          // console.log(result);
          if(result.success_code === 200){
            let addressArr = result.data;
            this.list = [];
            addressArr.forEach((address, index)=>{
              let addressObj = {
                id: String(index + 1),
                name: address.address_name,
                tel: address.address_phone,
                address: address.address_area + address.address_area_detail,
                address_id: address._id,
                user_id: address.user_id
              };
              // 追加到数组
              this.list.push(addressObj);
            });
          }else {
            Toast({
              message: '获取地址失败！',
              duration: 400
            })
          }
        } else {
          Toast({
            message: '登录已过期，请退出登录！',
            duration: 400
          })
        }
      },
      // 返回选中的地址
      onBackAddress(item,index) {
        if(item){
          // 发布地址数据
          PubSub.publish('userAddress', item);
          // 返回上一级界面
          this.$router.back();
        }
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