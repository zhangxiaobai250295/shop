<template>
  <div id="" class="editAddress">
    <!--  导航条  -->
    <van-nav-bar
        title="编辑地址"
        left-arrow
        @click-left="onClickLeft"
        :fixed = true
    >
    </van-nav-bar>
    <!--  内容  -->
    <van-address-edit
        :area-list="areaList"
        :address-info="addressInfo"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
        style="margin-top: 3rem"
    >
    </van-address-edit>
  </div>
</template>

<script>
  import areaList from './../../../../config/area'
  import {mapState} from 'vuex'
  // 引入order处理模块
  import {OrderModel} from "../../../../service/order";
  const orderModel = new OrderModel();
  import {Toast} from 'vant'
  import PubSub from 'pubsub-js'
  export default {
    name: "EditAddress",
    data() {
      return {
        areaList: areaList,  // 省市区数据
        searchResult: [],
        addressInfo: {}      // 编辑的所有信息
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    mounted() {
      // console.log(this.$route);
      if(this.$route.query.address_id){
        if(this.userInfo.token){
          this.getCurrentAddress(this.userInfo.token, this.$route.query.address_id);
        }
      }
    },
    methods: {
      onClickLeft() {
        this.$router.back()
      },
      // 修改收货的地址
      async onSave(content) {
        if(this.userInfo.token){
          // 1. 发起修改请求
          let result = await orderModel.changeUserAddress(this.addressInfo.id, this.userInfo.token,  content.name, content.tel, content.province+content.city+content.county, content.addressDetail, content.postalCode, content.isDefault, content.province, content.city, content.county, content.areaCode);
          console.log(result);
          //  2. 判断是否修改成功
          if(result.success_code === 200){
            Toast({
              message: '修改地址成功！',
              duration: 400
            });
            // 2.1 返回到上一级界面
            this.$router.back();
            // 2.2 发布修改成功的信息  让父组件订阅然后重新请求拿到最新数据
            PubSub.publish('backToMyAddress');
          }else {
            Toast({
              message: '修改地址失败！',
              duration: 400
            });
          }
        }
      },
      async onDelete() {
        let result = await orderModel.delUserAddress(this.addressInfo.id);
        console.log(result);
        if(result.success_code === 200){
          Toast({
            message: '删除地址成功！',
            duration: 400
          });
          // 2.1 返回到上一级界面
          this.$router.back();
          // 2.2 发布删除成功信息 让父组件订阅然后重新请求拿到最新数据
          PubSub.publish('backToMyAddress');
        }else {
          Toast({
            message: '删除地址失败！',
            duration: 400
          });
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
      },
      // 获取要修改的地址信息
      async getCurrentAddress(user_id, address_id){
        let result = await orderModel.getCurrentUserAddress(user_id, address_id);
        console.log(result);
        if(result.success_code === 200){
          this.addressInfo = {
            id: result.data._id,
            name: result.data.address_name,
            tel: result.data.address_phone,
            province: result.data.province,
            city: result.data.city,
            county: result.data.county,
            addressDetail: result.data.address_area_detail,
            areaCode: result.data.areaCode,
            postalCode: result.data.address_post_code,
            isDefault: result.data.address_tag
          }
        }
      }
    },
  }
</script>

<style lang="less" scoped>
.editAddress{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 9999;
}
</style>