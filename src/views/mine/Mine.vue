<template>
    <div v-if="userInfo.token" id="mine" class="mine">
      <van-nav-bar
          title="我的"
          :fixed= true
          :border= false

      >
      </van-nav-bar>

      <van-cell-group style="margin-top: 2.6rem">
        <van-cell is-link style="background-color: #2eba5a;color: #fff" :center=true @click="$router.push('/dashboard/mine/userCenter')">
          <!-- 使用 title 插槽来自定义标题 -->
          <template slot="title">
            <div class="personMsg">
              <img src="./images/12.png" alt="">
              <div class="personInfo">
                <span>{{userInfo.real_name}}</span>
                <span>手机号：{{userInfo.phone}}</span>
              </div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group>
        <van-cell icon="label" class="abcd"  title="我的订单" is-link value="查看所有的订单"></van-cell>
        <van-grid>
          <van-grid-item
              v-for="(order,index) in orderData"
              :key="index"
              :icon="order.icon"
              :text="order.title">
          </van-grid-item>
        </van-grid>
      </van-cell-group>
      <van-cell-group style="margin-top: .6rem">
        <van-cell icon="gold-coin-o" title="我的优惠券" is-link value="查看所有的优惠券"></van-cell>
        <van-cell icon="balance-list-o" title="我的收货地址" is-link value="查看地址"></van-cell>
      </van-cell-group>
      <van-cell-group style="margin-top: .6rem">
        <van-cell icon="phone-o" title="联系客服" is-link value="客服时间07:00-22:00"></van-cell>
        <van-cell icon="comment-o" title="意见反馈" is-link ></van-cell>
      </van-cell-group>
      <van-cell-group style="margin-top: .6rem">
        <van-cell icon="send-gift-o" title="shopApp" is-link value="下载app体验更佳"></van-cell>
      </van-cell-group>
      <!--    路由出口-->
      <transition name="router-slider" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <SelectLogin v-else />
</template>

<script>
  import {mapState} from 'vuex'
  import SelectLogin from "../login/SelectLogin";
  export default {
    name: "Mine",
    components: {
      SelectLogin
    },
    computed: {
      ...mapState(['userInfo']),
    },
    data() {
      return {
        orderData: [
          {icon: 'gold-coin-o', title: '待支付'},
          {icon: 'gift-card-o', title: '待收货'},
          {icon: 'smile-comment-o', title: '待评价'},
          {icon: 'balance-list-o', title: '售后/退款'}
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
.mine{
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
.van-nav-bar{
  background-color: #3bba63;
}
.van-nav-bar__title{
  color: white;
}
.abcd .van-cell__left-icon{color:red;}
/*.van-icon{*/
/*  color: #FFFFFF;*/
/*}*/
.van-cell__left-icon{
  color: orange;
  font-size: 1.5rem;
}
.personMsg{
  display: flex;
  flex-direction: row;
  align-items: center;

  img{
    width: 4rem;
    height: 4rem;
    border-radius: 2rem;
    border: .1rem solid #FFFFFF;
  }
  .personInfo{
    display: flex;
    flex-direction: column;
    margin-left: .8rem;
  }
}

/*转场动画*/
.router-slider-enter-active, .router-slider-leave-active {
  transition: all 0.3s;
}

.router-slider-enter, .router-slider-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>