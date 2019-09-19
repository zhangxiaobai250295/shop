<template>
  <div id="" class="addAddress">
    <!--  导航条  -->
    <van-nav-bar
        title="添加地址"
        left-arrow
        @click-left="onClickLeft"
        :fixed = true
    >
    </van-nav-bar>
    <!--  内容  -->
    <van-address-edit
        :area-list="areaList"
        show-postal
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        @change-detail="onChangeDetail"
        style="margin-top: 3rem"
    >
    </van-address-edit>
  </div>
</template>

<script>
  // 引入省市区地址
  import areaList from './../../../../config/area'
  import {Toast} from 'vant'
  import {mapState} from 'vuex'

  // 引入order处理模块
  import {OrderModel} from "../../../../service/order";
  const orderModel = new OrderModel();

  import PubSub from 'pubsub-js'

  export default {
    name: "AddAddress",
    data() {
      return {
        areaList: areaList,
        searchResult: []
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      onClickLeft() {
        this.$router.back()
      },
      async onSave(content) {
        // console.log(content);
        if(this.userInfo.token) {
          let result = await orderModel.addUserAddress(this.userInfo.token, content.name, content.tel, content.province+content.city+content.county, content.addressDetail, content.postalCode, content.isDefault, content.province, content.city, content.county, content.areaCode);
          // console.log(result);
          if(result.success_code === 200){ // 成功
            Toast({
              message: '添加地址成功！',
              duration: 400
            });
            // 回去
            this.$router.back();
            // 发起通知  通知父组件已经添加新的地址  需要去请求加载数据下来显示
            PubSub.publish('backToMyAddress');
          }else {
            Toast({
              message: '添加地址失败！',
              duration: 400
            });
          }
        }
      },
      onChangeDetail(val) {
        if (val) {
          this.searchResult = [{
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }];
        } else {
          this.searchResult = [];
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.addAddress{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 9999;
}
</style>